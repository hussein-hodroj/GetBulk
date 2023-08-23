import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import UserDashboard from './UserDashboard.js';
import './cards.css';
import './UserWorkout.css';

function PrivateTrainers() {
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
    // Fetch trainers data
    axios.get('http://localhost:8000/trainers') // Make sure this URL is correct
      .then((response) => {
        setTrainers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trainers data:', error);
      });
  }, []);

  return (
    <div>
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
      <div className='flex'>
        <UserDashboard />
        <div className="h-full w-full ml-56 mt-40 mb-10 card-container">
          {trainers.map((trainer) => (
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
                  <div className="social-icon">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-pinterest"></i></a>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrivateTrainers;
