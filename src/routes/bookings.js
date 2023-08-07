import express from 'express';

import { getbooking,updatebooking,deletebooking, createbooking , getAllBooking } from '../controller/booking.js';

const router = express.Router();



router.get('/booking/:id' , getbooking);
router.get('/allbooking', getAllBooking);
router.post('/createbooking', createbooking);
router.post('/updatebooking/:id' , updatebooking);
router.post('/deletebooking/:id' , deletebooking);

export default router;