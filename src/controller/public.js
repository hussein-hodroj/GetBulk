import publicModel from '../model/publicworkout.js';

export const getAllPublicWorkouts =  async (req, res) => {
  await publicModel.find()
    .then((publicWorkouts) => res.json(publicWorkouts))
    .catch((err) => res.status(400).json('Error: ' + err));
};
export const createPublicWorkout = async (req, res) => {
  const { duration, type } = req.body;
  const newPublicWorkout = new publicModel({
    duration,
    type,
  });
  await newPublicWorkout
    .save()
    .then(() => res.json('Public workout created!'))
    .catch((err) => res.status(400).json('Error: ' + err));
};
export const getPublicWorkoutById = async(req, res) => {
 await  publicModel.findById(req.params.id)
    .then((publicWorkout) => {
      if (!publicWorkout) {
        return res.status(404).json('Public workout not found');
      }
      res.json(publicWorkout);
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};
export const updatePublicWorkout = async(req, res) => {
 await  publicModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((publicWorkout) => {
      if (!publicWorkout) {
        return res.status(404).json('Public workout not found');
      }
      res.json('Public workout updated!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};

export const deletePublicWorkout =async (req, res) => {
 await  publicModel.findByIdAndDelete(req.params.id)
    .then((publicWorkout) => {
      if (!publicWorkout) {
        return res.status(404).json('Public workout not found');
      }
      res.json('Public workout deleted!');
    })
    .catch((err) => res.status(400).json('Error: ' + err));
};

