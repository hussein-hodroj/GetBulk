import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './UserDashboard.js';
import axios from 'axios';
import './UserWorkout.css';

const UserWorkout = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [trainers, setTrainers] = useState([]);

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


  return (
    <div className='flex'>
      <Dashboard />
      <div className="w-full ml-40 h-full mt-10  p-8 rounded-lg shadow-lg bg-black">
        <div className='h-[400px] ml-20 relative overflow-hidden rounded-lg'>
        <img
  src={
    trainers.length > 0
      ? `/uploads/usersImages/${trainers[currentImage].imagePath}`
      : '/uploads/usersImages/hussein.jpeg' 
  }
  alt=""
  className="w-full h-[400px] object-cover transition-opacity duration-500 ease-in-out opacity-70 hover:opacity-100"
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
        <h2 className="text-yellow-500 justify-center items-center mt-10 font-bold text-4xl mb-4 flip-card-heading">
          Trainers
        </h2>
        <div className="flex flex-wrap justify-center flip-card-container mt-10">
          {trainers.map(trainer => (
            <div key={trainer._id} className="m-2 flip-card" style={{ border: '5px solid #FFD700' }}>
              <Link to={`/workoutselection?trainerId=${trainer._id}`}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <div className="flip-card-content h-full">
                    <img
                      src={
                        trainer.role === 'trainer'
                          ? `/uploads/usersImages/${trainer.imagePath}`
                          : '/uploads/usersImages/hussein.jpeg'
                      }
                      alt={trainer.fullname}
                      className="flip-card-img "
                    />
                  </div>
                </div>
                <div className="flip-card-back">
                  <div className="text-center mt-2">
                    <div className="user-trainer-div">
                      <div className="trainer-fullname">{trainer.fullname}</div>
                      <div className="trainer-email">{trainer.email}</div>
                      <div className="trainer-address">{trainer.address}</div>
                      <div className="trainer-phonenumber">{trainer.phonenumber}</div>
                      <div className="trainer-age">{trainer.age} years old</div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserWorkout;