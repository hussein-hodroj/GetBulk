import express from 'express';
import { createPublicWorkout, deletePublicWorkout, getAllPublicWorkouts, getPublicWorkoutById, updatePublicWorkout } from '../controller/public.js';


const router = express.Router();

router.get('/getallpublic', getAllPublicWorkouts);
router.post('/publicCreate', createPublicWorkout);
router.get('/:id/getPubById', getPublicWorkoutById);
router.put('/:id/updatepublic',updatePublicWorkout);
router.delete('/:id/deletepublic', deletePublicWorkout);

export default  router;