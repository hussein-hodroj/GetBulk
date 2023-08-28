import express from 'express';

import { getbooking,updatebooking,deletebooking, createbooking , getAllBooking,  getBookingsByTrainerId } from '../controller/booking.js';

const router = express.Router();



router.get('/booking/:id' , getbooking);
router.get('/allbooking', getAllBooking);
router.post('/createbooking', createbooking);
router.post('/updatebooking/:id' , updatebooking);
router.post('/deletebooking/:id' , deletebooking);
router.get('/:trainerId', getBookingsByTrainerId);

export default router;