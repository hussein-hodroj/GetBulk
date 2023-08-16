import React from 'react';
import PropTypes from 'prop-types';
import './DeleteConfirmationModal.css';

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
        <p>Are you sure you want to delete the schedule?</p>
        <div className="modal-actions">
          <button className="modal-btn modal-btn-yes" onClick={handleDeleteClick}>
            Yes
          </button>
          <button className="modal-btn modal-btn-no" onClick={onCancel}>
            No
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
