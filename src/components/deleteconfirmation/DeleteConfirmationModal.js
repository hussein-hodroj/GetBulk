import React from 'react';
import PropTypes from 'prop-types';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = () => {
    onConfirm();
  };

  return (
    <div className="modal">
      <div className="modal-content">
      <div className = "flex justify-between mb-14">
        <h1 className="text-yellow-500 font-bold "> Delete Confirmation : </h1>
        <button onClick={onCancel} className="text-white flex justify-end">  X  </button>
        </div>
        <p className="font-bold text-yellow-500 mb-12">Are you sure you want to delete the workout?</p>
        <div className="modal-actions">
          
          <button className="modal-btn modal-btn-no hover:bg-red-400" onClick={onCancel}>Cancel</button>
          <button className="modal-btn modal-btn-yes hover:bg-yellow-600" onClick={handleConfirmClick}>Delete</button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;

