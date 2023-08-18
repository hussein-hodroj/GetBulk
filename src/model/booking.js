import mongoose from 'mongoose';



const BookingSchema = new mongoose.Schema({
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
    }
});

const BookingModel = mongoose.model('Booking', BookingSchema);
export default BookingModel;
