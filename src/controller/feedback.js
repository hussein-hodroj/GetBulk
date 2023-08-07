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
      const feedbacks = await FeedbackModel.find()

    
        
      res.status(200).json(feedbacks);
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

export const  deletefeedback = async(req,res) => {
    const {_id} = req.body;
    try{
        await FeedbackModel.findByIdAndDelete(_id);
        res.send ('feedback deleted successfuly');
    }catch (error) {
        res.status(500).send('Error deleting feedback');
      }
}