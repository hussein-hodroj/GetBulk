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
    width: '70%',
    maxWidth: '500px',
    backgroundColor: 'rgb(44, 42, 42)',
    border: '2px solid rgb(44, 42, 42)',
    borderRadius: '8px',
    padding: '20px',
  },
};

const UpdateScheduleModal = ({ isOpen, onClose, handleUpdateSchedule, selectedSchedule }) => {
  const [initialDate, setInitialDate] = useState('');
  const [initialTimeSchedule, setInitialTimeSchedule] = useState('');
  const [date, setDate] = useState('');
  const [timeSchedule, setTimeSchedule] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');


useEffect(() => {
  if (selectedSchedule) {
    setInitialDate(selectedSchedule.date);
    setInitialTimeSchedule(selectedSchedule.Timeschedule);
    setDate(selectedSchedule.date);
    setTimeSchedule(selectedSchedule.Timeschedule);
  }
}, [selectedSchedule]);

const handleCancel = () => {
  setDate(initialDate);
  setTimeSchedule(initialTimeSchedule);
  onClose();
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setDateError('');
    setTimeError('');
  
    if (!date) {
      setDateError('Date is required.');
    }
    if (!timeSchedule) {
      setTimeError('Time is required.');
    }
  
    if (!date || !timeSchedule) {
      return;
    }
  
    const updatedSchedule = {
      date,
      Timeschedule: timeSchedule,
    };
  

  console.log('Updated Schedule:', updatedSchedule);

  try {
    await axios.post(
      `http://localhost:8000/schedule/updateschedule/${selectedSchedule._id}`,
      updatedSchedule
    );
    handleUpdateSchedule(updatedSchedule);
    onClose();
  } catch (error) {
    console.error('Error updating schedule:', error.response.data);
  }
};

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-2xl mb-12">Update Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label htmlFor="trainer" className="block text-white font-medium mb-4">
    Trainer
  </label>
  <input
    type="text"
    value={selectedSchedule ? selectedSchedule.tname : ''}
    readOnly
    className="w-full bg-white text-black  rounded p-2"
  />
        </div>
        <div className="mb-4">
  <label htmlFor="date" className="block text-white font-medium mb-4">
    Date
  </label>
  <input
    type="date"
    id="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full bg-white text-black rounded p-2"
    
  />
  {dateError && <p className="text-red-500">{dateError}</p>}
</div>
<div className="mb-4">
  <label htmlFor="timeSchedule" className="block text-white font-medium mb-4">
    Time Schedule
  </label>
  <input
    type="time"
    id="timeSchedule"
    value={timeSchedule}
    onChange={(e) => setTimeSchedule(e.target.value)}
    className="w-full bg-white text-black rounded p-2 mb-8"
  
  />
  {timeError && <p className="text-red-500">{timeError}</p>}
</div>
<div className="flex justify-end">
        
<button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg ml-2 hover:bg-yellow-600"
        >
          Update Schedule
        </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateScheduleModal;
