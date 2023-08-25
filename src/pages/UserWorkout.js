import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './UserDashboard.js';
import axios from 'axios';
import './cards.css';
import {  FaArrowLeft, FaArrowRight } from 'react-icons/fa/index.esm.js'; 


const UserWorkout = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [trainers, setTrainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const trainersPerPage = 3;


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage + 1) % trainers.length);
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [currentImage, trainers]);

  useEffect(() => {
    axios.get('http://localhost:8000/trainers')
      .then(response => {
        setTrainers(response.data);
      })
      .catch(error => {
        console.error('Error fetching trainers:', error);
      });
       
  }, []);
  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

  return (
    <div className='flex  justify-center items-center'>
      <Dashboard />
      <div className="w-full h-full mt-10 p-8 rounded-lg shadow-lg bg-black">
        <div className='h-[400px] ml-20 relative overflow-hidden rounded-lg'>
        <img
  src={
    trainers.length > 0
      ? `/uploads/usersImages/${trainers[currentImage].imagePath}`
      : '/uploads/usersImages/hussein.jpeg' 
  }
  alt=""
  className="w-full h-[500px] p-12 transition-opacity duration-500 ease-in-out opacity-70 hover:opacity-100"
  style={{ borderRadius: '80px' }}
/>
          <div className="absolute inset-0 text-white text-center">
            <div className="h-full flex flex-col justify-end">
              <h1 className='text-6xl text-yellow-500 font-bold mb-2'>
                Meet Our Expert Trainers
              </h1>
              <p className='text-lg text-yellow-500 mt-2 mb-2'>
                Get motivated and achieve your fitness goals with our experienced trainers.
              </p>
            </div>
          </div>
        </div>
        {/* <h2 className="text-yellow-500 justify-center items-center mt-10 font-bold text-4xl mb-4 flip-card-heading">
          Trainers
        </h2> */}
        <div className="flex flex-wrap justify-center flip-card-container mt-10">
        {currentTrainers.map((trainer) => (
            <Link to={`/workoutselection/${trainer._id}`} key={trainer._id}>
            <div className="card">
              <div className="front">
                {trainer.imagePath && (
                  <img src={`/uploads/usersImages/${trainer.imagePath}`} alt="Trainer"
                  style={{ width: '300px', height: '380px'}}

                   />
                )}
              </div>
              <div className="back">
                <div className="details">
                  <div className="caption">
                    <p className="text-white">Address: {trainer.address}</p>
                    <p className="text-white">PhoneNumber: {trainer.phonenumber}</p>
                    <p className="text-white">Age: {trainer.age}</p>
                  </div>
                  <h2 className="text-white">Name: {trainer.fullname}</h2>
                  <span className="text-white">{trainer.email}</span>
                 
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-4">
  <div className="flex items-center ml-auto">
    <button
      className="px-4 py-2 bg-yellow-500 text-white rounded-l-lg hover:bg-yellow-600"
      onClick={() => {
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }}
    >
      <FaArrowLeft/>
    </button>
    <p className="text-md text-yellow-500 ml-4 mr-4">
      Page {currentPage} of {Math.ceil(trainers.length / trainersPerPage)}
    </p>
    <button
      className="px-4 py-2 bg-yellow-500 text-white rounded-l-lg hover:bg-yellow-600"
      onClick={() => {
        const totalPages = Math.ceil(trainers.length / trainersPerPage);
        if (currentPage < totalPages) {
          setCurrentPage(currentPage + 1);
        }
      }}
    >
      <FaArrowRight/>
    </button>
  </div>
</div>

      </div>
    </div>
  );
};

export default UserWorkout;