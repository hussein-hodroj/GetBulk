import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UserDashboard from './UserDashboard.js';
import jwt_decode from 'jwt-decode';


function UserCalendar() {
  const [schedule, setSchedule] = useState([]);
  const [userId, setUserId] = useState('');
  const [booking, setBooking] = useState([]);
  const [trainerInfo, setTrainerInfo] = useState({});
  const { trainerId } = useParams(); // Get the trainerId from the URL parameter
  const [selectedSchedules, setSelectedSchedules] = useState([]);

  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/schedule/getTrainerSchedule/${trainerId}`)
      .then((response) => setSchedule(response.data))
      .catch((error) => console.log(error));

    // Fetch trainer details based on trainerId
    axios
      .get(`http://localhost:8000/user/trainers/${trainerId}`) // Use the trainerId to fetch the specific trainer
      .then((response) => setTrainerInfo(response.data))
      .catch((error) => console.log(error));
  }, [trainerId]);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;
  
  console.log("decodedToken=>",id);
   
    axios.get(`http://localhost:8000/user/${id}`) // Adjust the API endpoint
      .then((response) => {
        const userData = response.data;
        
        if (userData) {
          setUserId(userData.id); // Update user's id
       
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Collect selected schedule IDs
    const selectedSchedules = schedule.filter((event) => event.selected);
  
    if (selectedSchedules.length === 0) {
      console.log("No schedules selected.");
      return;
    }
  
    // Create booking
    const bookingData = {
      userId: userId,
      trainerId: trainerId,
      selectedSchedules: selectedSchedules.map((event) => ({
        date: event.date,
        Timeschedule: event.Timeschedule,
      })),
    };
  
    axios
      .post("http://localhost:8000/booking/createbooking", bookingData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Booking created:", response.data);
  
        // Update schedule statuses
        const updatedScheduleIds = selectedSchedules.map((event) => event.id);
  
        axios
          .put("http://localhost:8000/schedule/updateStatus", {
            scheduleIds: updatedScheduleIds,
          })
          .then((response) => {
            console.log("Schedule statuses updated:", response.data);
          })
          .catch((error) => {
            console.log("Error updating schedule statuses:", error);
          });
      })
      .catch((error) => {
        console.log("Error while submitting the form:", error);
      });
  };
  
  const handleCheckboxChange = (eventId) => {
    if (selectedSchedules.includes(eventId)) {
      setSelectedSchedules(selectedSchedules.filter((id) => id !== eventId));
    } else {
      setSelectedSchedules([...selectedSchedules, eventId]);
    }
  };

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
              <h1 className="title_home text-yellow-500">Appointment</h1>
              <div className="schedule-list ">
              <form onSubmit={handleSubmit}>
        {schedule.map((event) => (
          <div key={event.id} className="schedule-item">
            <div className="schedule flex justify-start">
              <p className="text-black text-white font-bold mr-4">
                <span className="text-yellow-500"> Date:</span>{" "}
                <span className="text-white">{event.date}</span>
              </p>
              <p className="text-black text-white font-bold">
                <span className="text-yellow-500">Time:</span>{" "}
                <span className="text-white">{event.Timeschedule}</span>
              </p>

              <input
                type="checkbox"
                className="schedule-checkbox ml-4"
                onChange={() => handleCheckboxChange(event.id)}
                checked={selectedSchedules.includes(event.id)}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end items-end">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 mt-2 mb-2 font-bold"
          >
            Submit
          </button>
        </div>
      </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCalendar;
