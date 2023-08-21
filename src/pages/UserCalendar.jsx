import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserDashboard from './UserDashboard.js';

function UserCalendar() {
  const [schedule, setSchedule] = useState([]);
  const [trainerInfo, setTrainerInfo] = useState({});
  const { trainerId } = useParams(); // Get the trainerId from the URL parameter

  useEffect(() => {
    axios
      .get(`http://localhost:8000/schedule/getTrainerSchedule/${trainerId}`)
      .then((response) => setSchedule(response.data))
      .catch((error) => console.log(error));

    // Fetch trainer details based on trainerId
    axios
      .get(`http://localhost:8000/trainers`)
      .then((response) => setTrainerInfo(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="flex">
        <UserDashboard />
        <div className="h-full w-full ml-56 mt-14 mb-10">
          <div className="p-6 gap-4">
            <div className="desc-container">
              <div className="trainer-info">
                <h1 className="text-2xl font-bold mb-2">
                  {trainerInfo.fullname}
                </h1>
                {trainerInfo.imagePath && (
                  <img src={`/uploads/usersImages/${trainerInfo.imagePath}`} alt="Trainer"
                  style={{ width: '300px', height: '380px'}}

                   />
                )}
                <p className="text-gray-600">
                  Email: {trainerInfo.email}
                </p>
                <p className="text-gray-600">
                  Phone Number: {trainerInfo.phoneNumber}
                </p>
                <p className="text-gray-600">
                  Address: {trainerInfo.address}
                </p>
              </div>
              <h1 className="title_home">Appointment</h1>
              <div className="schedule-list">
                {schedule.map(event => (
                  <div key={event.id} className="schedule-item">
                    <label className="schedule-label">
                      <input
                        type="checkbox"
                        className="schedule-checkbox flex items-center justify-center"
                      />
                      <div className="event-details">
                      
                        <p className="text-black font-bold flex justify-center">
                          Date: {event.date}
                        </p>
                        <p className="text-black font-bold flex justify-center">
                          Time: {event.Timeschedule}
                        </p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCalendar;
