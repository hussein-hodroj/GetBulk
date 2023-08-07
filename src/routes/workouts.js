import  express  from 'express';
import { createWorkout, deleteWorkout, getAllWorkouts, getWorkoutById, updateWorkout } from '../controller/workout.js';


const router = express.Router();

router.get('/getwork', getAllWorkouts);
router.post('/create', createWorkout);
router.get('/:id/getByid',getWorkoutById);
router.put('/:id/update', updateWorkout);
router.delete('/:id/delete', deleteWorkout);

export default router;
