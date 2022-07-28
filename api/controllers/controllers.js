const db = require('../database');

const tryBooking = ((req, res) => {
    if(!( req.body.name && req.body.mname && req.body.duration )){
        res.status(400).send({ msg: "insufficient parameters"});
    }

    db.query(`SELECT * FROM mentors WHERE mentorName='${req.body.mname}'`, (error, results)=>{
        if(error) throw error;
        else{
            let [fHours, fMin, fSec] = (results[0].fTime).split(":");
            let [fHours_INT, fMin_INT] = [parseInt(fHours), parseInt(fMin)];

            let [tHours, tMin, tSec] = (results[0].tTime).split(":");
            let [tHours_INT, tMin_INT] = [parseInt(tHours), parseInt(tMin)];

            const durationMentorAval = (tHours_INT-fHours_INT)*60 + (tMin_INT-fMin_INT);

            if(fHours_INT>=tHours_INT){
                res.status(400).send({ msg: "all mentor slots are full" });
            }
            else if(parseInt(req.body.duration)>durationMentorAval){
                res.status(400).send({ msg: `min remaining for ${req.body.mname} is ${durationMentorAval}`});
            }else{
                const tempFromH = fHours_INT;
                //console.log(tempFromH, fHours_INT);
                const tempFromM = fMin_INT;
                //console.log("tempfromM : "+tempFromM);
                let tmpMin  = fMin_INT + parseInt(req.body.duration);
                //console.log("tmpMin : "+tmpMin);
                if(tmpMin>=60){
                    fHours_INT = fHours_INT + parseInt(tmpMin/60);
                    fMin_INT = tmpMin - 60;
                }else{
                    fMin_INT = fMin_INT+parseInt(req.body.duration);
                }
                db.query(`UPDATE mentors SET fTime = '${fHours_INT}:${fMin_INT}:00' WHERE mentorName='${req.body.mname}'`, (error, result)=>{
                    if(error) throw error;
                    else{
                        db.query( `INSERT INTO bookings (mentorID, studentrName, fTime, tTime) VALUES ((SELECT mentorID from mentors WHERE mentorName='${req.body.mname}'), '${req.body.name}', '${tempFromH}:${tempFromM}:00', '${fHours_INT}:${fMin_INT}:00')` , (res,req)=>{
                            if(error) throw error;
                            else{
                                res.status(200);
                            }
                        });
                    res.status(200);
                    }
                });

            
            }
        res.status(200).json({ msg: "Slot booked successfully!"});
        }
    });

})

const addMentorSlot = ((req, res)=>{
    if(!(req.body.name && req.body.tto && req.body.tfrom)){
        res.status(400).json({ msg: "missing request fields"});
    }else{
        db.query(`INSERT INTO mentors (mentorName, fTime, tTime) VALUES ('${req.body.name}', '${req.body.tto}', '${req.body.tfrom}')`, function(err){
            if(err) throw err;
            else{
                res.status(200).json({ msg: "sucessfully added to db"});
            }
        });
    }
})

const getMentorNames = ((req, res)=>{
    db.query(`SELECT mentorName from mentors WHERE fTime!=tTime`, (error, result)=>{
        if(error){
            res.status(400).send({ msg: "incorrect query"});
            throw error;
        }else{
            const nameArr = []
             result.map((name)=>{
                return nameArr.push(name.mentorName);
            });
            //console.log(nameArr);
            res.status(200).send(nameArr);
        }
    })
})

const getMentorTable = ((req, res)=>{
    db.query(`SELECT * from mentors WHERE fTime!=tTime`, (error, result)=>{
        if(error){
            res.status(400).send({ msg: "incorrect query"});
            throw error;
        }else{
            res.status(200).send(result);
        }

    })
})

const getBookingTable = ((req, res)=>{
    db.query(`SELECT * from bookings`, (error, result)=>{
        if(error){
            res.status(400).send({ msg: "incorrect query"});
            throw error;
        }else{
            res.status(200).send(result);
        }
    });
})

module.exports = {
    tryBooking,
    addMentorSlot,
    getMentorNames,
    getMentorTable,
    getBookingTable 
}