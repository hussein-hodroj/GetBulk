import React from 'react';
import axios from 'axios';

const DeleteBookingModal = ({ isOpen, onClose, bookingId, onDelete }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/bookinguser/${bookingId}`)
      .then((response) => {
        onDelete(bookingId);
        onClose();
      })
      .catch((error) => {
        console.log('Error while deleting booking:', error);
      });
  };

  return isOpen ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-zinc-800 p-7 rounded shadow-md w-96">
        <p className="text-xl text-yellow-500 font-bold mb-3">Delete Confirmation</p>
        <p className="mb-3">Are you sure you want to delete this booking?</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white font-bold px-4 py-2 mr-2 rounded-lg transition-transform transform-gpu hover:scale-110"
            onClick={() => {
              handleDelete();
              onClose(); 
            }}
          >
            Confirm
          </button>
          <button
            className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition-transform transform-gpu hover:scale-110"
            onClick={onClose} 
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteBookingModal;
