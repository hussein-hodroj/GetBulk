import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    backgroundColor: '#2c2a2a', // Updated background color
    border: '2px solid black',
    borderRadius: '8px',
    padding: '20px',
  },
};

const DeleteCategory = ({ openDelete, categoryId, onDelete }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/category/${categoryId}`)
      .then((response) => {
        console.log(response.data);
        onDelete(categoryId);
        openDelete(false);
        
      })
      .catch((error) => {
        console.log('Error while deleting category:', error);
      });
  };

  return (
    <Modal isOpen={true} onRequestClose={() => openDelete(false)} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-xl mb-8">Delete Category</h2>
      <p className="text-yellow-500 mb-8">Are you sure you want to delete this category?</p>

      <div className="flex justify-end space-x-4"> {/* Updated button positioning */}
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105"
          onClick={() => openDelete(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 hover:scale-105"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteCategory;
