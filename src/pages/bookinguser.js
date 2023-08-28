import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Dashboard from './UserDashboard.js';
import { useParams, Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa/index.esm.js';

const BookingUser = () => {
  const [bookings, setBookings] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const { trainerId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.id;

    axios.get(`http://localhost:8000/bookinguser/${userId}/${trainerId}`)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, [trainerId]);

  const handleDeleteBooking = (bookingId) => {
    axios.delete(`http://localhost:8000/bookinguser/${bookingId}`)
      .then(response => {
        setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId));
        setDeleteMessage('Booking deleted successfully.');

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setDeleteMessage('');
        }, 3000); // 3000 milliseconds = 3 seconds
      })
      .catch(error => {
        console.error('Error deleting booking:', error);
      });
  };

  return (
    <div className='flex flex-col bg-black h-screen'>
      {/* Dashboard */}
      <Dashboard />

      {/* Centered Content */}
      <div className='flex-grow flex justify-center items-center'>
        {/* Table */}
        <div className='bg-black p-4 mt-4 rounded w-3/4'>
           {/* Delete message */}
      {deleteMessage && (
        <p className="text-green-500 mt-2 text-center mb-2">{deleteMessage}</p>
      )}
          <table className='table font-bold bg-zinc-800 text-center w-full' style={{ backgroundColor: "#555555", color: "whitesmoke" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Time Schedule</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td>{booking.date}</td>
                  <td>{booking.Timeschedule}</td>
                  <td>
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded hover:scale-105'
                      onClick={() => handleDeleteBooking(booking._id)}
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     

      {/* Back button */}
      <div className="absolute bottom-0 left-0 ml-4 mb-4">
        <Link to={`/workoutselection/${trainerId}`}>
          <button
            type="button"
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 font-bold"
          >
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BookingUser;
