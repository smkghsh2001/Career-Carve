const express = require('express');
const router = express.Router();
//const mentors = require('../Models/Mentors');

const  { 
    tryBooking,
    addMentorSlot,
    getMentorNames,
    getMentorTable,
    getBookingTable 
} = require('../controllers/controllers')

router.post('/tryBooking', tryBooking);
router.post('/addMentorSlot', addMentorSlot);
router.get('/getMentorNames', getMentorNames);
router.get('/getMentorTable', getMentorTable);
router.get('/getBookingTable', getBookingTable);

module.exports = router;