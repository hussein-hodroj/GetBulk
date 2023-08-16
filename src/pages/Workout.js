import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa/index.esm.js';
import Dashboard from './TrainerDashboard.js';
import './style.css';
import AddWorkoutModal from './AddWorkoutModal.js';
import UpdateWorkoutModal from './UpdateWorkoutModal.js';
import DeleteConfirmationModal from './DeleteConfirmationModal.js';
import ExerciseModal from './ExerciseModal.js';

function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/workout/getwork');
      setWorkouts(response.data);
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

  

  

  return (
    <div className='flex'>
      <Dashboard />
      
      <div className="h-full w-full ml-56 mt-14 mb-10 ">
        <div className="p-6 gap-4">

          <div className="flex justify-between items-center mb-4">
         
          <button
            className="flex justify-between items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-black ml-auto"
            onClick={() => setAddModalIsOpen(true)}
          >
            <FaPlus /> Add Workout
          </button>
            
          </div>
          <table className="table flex items-center justify-center font-bold bg-zinc-800 text-white text-center w-full mt-4 mb-4">
            <thead>
            <tr>
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
  {workouts.map(workout => (
    <tr key={workout._id}>
      <td className="py-2 px-4">{workout.Time}</td>
      <td>{workout.type}</td>
      <td>{workout.Day}</td>
      <td>{workout.gender}</td>
      <td>{workout.Duration}</td>
      <td>{workout.workoutplan}</td>
      <td>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600"
          onClick={() => handleShowExercises(workout)}
        >
          Show Exercises
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
