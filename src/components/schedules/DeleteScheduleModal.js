import React from 'react';
import PropTypes from 'prop-types';
import '../deleteconfirmation/DeleteConfirmationModal.css';

const DeleteScheduleModal = ({ isOpen, onCancel, onDelete }) => {
  if (!isOpen) {
    return null;
  }

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className="modal">
      <div className="modal-content">
      <div className = "flex justify-between mb-14">
        <h1 className="text-yellow-500 font-bold text-xl"> Delete Confirmation : </h1>
        <button onClick={onCancel} className="text-white flex justify-end">  X  </button>
        </div>
        <p className="font-bold text-yellow-500 mb-12 text-xl">Are you sure you want to delete the schedule?</p>
        <div className="modal-actions">
          
          <button className="modal-btn modal-btn-no hover:bg-red-400" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn modal-btn-yes hover:bg-yellow-600" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteScheduleModal;
