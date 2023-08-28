import express from 'express';
import { getBookingsByUserAndTrainer, deleteBooking } from '../controller/bookingUser.js'; 

const router = express.Router();


router.get('/:userId/:trainerId', getBookingsByUserAndTrainer);
router.delete('/:bookingId', deleteBooking);

export default router;
