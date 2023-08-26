import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UserDashboard from './UserDashboard.js';
import jwt_decode from 'jwt-decode';
import {  FaArrowLeft, FaArrowRight  } from 'react-icons/fa/index.esm.js'; 


function UserCalendar() {
  const [schedule, setSchedule] = useState([]);
  const [userId, setUserId] = useState('');
  const [trainerInfo, setTrainerInfo] = useState({});
  const { trainerId } = useParams(); // Get the trainerId from the URL parameter
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const calendarPerPage = 1;
  
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
          setUserId(id); // Update user's id
       
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Collect selected schedule IDs

  
    // if (selectedSchedules.length> 0) {
    //   console.log("No schedules selected.");
    //   return;
    // }
  
    // Create booking
    const bookingData = {
      selectedSchedules: selectedSchedules.map((event) => ({
        userId: userId, // Assuming userId is accessible in this scope
        trainerId: trainerId,
        date: event.date,
        time: event.time,
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
        const events = {
          selectedSchedules: selectedSchedules.map((event) => ({
           id:event.eventId
          })),
        };
  
        axios
          .put("http://localhost:8000/schedule/updateStatus", 
            events,{ headers: {
              "Content-Type": "application/json",
            },}
          )
          .then((response) => {
            console.log("Schedule statuses updated:", response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.log("Error updating schedule statuses:", error);
          });
      })
      .catch((error) => {
        console.log("Error while submitting the form:", error);
      });
  };
  
  const handleCheckboxChange = (time,date,eventId) => {
    let updatedSchedule = selectedSchedules; // Create a copy of the selectedSchedules array

  const existingSlotIndex = updatedSchedule.findIndex(
    (slot) => slot.time === time && slot.date === date
  );

  if (existingSlotIndex !== -1) {
    // If the slot exists in the array, remove it
    updatedSchedule.splice(existingSlotIndex, 1);
  } else {
    // If the slot doesn't exist, add it
    updatedSchedule.push({ eventId:eventId,trainer: trainerId,userId:userId, time: time, date: date });
  }

  setSelectedSchedules(updatedSchedule);
    console.log(selectedSchedules)
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(schedule.length / calendarPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastSchedule = currentPage * calendarPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - calendarPerPage;
  const currentSchedules = schedule.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );
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
                
              <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full">
                  <thead>
                    <tr>
                       <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider Border-white border">

                  #</th>
                                             <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider Border-white border">
Date</th>
                                             <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider Border-white border">
Time</th>
                                             <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider Border-white border">
Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSchedules.map((event, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                                                   <td className="px-6 py-4 whitespace-nowrap border Border-white">
                                                   {(currentPage - 1) * calendarPerPage + index + 1}
</td>
                                                                           <td className="px-6 py-4 whitespace-nowrap border Border-white">
{event.date}</td>
                                                                           <td className="px-6 py-4 whitespace-nowrap border Border-white">
{event.Timeschedule}</td>
                                                                           <td className="px-6 py-4 whitespace-nowrap border Border-white">

                          <input
                            type="checkbox"
                            className="schedule-checkbox"
                            onChange={() => handleCheckboxChange(event.Timeschedule, event.date, event._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
        <div className="flex justify-between">
           <div className="justify-start items-start">
          <Link to={`/workoutselection/${trainerId}`}>
          <button
            type="button"
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 mt-2 mb-2 font-bold"
          >
            Back
          </button>
          </Link>
        </div>
        <div className='flex justify-center mt-4'>
              <div className='flex items-center ml-auto'>
              <button
  className='px-4 py-2 bg-yellow-500 text-white rounded-l-lg hover:bg-yellow-600'
  onClick={(e) => {
    e.preventDefault();
    handlePreviousPage();
  }}
>
  <FaArrowLeft />
</button>
<p className='text-md text-yellow-500 ml-4 mr-4'>
  Page {currentPage} of {Math.ceil(schedule.length / calendarPerPage)}
</p>
<button
  className='px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600'
  onClick={(e) => {
    e.preventDefault();
    handleNextPage();
  }}
>
  <FaArrowRight />
</button>
              </div>
            </div>
        <div className="justify-end items-end">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 mt-2 mb-2 font-bold"
          >
            Submit
          </button>
        </div>
       
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
