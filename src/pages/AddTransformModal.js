import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root');

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

const AddTransformModal = ({ isOpen, onAdd, onClose, fetchAllTransforms, setIsModalOpen  }) => {
  const [descriptionTransform, setDescriptionTransform] = useState('');
  const [imageBeforeWork, setImageBeforeWork] = useState(null);
  const [imageAfterWork, setImageAfterWork] = useState(null);

  const handleAddTransform = async () => {
    const formData = new FormData();
    formData.append('descriptionTransform', descriptionTransform);
    formData.append('imageBeforeWork', imageBeforeWork);
    formData.append('imageAfterWork', imageAfterWork);
  
    try {
      await axios.post('http://localhost:8000/transform/createtransform', formData);
      fetchAllTransforms();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding transform:', error);
    }
  };
  
  
  

  const onChangeFile=e=>{
    setImageBeforeWork(e.target.files[0])
  }
  
  const onChangeFileAfter=e=>{
    setImageAfterWork(e.target.files[0])
  }
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-xl mb-4">Add Transform</h2>
      <form onSubmit={handleAddTransform}>
        <div className="mb-4">
          <label className="text-white">Description:</label>
          <textarea
            value={descriptionTransform}
            onChange={(e) => setDescriptionTransform(e.target.value)}
            className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full"
          />
        </div>

        <div className="mb-4">
  <label className="text-white">Image Before Work:</label>
  <input
  type="file"
  accept="image/*"
  onChange={onChangeFile}
  name="imageBeforeWork" // Ensure this matches the field name in the middleware
  className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full border-2 focus:outline-none"
/>
  {imageBeforeWork && (
    <p className="mt-2">{imageBeforeWork.name}</p>
  )}
</div>

<div className="mb-4">
  <label className="text-white">Image After Work:</label>
  <input
  type="file"
  accept="image/*"
  onChange={onChangeFileAfter}
  name="imageAfterWork" // Ensure this matches the field name in the middleware
  className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full border-2 focus:outline-none"
/>
  {imageAfterWork && (
    <p className="mt-2">{imageAfterWork.name}</p>
  )}
</div>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400"
            type="submit"
          >
            Add
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTransformModal;
