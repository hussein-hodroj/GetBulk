import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

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

const UpdateWorkoutModal = ({ isOpen, onClose, handleUpdateWorkout, selectedWorkout, updateWorkoutsList }) => {
  const [descriptions, setDescriptions] = useState([]);
  const [time, setTime] = useState(0);
  const [type, setType] = useState('');
  const [day, setDay] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [gender, setGender] = useState('');
  const [duration, setDuration] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState('');

  useEffect(() => {
    if (selectedWorkout && selectedWorkout.imageworkout) {
      setDescriptions(selectedWorkout.descriptionworkout);
      setTime(selectedWorkout.Time);
      setType(selectedWorkout.type);
      setDay(selectedWorkout.Day);
      setGender(selectedWorkout.gender);
      setDuration(selectedWorkout.Duration);
      setWorkoutPlan(selectedWorkout.workoutplan);
  
      const imageUrls = selectedWorkout.imageworkout.map((imgName) => ({
        name: imgName,
        url: `/uploads/usersImages/${imgName}`,
      }));
  
      setSelectedImages(imageUrls);
    }
  }, [selectedWorkout]);
  

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const removedImage = selectedImages[index];
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    URL.revokeObjectURL(removedImage.url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedWorkout) {
      return;
    }

    const formData = new FormData();
    selectedImages.forEach(image => {
      formData.append('images', image.file);
    });

    const updatedWorkout = {
      descriptionworkout: descriptions,
      Time: time,
      type,
      Day: day,
      imageworkout: selectedImages.map(img => img.name),
      gender,
      Duration: duration,
      workoutplan: workoutPlan,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/workout/${selectedWorkout._id}/update`,
        updatedWorkout
      );

      handleUpdateWorkout(response.data);
      updateWorkoutsList();
      onClose();
    } catch (error) {
      console.error('Error updating workout:', error.response.data);
    } finally {
      selectedImages.forEach((img) => URL.revokeObjectURL(img.url));
    }
  };

  const handleAddDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  const handleRemoveDescription = (index) => {
    const newDescriptions = [...descriptions];
    newDescriptions.splice(index, 1);
    setDescriptions(newDescriptions);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
    <h2 className="text-yellow-500 font-bold text-xl mt-4 mb-4">Update Workout</h2>
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between mb-4">
      <div className="w-full">
            <label className="text-white mb-1 mr-4">Descriptions:</label>
            {descriptions.map((desc, index) => (
              <div key={index} className="flex space-x-2 items-center mb-2">
                <textarea
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full h-[50px] text-black resize-none"
                />
                <button
                  onClick={() => handleRemoveDescription(index)}
                  className="text-yellow-500"
                >
                  Remove
                </button>
              </div>
            ))}
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
          <label className="text-white mb-1">Time / in hour :</label>
          <input
            type="number"
            value={time}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setTime(isNaN(value) || value < 0 ? 0 : value);
            }}
            className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
          />
        </div>
      <div className="flex justify-between mb-4">
        <div className="w-1/2">
          <label className="text-white mb-1">Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="w-1/2 pl-4">
          <label className="text-white mb-1">Workout Plan:</label>
          <select
            value={workoutPlan}
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
          <label className="text-white mb-1">Type:</label>
          <select
            value={type}
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
             <label className="text-white">Images:</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full border-2 focus:outline-none"
                multiple
              />
              {selectedImages.length > 0 && (
                <div className="mt-4" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <label className="text-white">Selected Images:</label>
                  {selectedImages.map((img, index) => (
                    <div key={index} className="flex items-center mt-2">
                      <img
                        src={img.url}
                        alt={`Selected Image ${index + 1}`}
                        className="h-10 w-10 rounded-full"
                      />
                      <button onClick={() => handleRemoveImage(index)} className="text-yellow-500 ml-2">
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
          Update
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

export default UpdateWorkoutModal;
