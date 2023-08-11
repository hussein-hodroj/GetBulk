import FeedbackModel from '../model/feedback.js';
import UserModel from '../model/user.js';

export const getFeedback = async (req, res) => {
    try {
      const feedbacks = await FeedbackModel.findById(req.params.id)

      if(!feedbacks) return res.status(404).json('Feedback Not Found');

      const username = await UserModel.findById(feedbacks.users);

      const name = username.fullname

      console.log(feedbacks.users)
        
      res.status(200).json(name);
    } catch (error) {
      console.error('Error retrieving feedbacks:', error);
      res.status(500).send('Error retrieving feedbacks');
    }
  };

  export const getAllFeedback = async (req, res) => {
    try {
      const feedbacks = await FeedbackModel.find();
  
      if (!feedbacks) return res.status(404).json('Feedbacks not found');
  
      // Create an array to hold user names for each feedback
      const usersNames = await Promise.all(
        feedbacks.map(async (feedback) => {
          const users = await UserModel.findById(feedback.users);
          return users ? users.fullname : 'Unknown user';
        })
      );
      // Create an array to hold trainer names for each feedback
      const trainersNames = await Promise.all(
        feedbacks.map(async (feedback) => {
          const trainers = await UserModel.findById(feedback.trainers);
          return trainers ? trainers.fullname : 'Unknown trainer';
        })
      );
  
      // Combine each feedback with its corresponding users and trainers name
      const feedbacksWithUsersNames = feedbacks.map((feedback, index) => ({
        ...feedback._doc,
        uname: usersNames[index],
        tname: trainersNames[index],
      }));
  
      res.status(200).json(feedbacksWithUsersNames);
    } catch (error) {
      console.error('Error retrieving feedbacks:', error);
      res.status(500).send('Error retrieving feedbacks');
    }
  };
  
  
  
  export const createfeedback = async (req, res) => {
    const { feedback, users, trainers } = req.body;
    try {
      const newfeedback = new FeedbackModel({
        feedback,
        users,
        trainers
      });
      await newfeedback.save();
      res.send('feedback created successfully');
    } catch (error) {
      console.error('Error creating feedback:', error);
      res.status(500).send('Error creating feedback');
    }
  };

export const updatefeedback = async (req,res) => {
    const {_id, feedback, users, trainers} = req.body; 
    try{
        await FeedbackModel.findByIdAndUpdate (_id, {feedback, users, trainers});
        res.send('feedback updated successfuly');
    }catch (error) {
        res.status(500).send('Error updating feedback');
      }
};

export const deletefeedback = async (req, res) => {
  const { id } = req.params;

  try {

   const userFeedback =  await FeedbackModel.findByIdAndDelete(id);

   if(!userFeedback) return res.status(404).json('feedback Not Found');

    res.status(200).send('feedback deleted successfully');
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).send('Error deleting feedback');
  }
};
