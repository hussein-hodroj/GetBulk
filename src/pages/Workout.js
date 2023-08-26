import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa/index.esm.js';
import Dashboard from './TrainerDashboard.js';
import './style.css';
import AddWorkoutModal from '../components/adminworkout/AddWorkoutModal.js';
import UpdateWorkoutModal from '../components/adminworkout/UpdateWorkoutModal.js';
import DeleteConfirmationModal from '../components/deleteconfirmation/DeleteConfirmationModal.js';
import ExerciseModal from '../components/adminworkout/ExerciseModal.js';

function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const workoutsPerPage = 10;
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
      fetchWorkouts(userId);
    }
  }, []);

  const fetchWorkouts = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/workout/getwork`);
      const userWorkouts = response.data.filter(workout => workout.trainers.includes(userId));
      setWorkouts(userWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };

  const handleAddWorkout = async (newWorkout) => {
    try {
      await axios.post('http://localhost:8000/workout/addworkout', newWorkout);
      fetchWorkouts();
      setAddModalIsOpen(false);
    } catch (error) {
      console.error('Error adding workout:', error.response.data);
    }
  };

  const handleUpdateWorkout = async (updatedWorkout) => {
    try {
      await axios.put(
        `http://localhost:8000/workout/${selectedWorkout._id}/update`,
        updatedWorkout
      );
      fetchWorkouts(); 
      setUpdateModalIsOpen(false);
    } catch (error) {
      console.error('Error updating workout:', error.response.data);
    }
  };
  

  const handleDeleteWorkout = async () => {
    if (!selectedWorkout) {
      console.error('No workout selected for deletion.');
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8000/workout/${selectedWorkout._id}/delete`);
      fetchWorkouts();
      setDeleteModalIsOpen(false);
      setSelectedWorkout(null); 
    } catch (error) {
      console.error('Error deleting workout:', error.response.data);
    }
  };
  const handleDeleteClick = (workout) => {
    setSelectedWorkout(workout);
    setDeleteModalIsOpen(true);
  };

  
const [exerciseModalIsOpen, setExerciseModalIsOpen] = useState(false);
const [selectedExercise, setSelectedExercise] = useState(null);

const handleShowExercises = (exercise) => {
  setSelectedExercise(exercise);
  setExerciseModalIsOpen(true);
};

  
const handlePreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

const handleNextPage = () => {
  const totalPages = Math.ceil(filteredWorkouts.length / workoutsPerPage);
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
};

const indexOfLastWorkout = currentPage * workoutsPerPage;
const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;


const filteredWorkouts = workouts.filter((workout) => {
  const searchString =
  (workout.type ? workout.type.toLowerCase() : '') +
  (workout.Day ? workout.Day.toLowerCase() : '') +
  (workout.gender ? workout.gender.toLowerCase() : '') +
  (workout.Duration ? workout.Duration.toLowerCase() : '') +
  (workout.workoutplan ? workout.workoutplan.toLowerCase() : '');


  return searchString.includes(searchInput.toLowerCase());
});

const currentWorkouts = filteredWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

const handleSearchInputChange = (event) => {
  setSearchInput(event.target.value);
};
  

  return (
    <div className='flex'>
      <Dashboard />
      
      <div className="h-full w-full ml-56 mt-14 mb-10 ">
        <div className="p-6 gap-4">

          <div className="flex justify-between items-center mb-4">

          <div className="flex items-center rounded-md bg-gray-100 p-2">
          <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-gray-500"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <FaSearch className="ml-2 text-gray-500" />
            </div>
         
          <button
            className="flex justify-between items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-black ml-auto"
            onClick={() => setAddModalIsOpen(true)}
          >
            <FaPlus /> Add Workout
          </button>
            
          </div>
          <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full"  style={{ backgroundColor: "#555555" , color: "whitesmoke" }}>
            <thead>
            <tr>
                 <th>#</th>
                <th>Time in hour</th>
                <th>Type</th>
                <th>Day</th>
                <th>Gender</th>
                <th>Duration</th>
                <th>Workout Plan</th>
                <th >Exercises</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentWorkouts.map((workout, index) => (
    <tr key={workout._id} className={workouts.indexOf(workout) % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
<td className="py-2 px-4">{index + 1}</td>
      <td className="py-2 px-4">{workout.Time}</td>
      
      <td>{workout.type}</td>
      <td>{workout.Day}</td>
      <td>{workout.gender}</td>
      <td>{workout.Duration}</td>
      <td>{workout.workoutplan}</td>
      <td>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 my-2 hover:bg-yellow-600"
          onClick={() => handleShowExercises(workout)}
        >
          Exercises
        </button>
      </td>
      <td className="px-4 py-2">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600"
          onClick={() => {
            setSelectedWorkout(workout);
            setUpdateModalIsOpen(true);
          }}
        >
          <FaEdit />
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => handleDeleteClick(workout)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
          <div className="flex justify-center mt-4">
          <div className="flex items-center ml-auto">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-l-lg hover:bg-yellow-600"
                onClick={handlePreviousPage}
              >
                <FaArrowLeft />
              </button>
              <p className="text-md text-yellow-500 ml-4 mr-4">
                Page {currentPage} of {Math.ceil(filteredWorkouts.length / workoutsPerPage)}
              </p>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600"
                onClick={handleNextPage}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
          
          
        </div>
      </div>
      <AddWorkoutModal
        isOpen={addModalIsOpen}
        onClose={() => {
          setAddModalIsOpen(false);
        }}
        onAdd={handleAddWorkout}
      />
          <UpdateWorkoutModal
        isOpen={updateModalIsOpen}
        onClose={() => setUpdateModalIsOpen(false)}
        handleUpdateWorkout={handleUpdateWorkout}
        selectedWorkout={selectedWorkout}
        updateWorkoutsList={fetchWorkouts} 
      />
      <DeleteConfirmationModal
              isOpen={deleteModalIsOpen}
              onCancel={() => setDeleteModalIsOpen(false)}
              onConfirm={handleDeleteWorkout}
       />
              
              <ExerciseModal
              isOpen={exerciseModalIsOpen}
              onClose={() => setExerciseModalIsOpen(false)}
              exercise={selectedExercise}
            />
    </div>
    
  );
}

export default Workout;
