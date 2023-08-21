import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './UserDashboard.js';

const WorkoutSelection = () => {
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const trainerId = searchParams.get('trainerId');

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedWorkouts = filteredWorkouts.slice(startIndex, endIndex);

  useEffect(() => {
    setSelectedTrainerId(trainerId);
  }, [trainerId]);

  useEffect(() => {
    fetchWorkouts();
  }, [type, gender, workoutPlan, selectedTrainerId]);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/workout/getwork');
      setFilteredWorkouts(response.data.filter(workout => {
        const matchesTrainer = selectedTrainerId ? workout.trainers === selectedTrainerId : true;
        const matchesType = type ? workout.type === type : true;
        const matchesGender = gender ? workout.gender === gender : true;
        const matchesWorkoutPlan = workoutPlan ? workout.workoutplan === workoutPlan : true;

        return matchesTrainer && matchesType && matchesGender && matchesWorkoutPlan;
      }));
    } catch (error) {
      console.error('Error fetching workouts:', error);
    }
  };


  return (
    <div className='flex bg-black'>
      <Dashboard />
      <div className="workout-selection-modal items-center justify-center ml-80 mt-20 text-white w-full ">
        <h2 className="text-yellow-500">Select Workout</h2>
        
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border-2 border-yellow-500 bg-black text-white p-2 my-2"
        >
          <option value="">Select Type</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advance">Advance</option>
        </select>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border-2 border-yellow-500 bg-black text-white p-2 my-2"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          value={workoutPlan}
          onChange={(e) => setWorkoutPlan(e.target.value)}
          className="border-2 border-yellow-500 bg-black text-white p-2 my-2"
        >
          <option value="">Select Workout Plan</option>
          <option value="threedaysplan">3 Days Plan</option>
          <option value="fourdaysplan">4 Days Plan</option>
          <option value="fivedaysplan">5 Days Plan</option>
          <option value="sixdaysplan">6 Days Plan</option>
        </select>
        <div className="filtered-workouts mt-10 mr-10">
          <h2 className="text-yellow-500 mb-4">Filtered Workouts</h2>
          <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full"  style={{ backgroundColor: "#555555" , color: "whitesmoke" }}>
            <thead>
              <tr>
                <th>Type</th>
                <th>Gender</th>
                <th>Workout Plan</th>
                <th> Day </th>
                <th> Time </th>
                <th> Description </th>
              </tr>
            </thead>
            <tbody>
            {displayedWorkouts.map(workout => (

                <tr key={workout._id}>
                  <td>{workout.type}</td>
                  <td>{workout.gender}</td>
                  <td>{workout.workoutplan}</td>
                  <td>{workout.Day}</td>
                  <td>{workout.Time}</td>
                  <td>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600 mt-2 mb-2">
          Show Description
        </button>
       
      </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination flex items-center justify-center mt-4">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1 || filteredWorkouts.length === 0}

    className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600"
    style={{ marginRight: '100px' }}
  >
    Previous
  </button>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={endIndex >= filteredWorkouts.length}

    className="bg-yellow-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-yellow-600"
    style={{ marginLeft: '100px' }}
  >
    Next
  </button>
</div>

        </div>
      </div>
    </div>
  );
};

export default WorkoutSelection;
