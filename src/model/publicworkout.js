import mongoose from "mongoose";

const Type = {
    BEGINNER:'beginner',
    INTERMEDIATE:'intermediate', 
    ADVANCE:'advance',

    
   
};
const publicSchema = new mongoose.Schema({

    
    duration: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(Type),
        required: true,
    }


});

const publicModel = mongoose.model('Publics', publicSchema);
export default publicModel;