import mongoose from "mongoose";


const Status = {
    UNACTIVE:0,
    ACTIVE:1,
};
const scheduleSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true
        },
    trainerId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    
    date:{
       type:String,
       required: true
    },
    Timeschedule: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        enum: Object.values(Status),
        default: 0,

    }


});

const scheduleModel = mongoose.model('Schedule', scheduleSchema);
export default scheduleModel;
