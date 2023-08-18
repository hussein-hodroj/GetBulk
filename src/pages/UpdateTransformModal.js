import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    backgroundColor: 'black',
    border: '2px solid black',
    borderRadius: '8px',
    padding: '20px',
  },
};

const UpdateTransformModal = ({ isOpen, onClose, onUpdate, transform }) => {
  const [updatedImageBefore, setUpdatedImageBefore] = useState(transform.imageBefore);
  const [updatedImageAfter, setUpdatedImageAfter] = useState(transform.imageAfter);
  const [updatedDescription, setUpdatedDescription] = useState(transform.descriptionTransform);

  const handleUpdate = async () => {
    try {
      const updatedTransform = {
        imageBefore: updatedImageBefore,
        imageAfter: updatedImageAfter,
        descriptionTransform: updatedDescription,
      };

     
      await axios.put(
        `http://localhost:8000/transform/${transform._id}/updateTransform`,
        updatedTransform
      );

      
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating transform:', error);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Update Transform Modal"
    >
      <h2 style={{ color: 'white' }}>Update Transform</h2>
      <label style={{ color: 'white' }}>Image Before:</label>
      <input
        type="file"
        value={updatedImageBefore}
        onChange={(e) => setUpdatedImageBefore(e.target.value)}
        className="w-full bg-white rounded p-2 mb-2"
      />
      <label style={{ color: 'white' }}>Image After:</label>
      <input
        type="file"
        value={updatedImageAfter}
        onChange={(e) => setUpdatedImageAfter(e.target.value)}
        className="w-full bg-white rounded p-2 mb-2"
      />
      <label style={{ color: 'white' }}>Description:</label>
      <textarea
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        className="w-full bg-white rounded p-2 mb-2"
      />
      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 mr-2"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default UpdateTransformModal;
