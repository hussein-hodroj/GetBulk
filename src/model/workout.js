import mongoose from "mongoose";

const Type = {
    BEGINNER:'beginner',
    INTERMEDIATE:'intermediate', 
    ADVANCE:'advance',
};
const Gender = {
    MALE:'male',
    FEMALE:'female', 
};
const Workoutplan = {
    THREEDAYSPLAN:'threedaysplan',
    FOURDAYSPLAN:'fourdaysplan', 
    FIVEDAYSPLAN:'fivedaysplan',
    SIXDAYSPLAN:'sixdaysplan', 
};
const Day = {
    MONDAY:'Monday',
    TUESDAY:'Tuesday', 
    WEDNESDAY:'Wednesday',
    THURSDAY:'Thursday', 
    FRIDAY:'Friday',
    SATURDAY:'Saturday',
    SUNDAY:'Sunday',
};


const workoutSchema = new mongoose.Schema({

    descriptionworkout: [{  
        type: String,
    }],
    Time: {
        type: Number,
    },
    type: {
        type: String,
        enum: Object.values(Type),
    },
    Day: {
        type: String,
        enum: Object.values(Day),
    },
    imageworkout: [{
        type: String,
    }],
    
    gender: {
        type: String,
        enum: Object.values(Gender),
    },
    Duration: {
        type: String,
        
    },
    trainers:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
    },
    workoutplan: {
        type: String,
        enum: Object.values(Workoutplan),
    },
    



});

const workoutModel = mongoose.model('Workout', workoutSchema);

export default workoutModel;
