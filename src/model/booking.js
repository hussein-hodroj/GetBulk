import mongoose from 'mongoose';



const BookingSchema = new mongoose.Schema({
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schedule',
    required: true
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
});

const BookingModel = mongoose.model('Booking', BookingSchema);
export default BookingModel;
