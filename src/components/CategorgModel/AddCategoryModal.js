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

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryimage, setCategoryImage] = useState(null); // State for image
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!categoryName) {
        console.error('Please enter a category name.');
        return;
      }
  
      const formData = new FormData();
      formData.append('name', categoryName);
      formData.append('categoryimage', categoryimage); // Append image to FormData
  
      try {
        await axios.post('http://localhost:8000/category', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for handling FormData
          },
        });
    
        setCategoryName('');
        setCategoryImage(null); // Reset image state
        onAddCategory();
    
        onClose();
      } catch (error) {
        console.error('Error adding category:', error.response.data);
      }
    };
  
    return (
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
        <h2 className="text-yellow-500 font-bold text-xl mb-4">Add Category</h2>
  
        <form onSubmit={handleSubmit}>
          <label className="text-white mb-8">Category Name:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black my-4"
          />
  
          <label className="text-white">Category Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full my-4"
          />
  
          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 hover:scale-105"
              type="submit"
            >
              Add
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    );
  };
  
  export default AddCategoryModal;
