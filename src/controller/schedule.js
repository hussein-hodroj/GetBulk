import UserModel from '../model/user.js'
import ScheduleModel from '../model/schedule.js'

export const getschedule = async (req, res) => {
  try {
    const schedules = await ScheduleModel.findById(req.params.id);
    const username = await UserModel.findById(schedules.users);
    console.log(schedules.users);
    res.status(200).json(username);
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


    // Create an array to hold trainer names for each schedule
    const trainersNamesPromises = schedules.map(async (schedule) => {
      const trainer = await UserModel.findById(schedule.trainerId);
      return trainer ? trainer.fullname : 'Unknown trainer';
    });

    // Use Promise.all to await all the promises
    const trainersNames = await Promise.all(trainersNamesPromises);

    // Combine each schedule with its corresponding users and trainers names
    const schedulesWithNames = schedules.map((schedule, index) => ({
      ...schedule._doc,
      tname: trainersNames[index],
    }));

    res.status(200).json(schedulesWithNames);
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
