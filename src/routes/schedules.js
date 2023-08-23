import express from 'express';

import { getschedule, createschedule, updateschedule, deleteschedule, getAllschedule, getTrainerSchedule,updateStatus } from '../controller/schedule.js';

const router = express.Router();

router.get('/getschedule/:id', getschedule);
router.get('/getAllschedule', getAllschedule);
router.get('/getTrainerSchedule/:trainerId', getTrainerSchedule);
router.post('/createschedule', createschedule); 
router.post('/updateschedule/:id', updateschedule);
router.post('/deleteschedule/:id', deleteschedule);
router.put('/updateStatus', updateStatus)


export default router;
