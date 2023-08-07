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
    const allschedule = await ScheduleModel.find();
    res.status(200).json(allschedule);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).send('Error retrieving categories');
  }
};

export const createschedule = async (req, res) => {
  const { day, Timeshedule, status } = req.body;

  try {
    const newschedule = new ScheduleModel({ day, Timeshedule, status });

    await newschedule.save();
    res.status(200).send('schedule created successfully');
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).send('Error creating schedule');
  }
};

export const updateschedule = async (req, res) => {
  const { _id, day, Timeshedule, status } = req.body;

  await ScheduleModel
    .findByIdAndUpdate(_id, { day, Timeshedule, status })
    .then(() => res.send('Updated Successfully!'))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error updating schedule');
    });
};

export const deleteschedule = async (req, res) => {
  try {
    const { _id } = req.body;
    await ScheduleModel.findByIdAndDelete(_id);
    res.send('Deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};
