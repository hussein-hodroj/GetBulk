import workoutModel from '../model/workout.js';
import UserModel from '../model/user.js'

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/usersImages/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const configureUpload = () => {
  return multer({ storage: storage }).array('imageworkout', 10);
};

 


export const getAllWorkouts = async (req, res) => {
  try {
    const AllWorkouts = await workoutModel.find();
    res.status(200).json(AllWorkouts);
  } catch (error) {
    console.error('Error retrieving workouts:', error);
    res.status(500).send('Internal server error');
  }
};

export const createWorkout = async (req, res) => {
  try {
    const { descriptionworkout, Time, type, Day, gender, Duration, trainers, workoutplan  } = req.body;
    const imageworkoutFilenames = req.files.map(file => file.originalname);

    const newWorkout = new workoutModel({
      descriptionworkout,
      Time,
      type,
      Day,
      imageworkout: imageworkoutFilenames,
      gender,
      Duration,
      trainers,
      workoutplan,
    });

    await newWorkout.save();
    res.json('Workout created!');
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(400).json('Error: ' + error);
  }
};









export const getWorkoutById = async (req, res) => {
  const workoutId = req.params.id; 

  try {
    const workout = await workoutModel.findById(workoutId);

    if (!workout) {
      return res.status(404).json({ message: 'workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving workout', error: error.message });
  }
};


export const updateWorkout = async(req, res) => {
  await workoutModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((workout) => {
      if (!workout) {
        return res.status(404).json('Workout not found');
      }
      res.json('Workout updated!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};


export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  try {

   const Workout =  await workoutModel.findByIdAndDelete(id);

   if(!Workout) return res.status(404).json('Workout Not Found');

    res.status(200).send('Workout deleted successfully');
  } catch (error) {
    console.error('Error deleting Workout:', error);
    res.status(500).send('Internal server error');
  }
};


