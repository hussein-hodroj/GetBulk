import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UserDashboard from './UserDashboard.js';


function WorkoutDescription() {
  const [trainerInfo, setTrainerInfo] = useState({});
  const { trainerId } = useParams(); 
  const [workouts, setWorkouts] = useState([]);
  const { workoutId } = useParams();
  
  useEffect(() => {
    
    axios
      .get(`http://localhost:8000/user/trainers/${trainerId}`) 
      .then((response) => setTrainerInfo(response.data))
      .catch((error) => console.log(error));
  }, [trainerId]);

useEffect(() =>{
    axios.get(`http://localhost:8000/workout/${workoutId}/getByid`)
    .then((response) => setWorkouts(response.data))
    .catch((error) => console.log(error));
}, [workoutId]);
  

  return (
    <div>
      <div className="flex justify-center items-center bg-black">
        <UserDashboard />
        <div className="h-full w-full mt-14 mb-10 bg-black ">
          <div className="p-6 gap-4">
            <div className="desc-container bg-black border border-yellow-500 shadow-yellow-500">
              <div className="trainer-info">
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
                    <span className="text-yellow-500">Email:</span> <span className="text-white">{trainerInfo.email}</span></p>
                    <p className="text-2xl font-bold mb-2">
                    <span className="text-yellow-500"> Phone Number:</span><span className="text-white">{trainerInfo.phonenumber}</span>
                    </p>
                    <p className="text-2xl font-bold mb-2">
                    <span className="text-yellow-500"> Address:</span> <span className="text-white">{trainerInfo.address}</span>
                    </p>
                  </div>
                </div>
              </div>
                    <div className="flex justify-evenly">

                        <div className="image">
{workouts.imageworkout && (
                    <img
                      src={`/uploads/usersImages/${workouts.imageworkout}`}
                    
                      style={{ width: '200px', height: '180px' }}
                      className="border border-yellow-500 rounded"
                    />
                  )}
                        </div>
                        <div className="description">
                        <p className="text-2xl font-bold mb-2">
                    <span className="text-yellow-500"> Workout: </span> <span className="text-white">{workouts.descriptionworkout}</span>
                    </p>
                        </div>
                    </div>

              </div>
              </div>
              </div>
    </div>
    </div>
  );
}

export default WorkoutDescription;
