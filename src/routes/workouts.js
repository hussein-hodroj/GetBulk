import express from 'express';
import { createWorkout, configureUpload, deleteWorkout, getAllWorkouts, getWorkoutById, updateWorkout } from '../controller/workout.js';

const router = express.Router();

// Call the configureUpload function to get the upload middleware
const upload = configureUpload();


router.get('/getwork', getAllWorkouts);

// Use the upload middleware here
router.post('/addworkout', upload, createWorkout);

router.get('/:id/getByid', getWorkoutById);

router.put('/:id/update', updateWorkout);

router.delete('/:id/delete', deleteWorkout);

export default router;
