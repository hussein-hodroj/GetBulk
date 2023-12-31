import React, { useState, useEffect } from 'react';

import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '550px',
    backgroundColor: 'rgb(44, 42, 42)',
    border: '2px solid rgb(44, 42, 42)',
    borderRadius: '8px',
    padding: '20px',
  },
};

const UpdateTransformModal = ({ isOpen, onClose, onUpdate, transform, fetchAllTransforms }) => {
  const [updatedImageBefore, setUpdatedImageBefore] = useState(transform.imageBefore);
  const [updatedImageAfter, setUpdatedImageAfter] = useState(transform.imageAfter);
  const [updatedDescription, setUpdatedDescription] = useState(transform.descriptionTransform);

  
  useEffect(() => {
    if (isOpen) {
      setUpdatedImageBefore(transform.imageBefore);
      setUpdatedImageAfter(transform.imageAfter);
      setUpdatedDescription(transform.descriptionTransform);
    }
  }, [isOpen, transform]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('imageBefore', updatedImageBefore);
      formData.append('imageAfter', updatedImageAfter);
      formData.append('descriptionTransform', updatedDescription);

      await axios.put(
        `http://localhost:8000/transform/${transform._id}/updateTransform`,
        formData
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
      <h2 className="text-yellow-500 font-bold text-2xl mb-12">Update Transform</h2>
      <label style={{ color: 'white' }}>Image Before:</label>
<input
  type="file"
  onChange={(e) => setUpdatedImageBefore(e.target.files[0])}
  className="w-full bg-white rounded p-2 mb-8  text-black"
/>
<label style={{ color: 'white' }}>Image After:</label>
<input
  type="file"
  onChange={(e) => setUpdatedImageAfter(e.target.files[0])}
  className="w-full bg-white rounded p-2 mb-2 mb-8 text-black"
/>
      <label style={{ color: 'white' }}>Description:</label>
      <textarea
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        className="w-full bg-white rounded p-2 mb-8 text-black"
      />
      <div className="flex justify-end">
        
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 "
        >
          Update
        </button>
      </div>
    </Modal>
  );
};

export default UpdateTransformModal;
