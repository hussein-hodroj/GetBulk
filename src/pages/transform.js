import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa/index.esm.js';
import Dashboard from './dashboard.js';
import './TransformPage.css';
import AddTransformModal from './AddTransformModal.js';
import UpdateTransformModal from './UpdateTransformModal.js';
import DeleteConfirmationModal from './DeleteConfirmationModal.js';

function TransformPage() {
  const [transforms, setTransforms] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTransform, setSelectedTransform] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransformForDeletion, setSelectedTransformForDeletion] = useState(null);

  const fetchAllTransforms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/transform/transforms');
      setTransforms(response.data);
    } catch (error) {
      console.error('Error fetching transforms:', error);
    }
  };

  useEffect(() => {
    fetchAllTransforms();
  }, []);

  const handleUpdateTransform = () => {
    fetchAllTransforms();
    setIsUpdateModalOpen(false);
  };

  const handleDeleteTransform = async () => {
    try {
      await axios.delete(`http://localhost:8000/transform/${selectedTransformForDeletion._id}/deletetransform`);
      fetchAllTransforms();
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting transform:', error);
    }
  };

  const handleAddTransform = async () => {
    try {
      await axios.post('http://localhost:8000/transform/createtransform');
      fetchAllTransforms(); 
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding transform:', error);
    }
  };

  return (
    <div className='flex'>
      <Dashboard />
      <div className="h-full w-full ml-56 mt-14 mb-10">
        <div className="p-6 gap-4">
          <div className="flex justify-between items-center mb-4">
          <button
              className="flex justify-between items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-black ml-auto"
              onClick={() => setIsModalOpen(true)}  
            >
              <FaPlus /> Add Transform
            </button>
          </div>
          <div className="transform-page">
            <div className="transform-list">
              {transforms.map(transform => (
                <div key={transform._id} className="transform-card">
                  <div className="labels">
                    <label className="label">Image Before</label>
                    <label className="label">Image After</label>
                  </div>
                  <div className="images">
                    <img src={`/uploads/usersImages/${transform.imageBeforeWork}`} alt="Before" className="image" />
                    <img src={`/uploads/usersImages/${transform.imageAfterWork}`} alt="After" className="image" />
                  </div>
                  <p className="description">{transform.descriptionTransform}</p>
                  <div className="actions">
                    <button
                      className="px-4 py-4 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600"
                      onClick={() => {
                        setSelectedTransform(transform);
                        setIsUpdateModalOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="px-4 py- bg-red-500 text-white rounded-lg hover:bg-red-600"
                      onClick={() => {
                        setSelectedTransformForDeletion(transform);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <AddTransformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransform}
        setIsModalOpen={setIsModalOpen}  
      />

          {selectedTransform && (
            <UpdateTransformModal
              isOpen={isUpdateModalOpen}
              onClose={() => setIsUpdateModalOpen(false)}
              onUpdate={handleUpdateTransform}
              transform={selectedTransform}
            />
          )}
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteTransform}
          />
        </div>
      </div>
    </div>
  );
}

export default TransformPage;