import BookingModel from '../model/booking.js'; 

export async function getBookingsByUserAndTrainer(req, res) {
  const userId = req.params.userId;
  const trainerId = req.params.trainerId;
  
  try {
    const bookings = await BookingModel.find({ userId, trainerId }).select('date Timeschedule');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings.' });
  }
}

export async function deleteBooking(req, res) {
  const bookingId = req.params.bookingId;
  try {
    const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);
    if (deletedBooking) {
      res.json({ message: 'Booking deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Booking not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking.' });
  }
}
