const db = require("../database");
var cost = -1;
var [mentorFH, mentorFM, studentFH, studentFM] = Array(4).fill(-1); //mentor's update from is student's to
var [mName, sName] = Array(2).fill("");

const tryBooking = (req, res) => {
  if (!(req.body.name && req.body.mname && req.body.duration)) {
    res.status(400).send({ msg: "insufficient parameters" });
  }

  db.query(
    `SELECT * FROM mentors WHERE mentorName='${req.body.mname}'`,
    (error, results) => {
      if (error) throw error;
      else {
        let [fHours, fMin, fSec] = results[0].fTime.split(":");
        let [fHours_INT, fMin_INT] = [parseInt(fHours), parseInt(fMin)];

        let [tHours, tMin, tSec] = results[0].tTime.split(":");
        let [tHours_INT, tMin_INT] = [parseInt(tHours), parseInt(tMin)];

        const durationMentorAval =
          (tHours_INT - fHours_INT) * 60 + (tMin_INT - fMin_INT);

        if (fHours_INT > tHours_INT) {
          return res.status(400).send({ msg: "all mentor slots are full" });
        } else if (parseInt(req.body.duration) > durationMentorAval) {
          return res
            .status(400)
            .send({
              msg: `min remaining for ${req.body.mname} is ${durationMentorAval}`,
            });
        } else {
          const tempFromH = fHours_INT;
          //console.log(tempFromH, fHours_INT);
          const tempFromM = fMin_INT;
          //console.log("tempfromM : "+tempFromM);
          let tmpMin = fMin_INT + parseInt(req.body.duration);
          //console.log("tmpMin : "+tmpMin);
          if (tmpMin >= 60) {
            fHours_INT = fHours_INT + parseInt(tmpMin / 60);
            fMin_INT = tmpMin - 60;
          } else {
            fMin_INT = fMin_INT + parseInt(req.body.duration);
          }

          //setting into global vars
          mentorFH = fHours_INT;
          mentorFM = fMin_INT;
          studentFH = tempFromH;
          studentFM = tempFromM;
          mName = req.body.mname;

          switch (parseInt(req.body.duration)) {
            default:
              cost = 0;
              break;
            case 30:
              cost = 2000;
              break;
            case 45:
              cost = 3000;
              break;
            case 60:
              cost = 4000;
              break;
          }

          //res.status(200).send(cost);
          // db.query(`UPDATE mentors SET fTime = '${fHours_INT}:${fMin_INT}:00' WHERE mentorName='${req.body.mname}'`, (error, result)=>{
          //     if(error) throw error;
          //     else{
          //         db.query( `INSERT INTO bookings (mentorID, studentrName, fTime, tTime) VALUES ((SELECT mentorID from mentors WHERE mentorName='${req.body.mname}'), '${req.body.name}', '${tempFromH}:${tempFromM}:00', '${fHours_INT}:${fMin_INT}:00')` , (res,req)=>{
          //             if(error) throw error;
          //             else{
          //                 //res.status(200);
          //             }
          //         });
          //     //res.status(200);
          //     }
          // });
        }
        console.log(mentorFH);
        console.log(cost.toString());
        res.status(200).send({ payCost: cost.toString(), status: true });
      }
    }
  );
};

const addMentorSlot = (req, res) => {
  if (!(req.body.name && req.body.tto && req.body.tfrom)) {
    res.status(400).send({ msg: "missing request fields" });
  } else {
    db.query(
      `INSERT INTO mentors (mentorName, fTime, tTime) VALUES ('${req.body.name}', '${req.body.tfrom}', '${req.body.tto}')`,
      function (err) {
        if (err) throw err;
        else {
          res.status(200).send({ msg: "sucessfully added to db" });
        }
      }
    );
  }
};

const getMentorNames = (req, res) => {
  db.query(
    `SELECT mentorName from mentors WHERE fTime!=tTime AND fTime<tTime`,
    (error, result) => {
      if (error) {
        res.status(400).send({ msg: "incorrect query" });
        throw error;
      } else {
        const nameArr = [];
        result.map((name) => {
          return nameArr.push(name.mentorName);
        });
        //console.log(nameArr);
        res.status(200).send(nameArr);
      }
    }
  );
};

const getMentorTable = (req, res) => {
  db.query(
    `SELECT * from mentors WHERE fTime!=tTime AND fTime<tTime`,
    (error, result) => {
      if (error) {
        return res.status(400).send({ msg: "incorrect query" });
        throw error;
      } else {
        return res.status(200).send(result);
      }
    }
  );
};

const getBookingTable = (req, res) => {
  db.query(
    `SELECT bookings.bookingID,bookings.mentorID,bookings.studentrName,mentors.mentorName,bookings.fTime,bookings.tTime from bookings inner join mentors on bookings.mentorID=mentors.mentorID;`,
    (error, result) => {
      if (error) {
        res.status(400).send({ msg: "incorrect query" });
        throw error;
      } else {
        res.status(200).send(result);
      }
    }
  );
};

const paymentClick = (req, res) => {
  db.query(
    `SELECT * FROM mentors WHERE mentorName='${req.body.mname}'`,
    (error, results) => {
      if (error) {
        throw error;
      }
      let [fHours, fMin, fSec] = results[0].fTime.split(":");
      let [fHours_INT, fMin_INT] = [parseInt(fHours), parseInt(fMin)];

      let [tHours, tMin, tSec] = results[0].tTime.split(":");
      let [tHours_INT, tMin_INT] = [parseInt(tHours), parseInt(tMin)];

      const tempFromH = fHours_INT;
      //console.log(tempFromH, fHours_INT);
      const tempFromM = fMin_INT;
      //console.log("tempfromM : "+tempFromM);
      let tmpMin = fMin_INT + parseInt(req.body.duration);
      //console.log("tmpMin : "+tmpMin);
      if (tmpMin >= 60) {
        fHours_INT = fHours_INT + parseInt(tmpMin / 60);
        fMin_INT = tmpMin - 60;
      } else {
        fMin_INT = fMin_INT + parseInt(req.body.duration);
      }
      db.query(
        `UPDATE mentors SET fTime = '${fHours_INT}:${fMin_INT}:00' WHERE mentorName='${req.body.mname}'`,
        (error, result) => {
          if (error) throw error;
          else {
            db.query(
              `INSERT INTO bookings (mentorID, studentrName, fTime, tTime) VALUES ((SELECT mentorID from mentors WHERE mentorName='${req.body.mname}'), '${req.body.name}', '${tempFromH}:${tempFromM}:00', '${fHours_INT}:${fMin_INT}:00')`,
              (res, req) => {
                if (error) {
                    res.status(400).send({msg:"Internal error",status:false})
                }
                else {
                  //res.status(200);
                }
              }
            );
            res.status(200).send({ msg: "Slot booked successfully",status:true });
          }
        }
      );
    }
  );
};

module.exports = {
  tryBooking,
  addMentorSlot,
  getMentorNames,
  getMentorTable,
  getBookingTable,
  paymentClick,
};
