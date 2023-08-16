import workoutModel from '../model/workout.js';
import UserModel from '../model/user.js'



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
  const { descriptionworkout, Time, type, Day, imageworkout, gender, Duration, trainers, workoutplan  } = req.body;
  const newWorkout =  new workoutModel({
    descriptionworkout,
    Time,
    type,
    Day,
    imageworkout,
    gender,
    Duration,
    trainers,
    workoutplan,
  });

  await newWorkout
    .save()
    .then(() => res.json('Workout created!'))
    .catch((err) => res.status(400).json('Error: ' + err));
};



export const getWorkoutById = async (req, res) => {
  try {
      const workout = req.params.id
    const trainers = await UserModel.findById(workout);

    if(!trainers) return res.status(404).json('workout Not Found');
    res.status(200).json(trainers);
  } catch (error) {
    console.error('Error retrieving workout:', error);
    res.status(500).send('Internal server error');
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


