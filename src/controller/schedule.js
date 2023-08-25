import UserModel from '../model/user.js'
import ScheduleModel from '../model/schedule.js'

export const getschedule = async (req, res) => {
  try {
    const schedules = await ScheduleModel.findById(req.params.id);
    const trainername = await UserModel.findById(schedules.users);
    console.log(schedules.users);
    res.status(200).json(trainername);
  } catch (error) {
    console.error('Error retrieving schedule:', error);
    res.status(500).send('Error retrieving schedule');
  }
};

export const getAllschedule = async (req, res) => {
  try {
    const schedules = await ScheduleModel.find();

    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ error: 'Schedules not found' });
    }

    const trainersNamesPromises = schedules.map(async (schedule) => {
      try {
        const trainer = await UserModel.findById(schedule.trainerId);
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
          ...schedule._doc,
          ...trainerData,
        };
      } catch (error) {
        console.error('Error retrieving trainer data:', error);
        return {
          ...schedule._doc,
          tname: 'Unknown trainer',
          temail: 'Unknown email',
          tphonenumber: 'Unknown phone number',
          taddress: 'Unknown address',
        };
      }
    });

    const schedulesWithUserInfo = await Promise.all(trainersNamesPromises);

    res.status(200).json(schedulesWithUserInfo);
  } catch (error) {
    console.error('Error retrieving schedules:', error);
    res.status(500).json({ error: 'Error retrieving schedules' });
  }
};


export const createschedule = async (req, res) => {
  const { trainerId, date, Timeschedule } = req.body;
  try {
    const newSchedule = new ScheduleModel({
 
      trainerId, 
      date, 
      Timeschedule, 
    })
    await newSchedule.save();
    res.send('Schedule created successfully');
  } catch (error) {
    console.error('Error creating Schedule:', error);
    res.status(500).send('Error creating Schedule');
  }
};

export const updateschedule = async (req, res) => {
  try {
    const scheduleId = req.params.id; // Assuming you're passing the schedule ID as a URL parameter
    const { trainerId, date, Timeschedule, status } = req.body;

    const updatedSchedule = await ScheduleModel.findByIdAndUpdate(
      scheduleId,
      {
        trainerId,
        date,
        Timeschedule,
        status,
      },
      { new: true } // To return the updated schedule
    );

    if (!updatedSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ error: 'Error updating schedule' });
  }
};

export const deleteschedule = async (req, res) => {
  try {
    const scheduleId = req.params.id; // Assuming you're passing the schedule ID as a URL parameter

    const deletedSchedule = await ScheduleModel.findByIdAndDelete(scheduleId);

    if (!deletedSchedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.status(204).send(); // No content sent, just a status indicating success
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'Error deleting schedule' });
  }
};

export const getTrainerSchedule = async (req, res) => {
  try {
    const schedules = await ScheduleModel.find({
      trainerId: req.params.trainerId,
      status: 0 // Add this condition to filter by status
    });

    if (!schedules || schedules.length === 0) {
      return res.status(404).json({ error: 'Schedules not found for this trainer' });
    }

    const schedulesWithUserInfoPromises = schedules.map(async (schedule) => {
      const trainer = await UserModel.findById(schedule.trainerId);

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
        ...schedule._doc,
        ...trainerData,
      };
    });

    const schedulesWithUserInfo = await Promise.all(schedulesWithUserInfoPromises);

    res.status(200).json(schedulesWithUserInfo);
  } catch (error) {
    console.error('Error retrieving schedules:', error);
    res.status(500).json({ error: 'Error retrieving schedules' });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { selectedSchedules } = req.body;
    for (const event of selectedSchedules) {
      await ScheduleModel.findByIdAndUpdate(
        event.id, // Use event.id to update the specific event
        { $set: { status: 1 } }, // Set the status to ACTIVE (1)
        { new: true } // This ensures the updated document is returned
      );
    }
    res.status(200).json({ message: 'Schedule statuses updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating schedule statuses.' });
  }
};