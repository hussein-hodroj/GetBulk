import mongoose from "mongoose";


const FeedbackSchema = new mongoose.Schema({

    feedback: {
        type: String,
    },
    users: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
    },
    trainers:{
        
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
    },
    trainername:{
        type: String,
    }

});

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema);;
export default FeedbackModel;
