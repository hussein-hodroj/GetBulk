import BookingModel from '../model/booking.js'
import UserModel from '../model/user.js'

export const getbooking = async (req, res) => {
    try {
      const bookings = await BookingModel.findById(req.params.id);
      const username = await UserModel.findById(bookings.users);
      console.log(bookings.users);
      res.status(200).json(username);
    } catch (error) {
      console.error('Error retrieving schedule:', error);
      res.status(500).send('Error retrieving schedule');
    }
  };
  export const getAllBooking = async (req, res) => {
    try {
      const bookings = await BookingModel.find();
  
      if (!bookings || bookings.length === 0) {
        return res.status(404).json({ error: 'bookings not found' });
      }
  
      const usersAndTrainersPromises = bookings.map(async (booking) => {
        const user = await UserModel.findById(booking.userId);
        const trainer = await UserModel.findById(booking.trainerId);
  
        const userData = user
          ? {
              uname: user.fullname,
              uemail: user.email,
              uphonenumber: user.phonenumber,
              uaddress: user.address,
            }
          : {
              uname: 'Unknown user',
              uemail: 'Unknown email',
              uphonenumber: 'Unknown phone number',
              uaddress: 'Unknown address',
            };
  
        const trainerData = trainer
          ? {
              tname: trainer.fullname,
              temail: trainer.email,
              tphonenumber: trainer.phonenumber,
              taddress: trainer.address,
            }
          : {
              tname: 'Unknown trainer',
              temail: 'Unknown email',
              tphonenumber: 'Unknown phone number',
              taddress: 'Unknown address',
            };
  
        return {
          ...booking._doc,
          ...userData,
          ...trainerData,
        };
      });
  
      const bookingsWithUserInfo = await Promise.all(usersAndTrainersPromises);
  
      res.status(200).json(bookingsWithUserInfo);
    } catch (error) {
      console.error('Error retrieving bookings:', error);
      res.status(500).json({ error: 'Error retrieving bookings' });
    }
  };

  export const createbooking = async (req, res) => {
    const { userId, trainerId, date, Timeschedule } = req.body;
  try {
    const newBooking = new BookingModel({
      userId, 
      trainerId, 
      date, 
      Timeschedule, 
    })
    await newBooking.save();
    res.send('Booking created successfully');
  } catch (error) {
    console.error('Error creating Booking:', error);
    res.status(500).send('Error creating Booking');
  }
  };

  export const updatebooking = async (req, res) => {
    try {
      const bookingId = req.params.id; // Assuming you're passing the booking ID as a URL parameter
      const { userId, trainerId, date, Timeshedule, status } = req.body;
  
      const updatedBooking = await BookingModel.findByIdAndUpdate(
        bookingId,
        {
          userId,
          trainerId,
          date,
          Timeshedule,
          status,
        },
        { new: true } // To return the updated booking
      );
  
      if (!updatedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
  
      res.status(200).json(updatedBooking);
    } catch (error) {
      console.error('Error updating Booking:', error);
      res.status(500).json({ error: 'Error updating Booking' });
    }
  };

export const deletebooking = async (req, res ) => {
    const {_id} = req.body
    BookingModel
    .findByIdAndDelete(_id)
    .then(()=> res.send("deleted successfully"))
    .catch((err)=> console.log(err))
}