import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Dashboard from './UserDashboard.js';
import { useParams, Link } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa/index.esm.js';
import DeleteBookingModal from '../components/BookingUserModal/DeleteBookingModal.js';

const BookingUser = () => {
  const [bookings, setBookings] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const { trainerId } = useParams();
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleDeleteBooking = (deletedBookingId) => {
    setBookings(bookings.filter(booking => booking._id !== deletedBookingId));
    setDeleteMessage('Booking deleted successfully.');

    setTimeout(() => {
      setDeleteMessage('');
    }, 3000);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(bookings.length / itemsPerPage);

  return (
    <div className='flex flex-col bg-black h-screen'>
      <Dashboard />
      <div className='flex-grow flex justify-center items-center'>
        <div className='bg-black p-4 mt-4 rounded w-3/4'>
          {deleteMessage && (
            <p className="text-green-500 mt-2 text-center mb-2">{deleteMessage}</p>
          )}

          <table className='min-w-full divide-y border border-black'>
            <thead className="bg-zinc-600">
              <tr className="bg-zinc-600 mt-9">
                <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider Border-white border">#</th>
                <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider Border-white border">Date</th>
                <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider Border-white border">Time Schedule</th>
                <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider Border-white border">Action</th>
              </tr>
            </thead>
            <tbody className="text-white font-semibold">
              {bookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((booking, index) => (
                <tr key={booking._id} className={index % 2 === 0 ? 'bg-zinc-500' : 'bg-zinc-600'}>
                  <td className="px-6 py-4 text-center whitespace-nowrap border Border-white">{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap border Border-white">{booking.date}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap border Border-white">{booking.Timeschedule}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap border Border-white">
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded hover:scale-105'
                      onClick={() => {
                        setSelectedBookingId(booking._id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-center mt-4">
            <button
              className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2 hover:scale-105"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaArrowLeft className="mr-1" />
            </button>
            <span className="text-yellow-500 font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-yellow-500 text-white px-4 py-1 rounded-lg ml-2 hover:scale-105"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <FaArrowRight className="ml-1 " />
            </button>
          </div>
        </div>
      </div>

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

      <DeleteBookingModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        bookingId={selectedBookingId}
        onDelete={handleDeleteBooking}
      />
    </div>
  );
};

export default BookingUser;
