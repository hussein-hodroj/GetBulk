import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '550px',
    maxHeight: '650px',
    backgroundColor: 'black', 
    border: '2px solid black', 
    borderRadius: '8px', 
    padding: '20px',
  },
};

const AddWorkoutModal = ({ isOpen, onClose, onAdd }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [time, setTime] = useState(0);
  const [type, setType] = useState('');
  const [day, setDay] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [gender, setGender] = useState('');
  const [duration, setDuration] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState('');
  const [userData, setUserData] = useState('');


  const handleImageChange = (e) => {
    setSelectedImages([...selectedImages, ...e.target.files]);
  };
  

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;

    axios
      .get(`http://localhost:8000/user/${id}`)
      .then((response) => {
        const userData = response.data;

        if (userData) {
          setUserData(userData);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!descriptions.length || !time || !type || !day || !gender || !duration || !workoutPlan || selectedImages.length === 0) {
      console.error('Please fill in all the fields and select at least one image.');
      return;
    }
  
    const formData = new FormData(e.target);
  
    selectedImages.forEach((image, index) => {
      formData.append('imageworkout', image);
    });
  
    const newWorkout = {
      descriptionworkout: descriptions.join('\n'), 
      Time: parseFloat(time),     
      type: type,
      Day: day,
      gender: gender,
      Duration: duration,
      workoutplan: workoutPlan,
      trainers: userData._id,
    };
  
    formData.append('workoutData', JSON.stringify(newWorkout));
  
    try {
      await onAdd(formData, newWorkout);
  
      setDescriptions((prevDescriptions) => [...prevDescriptions, ...descriptions]);
      setTime(0);
      setType('');
      setDay('');
      setSelectedImages([]);
      setGender('');
      setDuration('');
      setWorkoutPlan('');
  
      onClose();
    } catch (error) {
      console.error('Error adding workout:', error.response.data);
    }
  };

  const handleAddDescription = () => {
    setDescriptions((prevDescriptions) => [...prevDescriptions, ""]);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleRemoveDescription = (index) => {
    const newDescriptions = descriptions.filter((_, i) => i !== index);
    setDescriptions(newDescriptions);
  };
  


  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-xl mb-4 ">Add Workout</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-4">
        <div className="w-full">
        <label className="text-white mb-2">Descriptions:</label>
            <div>
              {descriptions.map((desc, index) => (
                <div key={index} className="flex space-x-2 items-center mb-2">
                  <textarea
                    value={desc}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    name="descriptionworkout"
                    className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full h-[40px] text-black resize-none"
                  />
                  <button
                    onClick={() => handleRemoveDescription(index)}
                    className="text-yellow-500 "
                    name="descriptionworkout"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
  type="button"
  onClick={handleAddDescription}
  className="text-yellow-500 mt-2 border border-yellow-500 rounded px-3 py-1"
>
  Add Description
</button>

          </div>
        </div>

        <div className="w-full">
          <label className="text-white">Time / in hours:</label>
    <input
      type="number"
      value={time}  
      name="Time"
      onChange={(e) => setTime(Math.max(0, parseInt(e.target.value)))}
      className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
    />
          </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <label className="text-white">Gender:</label>
            <select
              value={gender}
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="w-1/2 pl-4">
          <label className="text-white">Workout Plan:</label>
            <select
              value={workoutPlan}
              name="workoutplan"
              onChange={(e) => setWorkoutPlan(e.target.value)}

              className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
            >
              <option value="">Select Workout Plan</option>
              <option value="threedaysplan"> 3 Days Plan</option>
              <option value="fourdaysplan"> 4 Days Plan</option>
              <option value="fivedaysplan"> 5 Days Plan</option>
              <option value="sixdaysplan"> 6 Days Plan</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <label className="text-white">Type:</label>
            <select
              value={type}
              name="type"
              onChange={(e) => setType(e.target.value)}
              className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
            >
              <option value="">Select Type</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advance">Advance</option>
            </select>
          </div>
          <div className="w-1/2 pl-4">
          <label className="text-white">Duration:</label>
            <input
              type="text"
              value={duration}
              name="Duration"
              onChange={(e) => setDuration(e.target.value)}
              className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
            />
          </div>
        </div>
        <div className="flex justify-between mb-4">
        <div className="w-1/2">
        <label className="text-white">Day:</label>
        <select
      value={day} 
      onChange={(e) => setDay(e.target.value)}
      name="Day"
      className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
    >
    <option value="">Select Day</option>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
  </select>
</div>
        <div className="w-1/2 pl-4 mb-4">
          <label className="text-white">Image:</label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            name="imageworkout" 
            onChange={handleImageChange}
            multiple
            className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full border-2 focus:outline-none"
          />
          {selectedImages.length > 0 && (
  <div className="mt-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
    {selectedImages.map((img, index) => (
      <div key={index} className="flex space-x-2 items-center">
        <img
          src={URL.createObjectURL(img)}
          alt=""
          className="h-10 w-10 rounded-full"
        />
        <button
          onClick={() => handleRemoveImage(index)}
          className="text-yellow-500"
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}
        </div>
      </div>

        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400"
            type="submit"
          >
            Add
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};


export default AddWorkoutModal;
