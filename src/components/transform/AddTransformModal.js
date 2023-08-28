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
    width: '70%',
    maxWidth: '500px',
    backgroundColor: '#52525b',
    border: '2px solid #52525b',
    borderRadius: '8px',
    padding: '20px',
  },
};

const AddTransformModal = ({ isOpen, onClose }) => {
  const [descriptionTransform, setDescriptionTransform] = useState('');
  const [imageBefore, setImageBefore] = useState(null);
  const [imageAfter, setImageAfter] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const handleAddTransform = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
formData.append('descriptionTransform', descriptionTransform);
formData.append('imageBefore', imageBefore);
formData.append('imageAfter', imageAfter);


    try {
      await axios.post('http://localhost:8000/transform/createtransform', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
     
      onClose();
    } catch (error) {
      console.error('Error adding transform:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeFileBefore = (e) => {
    setImageBefore(e.target.files[0]);
  };

  const onChangeFileAfter = (e) => {
    setImageAfter(e.target.files[0]);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-yellow-500 font-bold text-2xl mb-12">Add Transform</h2>
      <form onSubmit={handleAddTransform}>
      
      <div className="mb-4">
        <label className="text-white">Image Before Work:</label>
        <input
          type="file"
          accept="image/*"
          onChange={onChangeFileBefore}
          className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full border-2 focus:outline-none mb-4"
          required 
        />
        {imageBefore && (
          <div className="mt-2 flex justify-center">
            <img
              src={URL.createObjectURL(imageBefore)}
              alt="Before"
              className="rounded-full max-w-20 h-20"
            />
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="text-white ">Image After Work:</label>
        <input
          type="file"
          accept="image/*"
          onChange={onChangeFileAfter}
          className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full border-2 focus:outline-none mb-4"
          required 
        />
        {imageAfter && (
          <div className="mt-2 flex justify-center">
            <img
              src={URL.createObjectURL(imageAfter)}
              alt="After"
              className="rounded-full max-w-20 h-20"
            />
          </div>
        )}
      </div>
        <div className="mb-4">
          <label className="text-white ">Description:</label>
          <textarea
            value={descriptionTransform}
            onChange={(e) => setDescriptionTransform(e.target.value)}
            className="border-yellow-500 focus:border-yellow-500 px-2 py-1 rounded-lg w-full text-black mb-4"
            required 
          />
        </div>


        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400"
            type="submit"
            disabled={isLoading} 
          >
            {isLoading ? 'Adding...' : 'Add'}
          </button>
          <button
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={onClose}
            disabled={isLoading} 
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddTransformModal;
