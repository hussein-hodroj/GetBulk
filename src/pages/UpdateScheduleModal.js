import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    backgroundColor: 'black',
    border: '2px solid black',
    borderRadius: '8px',
    padding: '20px',
  },
};

const UpdateScheduleModal = ({ isOpen, onClose, handleUpdateSchedule, selectedSchedule, updateSchedulesList }) => {
  const [date, setDate] = useState('');
  const [timeSchedule, setTimeSchedule] = useState('');

  useEffect(() => {
    if (selectedSchedule) {
      setDate(selectedSchedule.date);
      setTimeSchedule(selectedSchedule.Timeschedule);
    }
  }, [selectedSchedule]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedSchedule) {
    return;
  }

  const updatedSchedule = {
    date,
    Timeschedule: timeSchedule,
  };

  console.log('Updated Schedule:', updatedSchedule); // Log the updated schedule here

  try {
    await axios.post(
      `http://localhost:8000/schedule/updateschedule/${selectedSchedule._id}`,
      updatedSchedule
    );
    updateSchedulesList();
    onClose();
  } catch (error) {
    console.error('Error updating schedule:', error.response.data);
  }
};

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-xl mb-4">Update Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label htmlFor="trainer" className="block text-white font-medium mb-1">
    Trainer
  </label>
  <input
    type="text"
    value={selectedSchedule ? selectedSchedule.tname : ''}
    readOnly
    className="w-full bg-white rounded p-2"
  />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-white font-medium mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timeSchedule" className="block text-white font-medium mb-1">
            Time Schedule
          </label>
          <input
            type="time"
            id="timeSchedule"
            value={timeSchedule}
            onChange={(e) => setTimeSchedule(e.target.value)}
            className="w-full bg-white rounded p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Update Schedule
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 hover:bg-red-600"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default UpdateScheduleModal;
