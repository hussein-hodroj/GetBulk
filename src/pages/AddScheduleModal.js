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

  const AddScheduleModal = ({ isOpen, onClose, onAdd }) => {
    const [trainerId, setTrainerId] = useState(''); 
    const [trainers, setTrainers] = useState([]); 
    const [selectedTrainer, setSelectedTrainer] = useState(null); 
    const [date, setDate] = useState('');
    const [timeSchedule, setTimeSchedule] = useState('');
    const [status, setStatus] = useState(0); 
  
    useEffect(() => {
      fetchTrainers();
    }, []);
  
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/trainers'); 
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };
  
    const handleTrainerChange = (event) => {
      const selectedTrainerId = event.target.value;
      const selectedTrainer = trainers.find((trainer) => trainer._id === selectedTrainerId);
      setSelectedTrainer(selectedTrainer);
      setTrainerId(selectedTrainerId);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      
      if (!trainerId || !date || !timeSchedule) {
        console.error('Please fill in all the fields.');
        return;
      }
  
      const newSchedule = {
        trainerId,
        date,
        Timeschedule: timeSchedule,
        status: parseInt(status),
      };
  
      try {
        await onAdd(newSchedule);
  
        setTrainerId('');
        setDate('');
        setTimeSchedule('');
        setStatus('');
  
        onClose();
      } catch (error) {
        console.error('Error adding schedule:', error.response.data);
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
          <select
            id="trainer"
            value={trainerId}
            onChange={handleTrainerChange}
            className="w-full bg-white rounded p-2"
            required
          >
            <option value="">Select a trainer</option>
            {trainers.map((trainer) => (
              <option key={trainer._id} value={trainer._id}>
                {trainer.fullname}
              </option>
            ))}
          </select>
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
