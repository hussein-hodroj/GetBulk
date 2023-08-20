import express from 'express';

import { getschedule, createschedule, updateschedule, deleteschedule, getAllschedule, getTrainerSchedule } from '../controller/schedule.js';

const router = express.Router();

router.get('/getschedule/:id', getschedule);
router.get('/getAllschedule', getAllschedule);
router.get('/getTrainerSchedule/:trainerId', getTrainerSchedule);
router.post('/createschedule', createschedule); 
router.post('/updateschedule/:id', updateschedule);
router.post('/deleteschedule/:id', deleteschedule);


export default router;
