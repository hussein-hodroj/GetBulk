import mongoose from "mongoose";


const Status = {
    UNACTIVE:0,
    ACTIVE:1,
};
const scheduleSchema = new mongoose.Schema({

    users: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
    },
    day:{
       type:Number,
       required: true, 
    },
    Timeshedule: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        enum: Object.values(Status),
        required: true,
    }


});

const scheduleModel = mongoose.model('Schedule', scheduleSchema);
export default scheduleModel;
