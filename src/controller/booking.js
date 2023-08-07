import BookingModel from '../model/booking.js'
import UserModel from '../model/user.js'
import ScheduleModel from '../model/schedule.js'

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
      const allbookings = await BookingModel.find();
      res.status(200).json(allbookings);
    } catch (error) {
      console.error('Error retrieving All Booking:', error);
      res.status(500).send('Error retrieving  All Booking');
    }
  };

  export const createbooking = async (req, res) => {
    const { _id, schedule, users} = req.body;
    try {
      const newbooking = new BookingModel({
        schedule,
        users
      });
      await newbooking.save();
      res.status(200).send('Booking created successfully');
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).send('Error creating booking');
    }
  };

  export const updatebooking = async (req, res) => {
    const { _id, users  } = req.body;
  
    await BookingModel
      .findByIdAndUpdate(_id, { users  })
      .then(() => res.send('Updated Successfully!'))
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error updating booking');
      });
  };

export const deletebooking = async (req, res ) => {
    const {_id} = req.body
    BookingModel
    .findByIdAndDelete(_id)
    .then(()=> res.send("deleted successfully"))
    .catch((err)=> console.log(err))
}