import React, { useState } from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

Modal.setAppElement('#root');

const ExerciseModal = ({ isOpen, onClose, exercise }) => {
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(true);

  const customStyles = {
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      maxWidth: '600px',
      backgroundColor: 'black',
      border: '2px solid black',
      borderRadius: '8px',
      padding: '20px',
      marginTop: '20px',
      height: '90%',
    },
    closeButton: {
      alignSelf: 'flex-end',
      marginTop: '5px',
      padding: '6px 10px',
      background: 'red',
      color: 'white',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    description: {
      maxHeight: '100px',
      overflowY: 'auto',
      marginBottom: '40px',
    },
  };

  const imageStyles = {
    maxWidth: '100%',
    height: '230px',
    width: '100%',
    objectFit: 'contain',
    borderRadius: '8px',
    marginBottom: '10px',
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <style>
        {`
          .swipe-indicator {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end; 
            margin-bottom: 70px;
            animation: fadeInOut 2s infinite;
          }

          @keyframes fadeInOut {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }

          .swipe-line {
            width: 40px;
            height: 2px;
            background-color: white;
            margin-right: 30px;
          }

          .swipe-hand {
            font-size: 30px;
            margin-right: 30px;
          }
        `}
      </style>
      {exercise && (
    <div onClick={() => setShowSwipeIndicator(false)}>
      {showSwipeIndicator && (
        <div className="swipe-indicator">
          <div className="swipe-hand"> 👉 </div>
          <div className="swipe-line"> swip to show exercise</div>
        </div>
      )}
      <h2 className="text-yellow-500 font-bold text-xl mb-4">Exercise Details</h2>
          <Carousel showArrows={true} showThumbs={false}>
            {exercise.imageworkout.map((imageName, index) => (
              <div key={index} className="carousel-image-container">
                <img
                  src={`/uploads/usersImages/${imageName}`}
                  alt={`Exercise ${index}`}
                  className="carousel-image"
                  style={imageStyles}
                />
              </div>
            ))}
          </Carousel>
          <div className="mb-2">
            <h3 className="text-yellow-500 font-bold text-xl mb-2">Description:</h3>
            <p className="text-white" style={customStyles.description}>
              {exercise.descriptionworkout}
            </p>
          </div>
        </div>
      )}
      <button onClick={onClose} style={customStyles.closeButton}>
        Close
      </button>
    </Modal>
  );
};

export default ExerciseModal;
