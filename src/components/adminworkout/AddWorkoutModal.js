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
    width: '70%',
    maxWidth: '700px',
    maxHeight: '650px',
    backgroundColor: '#52525b', 
    border: '2px solid #52525b', 
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
  const [userName, setUserName] = useState('');




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
  
  const [errors, setErrors] = useState({
    descriptions: '',
    time: '',
    type: '',
    day: '',
    gender: '',
    duration: '',
    workoutPlan: '',
    images: '',
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      descriptions: '',
      time: '',
      type: '',
      day: '',
      gender: '',
      duration: '',
      workoutPlan: '',
      images: '',
    });

   
    let hasErrors = false;
    const newErrors = {};

    if (descriptions.length === 0) {
      newErrors.descriptions = 'At least one description is required.';
      hasErrors = true;
    }

    if (!time) {
      newErrors.time = 'Time is required.';
      hasErrors = true;
    }

    if (!type) {
      newErrors.type = 'Type is required.';
      hasErrors = true;
    }

    if (!day) {
      newErrors.day = 'Day is required.';
      hasErrors = true;
    }

    if (!gender) {
      newErrors.gender = 'Gender is required.';
      hasErrors = true;
    }

    if (!duration) {
      newErrors.duration = 'Duration is required.';
      hasErrors = true;
    }

    if (!workoutPlan) {
      newErrors.workoutPlan = 'Workout plan is required.';
      hasErrors = true;
    }

    if (selectedImages.length === 0) {
      newErrors.images = 'At least one image is required.';
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    if (!userData) {
      console.error('User data not available.');
      return;
    }

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
  
    const formData = new FormData(e.target);
  
    selectedImages.forEach((image, index) => {
      formData.append('imageworkout', image);
    });
    formData.append('trainers', newWorkout.trainers);
  
    formData.append('workoutData', JSON.stringify(newWorkout));
  
    try {
      await onAdd(formData, newWorkout);
  
      setDescriptions([]);
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
  const handleCancel = () => {
    setDescriptions([]);
    setTime(0);
    setType('');
    setDay('');
    setSelectedImages([]);
    setGender('');
    setDuration('');
    setWorkoutPlan('');
    onClose();
  };


  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-2xl mb-12">Add Workout</h2>

      <form onSubmit={handleSubmit}>
        <div className="w-full">
          <label className="text-white mb-2">Descriptions:</label>
          {descriptions.map((desc, index) => (
            <div key={index} className="flex space-x-2 items-center mb-4">
              <textarea
                value={desc}
                onChange={(e) => {
                  const newDescriptions = [...descriptions];
                  newDescriptions[index] = e.target.value;
                  setDescriptions(newDescriptions);
                }}
                name="descriptionworkout"
                className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full h-[40px] text-black resize-none"
              />
              <button
                onClick={() => {
                  const newDescriptions = descriptions.filter((_, i) => i !== index);
                  setDescriptions(newDescriptions);
                }}
                className="text-yellow-500 "
                name="descriptionworkout"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setDescriptions([...descriptions, ''])}
            className="text-yellow-500 mt-2 border border-yellow-500 rounded px-3 py-1 mb-4 ml-4"
          >
            Add Description
          </button>
          {errors.descriptions && <p className="text-red-500">{errors.descriptions}</p>}
        </div>

        <div className="w-full">
          <label className="text-white ">Time / in hours:</label>
          <input
            type="number"
            value={time}
            name="Time"
            onChange={(e) => {
              setTime(Math.max(0, parseInt(e.target.value)));
              setErrors({ ...errors, time: '' });
            }}
            className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black mb-4"
          />
          {errors.time && <p className="text-red-500">{errors.time}</p>}
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <label className="text-white">Gender:</label>
            <select
              value={gender}
              name="gender"
              onChange={(e) => {
                setGender(e.target.value);
                setErrors({ ...errors, gender: '' });
              }}
              className="border-yellow-500 focus:border-yellow-500 mb-4 px-2 py-1 rounded-lg w-full text-black"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
          <div className="w-1/2 pl-4">
            <label className="text-white">Workout Plan:</label>
            <select
              value={workoutPlan}
              name="workoutplan"
              onChange={(e) => {
                setWorkoutPlan(e.target.value);
                setErrors({ ...errors, workoutPlan: '' });
              }}
              className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
            >
              <option value="">Select Workout Plan</option>
              <option value="threedaysplan">3 Days Plan</option>
              <option value="fourdaysplan">4 Days Plan</option>
              <option value="fivedaysplan">5 Days Plan</option>
              <option value="sixdaysplan">6 Days Plan</option>
            </select>
            {errors.workoutPlan && <p className="text-red-500">{errors.workoutPlan}</p>}
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <label className="text-white">Type:</label>
            <select
              value={type}
              name="type"
              onChange={(e) => {
                setType(e.target.value);
                setErrors({ ...errors, type: '' });
              }}
              className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
            >
              <option value="">Select Type</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advance">Advance</option>
            </select>
            {errors.type && <p className="text-red-500">{errors.type}</p>}
          </div>
          <div className="w-1/2 pl-4">
            <label className="text-white">Duration:</label>
            <input
              type="text"
              value={duration}
              name="Duration"
              onChange={(e) => {
                setDuration(e.target.value);
                setErrors({ ...errors, duration: '' });
              }}
              className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
            />
            {errors.duration && <p className="text-red-500">{errors.duration}</p>}
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2">
            <label className="text-white">Day:</label>
            <select
              value={day}
              onChange={(e) => {
                setDay(e.target.value);
                setErrors({ ...errors, day: '' });
              }}
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
            {errors.day && <p className="text-red-500">{errors.day}</p>}
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
                        onClick={() => {
                          handleRemoveImage(index);
                          setErrors({ ...errors, images: '' });
                        }}
                        className="text-yellow-500"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {errors.images && <p className="text-red-500">{errors.images}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          
        <button
          className="px-4 py-2 bg-red-500 mr-4 text-white rounded-lg hover:bg-red-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
          <button
            className="px-4 py-2 bg-yellow-500  text-white rounded-lg hover:bg-yellow-400"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddWorkoutModal;
