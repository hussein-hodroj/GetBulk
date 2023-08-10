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
  
      if (!feedbacks || feedbacks.length === 0) {
        return res.status(404).json('Feedbacks Not Found');
      }
  
      const feedbacksWithNames = await Promise.all(
        feedbacks.map(async (feedback) => {
          const user = await UserModel.findById(feedback.users);
          const trainer = await UserModel.findById(feedback.trainers);
  
          if (!user || !trainer) {
            return null; // Skip this feedback if user or trainer not found
          }
  
          const name = user.fullname;
          const trainername = trainer.fullname;
          const feedbackContent = feedback.feedback; // Access the feedback directly
  
          return {
            user: name,
            trainer: trainername,
            feedbackContent: feedbackContent,
            // Add other feedback properties here if needed
          };
        })
      );
  
      // Filter out null values (feedbacks with missing user/trainer)
      const validFeedbacks = feedbacksWithNames.filter((feedback) => feedback !== null);
  
      res.status(200).json(validFeedbacks);
    } catch (error) {
      console.error('Error retrieving feedbacks:', error);
      res.status(500).send('Error retrieving feedbacks');
    }
  };
  
  export const createfeedback = async (req, res) => {
    const { _id, feedback, users, trainers } = req.body;
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
