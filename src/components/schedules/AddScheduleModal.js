import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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

const AddScheduleModal = ({ isOpen, onClose, onAdd }) => {
  const [userData, setUserData] = useState('');
  const [userName, setUserName] = useState('Admin');
  const [date, setDate] = useState('');
  const [timeSchedule, setTimeSchedule] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;
  
  
    axios.get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        const userData = response.data;
  
        // console.log("userData =>", userData);  Add this line to check the fetched user data
  
        if (userData) {
          setUserName(userData.fullname);
          setUserData(userData);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!date || !timeSchedule) {
      console.error('Please fill in all the fields.');
      return;
    }
  
    const newSchedule = {
      date,
      Timeschedule: timeSchedule,
      trainerId: userData._id,  
    };
  
    try {
      await onAdd(newSchedule);
      setDate('');
      setTimeSchedule('');
  
      onClose();
    } catch (error) {
      console.error('Error adding schedule:', error); 
    }
  };
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-xl mb-4">Add Schedule</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="trainer" className="block text-white font-medium mb-1">
            Trainer
          </label>
          <input
            type="text"
            id="trainer"
            value={userName}
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
          Add Schedule
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

export default AddScheduleModal;
