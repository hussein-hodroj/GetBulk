import workoutModel from '../model/workouttype.js';
import publicModel from '../model/publicworkout.js';
export const getAllWorkouts = async (req, res) => {
 await workoutModel.find()
    .populate('publicworkout')
    .then((workouts) => res.json(workouts))
    .catch((err) => res.status(400).json('Error: ' + err));
};
export const createWorkout = async (req, res) => {
  const { descriptionworkout, Time, type, week, publicworkout } = req.body;
  const newWorkout =  new workoutModel({
    descriptionworkout,
    Time,
    type,
    week,
    publicworkout,
  });

  await newWorkout
    .save()
    .then(() => res.json('Workout created!'))
    .catch((err) => res.status(400).json('Error: ' + err));
};
export const getWorkoutById = async (req, res) => {
 await  workoutModel.findById(req.params.id)
    .populate('publicworkout')
    .then((workout) => {
      if (!workout) {
        return res.status(404).json('Workout not found');
      }
      res.json(workout);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
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
export const deleteWorkout = async(req, res) => {
 await  Workout.findByIdAndDelete(req.params.id)
    .then((workout) => {
      if (!workout) {
        return res.status(404).json('Workout not found');
      }
      res.json('Workout deleted!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};


