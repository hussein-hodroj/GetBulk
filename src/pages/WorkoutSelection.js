import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './UserDashboard.js';
import { useLocation, Link, useParams } from 'react-router-dom'; // Import useHistory
import { FaArrowLeft, FaArrowRight} from 'react-icons/fa/index.esm.js';


const selectBoxStyle = {
  width: '200px',
};


const WorkoutSelection = () => {
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [workoutPlan, setWorkoutPlan] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const trainerId = searchParams.get('trainerId');
  const { trainerId } = useParams();
  const [trainerInfo, setTrainerInfo] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, filteredWorkouts.length);
  const displayedWorkouts = filteredWorkouts.slice(startIndex, endIndex);
  // const [isScheduling, setIsScheduling] = useState(true); // Track scheduling state
  // const buttonText = isScheduling ? 'Schedule' : 'Workout'; // Button text based on state

  
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
  useEffect(() => {
    // Fetch trainer details based on trainerId
    axios
      .get(`http://localhost:8000/user/trainers/${trainerId}`) // Use the trainerId to fetch the specific trainer
      .then((response) => setTrainerInfo(response.data))
      .catch((error) => console.log(error));
  }, [trainerId]);
  // const handleButtonClick = () => {
  //   if (isScheduling) {
  //     return `/UserCalendar/${selectedTrainerId}`;
  //   } else {
  //     return `/workoutselection/${selectedTrainerId}`;
  //   }
  // };

  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredWorkouts.length / rowsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  

  const indexOfLastWorkout = currentPage * rowsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - rowsPerPage;
  const currentDisplayedWorkouts = filteredWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  return (
    <div className='flex justify-center items-center bg-black'>
    <Dashboard />
    <div className='block w-full'>
    <div className="trainer-info mt-20 bg-black">
      <div className="flex justify-evenly items-center">
        {trainerInfo.imagePath && (
          <img
            src={`/uploads/usersImages/${trainerInfo.imagePath}`}
            alt="Trainer"
            style={{ width: '460px', height: '380px' }}
            className="border border-yellow-500 rounded"
          />
        )}
        <div className="info-container ml-4">
          <p className="text-2xl font-bold mb-2">
            <span className="text-yellow-500">Name:</span> <span className="text-white">{trainerInfo.fullname}</span>
          </p>
          <p className="text-2xl font-bold mb-2">
            <span className="text-yellow-500">Email:</span> <span className="text-white">{trainerInfo.email}</span>
          </p>
          <p className="text-2xl font-bold mb-2">
            <span className="text-yellow-500">Phone Number:</span> <span className="text-white">{trainerInfo.phonenumber}</span>
          </p>
          <p className="text-2xl font-bold mb-2">
            <span className="text-yellow-500">Address:</span> <span className="text-white">{trainerInfo.address}</span>
          </p>
        </div>
      </div>
    </div>
      <div className="workout-selection-modal mr-4 ml-16 h-full items-center justify-center mt-20 text-white bg-black">
        <h2 className="text-white-500 font-bold text-2xl mb-8">Select Workout</h2>
        <div className="flex justify-between">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border-2 border-yellow-500 bg-black text-white p-2 my-2"
          style={selectBoxStyle}
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
          style={selectBoxStyle}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          value={workoutPlan}
          onChange={(e) => setWorkoutPlan(e.target.value)}
          className="border-2 border-yellow-500 bg-black text-white p-2 my-2"
          style={selectBoxStyle}
        >
          <option value="">Select Workout Plan</option>
          <option value="threedaysplan">3 Days Plan</option>
          <option value="fourdaysplan">4 Days Plan</option>
          <option value="fivedaysplan">5 Days Plan</option>
          <option value="sixdaysplan">6 Days Plan</option>
        </select> 
        
            <Link to={`/UserCalendar/${trainerId}`} >
            <button
              type="button"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg mr-12 hover:bg-yellow-500 mt-2 mb-2 font-bold"
            >
              Schedule
            </button>
          </Link>

          <Link to={`/bookinguser/${trainerId}`} >
            <button
              type="button"
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg mr-12 hover:bg-yellow-500 mt-2 mb-2 font-bold"
            >
              Booking
            </button>
          </Link>
       

        </div>
          <div className="filtered-workouts mt-6 mr-12">
          <h2 className="text-yellow-500 font-bold text-2xl mb-8">Filtered Workouts</h2>
          <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full"  style={{ backgroundColor: "#555555" , color: "whitesmoke" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Gender</th>
              <th>Workout Plan</th>
              <th>Day</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {displayedWorkouts.map((workout, index) => (
              <tr key={workout._id} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                <td className="py-2 px-4">{startIndex + index + 1}</td>
                <td>{workout.type}</td>
                <td>{workout.gender}</td>
                <td>{workout.workoutplan}</td>
                <td>{workout.Day}</td>
                <td>{workout.Time}</td>
                <td>
                  <Link to={`/WorkoutDescription/${trainerId}/${workout._id}`}>
                    <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg mr-2 hover:bg-yellow-500 mt-2 mb-2">
                      Workout
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

          
          <div className="pagination flex items-center justify-between mt-4">
            <div className="justify-start flex-start">
              <Link to={`/UserWorkout`}>
                <button
                  type="button"
                  className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 mt-2 mb-2 font-bold"
                >
                  Back
                </button>
              </Link>
            </div>
            <div className="flex items-center ml-auto">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || displayedWorkouts.length === 0}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-500"
            >
              <FaArrowLeft />
            </button>
            <p className="text-md text-yellow-500 ml-4 mr-4">
              Page {currentPage} of {Math.ceil(filteredWorkouts.length / rowsPerPage)}
            </p>
            <button
              onClick={handleNextPage}
              disabled={endIndex >= filteredWorkouts.length}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg ml-2 hover:bg-yellow-500"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSelection;
