import mongoose from "mongoose";


const Type = {
    BEGINNER:'beginner',
    INTERMEDIATE:'intermediate', 
    ADVANCE:'advance',

    
   
};
const workoutSchema = new mongoose.Schema({

    descriptionworkout: {
        type: String,
        required: true,
    },
    Time: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(Type),
        required: true,
    },
    week: {
        type: Date,
        required: true,
    },
    publicworkout: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'publicworkout', 
        required: true
    },


});

const workoutModel = mongoose.model('Workout', workoutSchema);

export default workoutModel;
