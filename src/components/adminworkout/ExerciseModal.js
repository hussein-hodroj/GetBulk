import React from 'react';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

Modal.setAppElement('#root');

const ExerciseModal = ({ isOpen, onClose, exercise }) => {
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
      maxWidth: '400px', 
      width: '100%', 
      maxHeight: '90vh', 
      backgroundColor: 'black',
      border: '2px solid black',
      borderRadius: '8px',
      padding: '30px',
      marginTop: '27px',
      marginBottom:'50px',
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
      maxHeight: '200px',  
      overflowY: 'auto',   
    },
  };

  const imageStyles = {
    maxWidth: '100%', 
    height: '60%', 
    width: '90%',
    borderRadius: '8px', 
    marginBottom: '10px', 
  };
  

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      {exercise && (
        <div>
          <h2 className="text-yellow-500 font-bold text-xl mb-4 mt-20">Exercise Details</h2>
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
          <div className="mb-4" >
            <h3 className="text-yellow-500 font-bold text-xl mb-4">Description:</h3>
            <p className="text-white" style={customStyles.description}>{exercise.descriptionworkout}</p>
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
