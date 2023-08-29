import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

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

const UpdateCategory = ({ open, categoryId, onUpdate }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null); // State for image
  const navigate = useNavigate(); 
  useEffect(() => {
    axios
      .get(`http://localhost:8000/category/${categoryId}`)
      .then((response) => {
        setName(response.data.name);
      })
      .catch((error) => console.log(error));
  }, [categoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('categoryimage', image); // Append image to FormData

    axios
    .put(`http://localhost:8000/category/${categoryId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for handling FormData
      },
    })
    .then((response) => {
      console.log(response.data);
      onUpdate();
      navigate('/category');
    })
    .catch((error) => {
      console.log('Error while submitting the form:', error);
    });
};
  return (
    <Modal isOpen={true} onRequestClose={() => open(false)} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-xl mb-4">Edit Category</h2>

      <form onSubmit={handleSubmit}>
        <label className="text-white mb-4">Category Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black my-4"
        />

        <label className="text-white mb-4">Category Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full my-4"
        />

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 hover:scale-105"
            type="submit"
          >
            Save
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105"
            onClick={() => open(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateCategory;