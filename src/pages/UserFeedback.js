import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './UserDashboard.js';
import { FaTimes, FaTrash,FaEdit,FaArrowLeft, FaArrowRight } from 'react-icons/fa/index.esm.js';
import jwt_decode from 'jwt-decode';

function UserFeedback() {
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fullname, setFullname] = useState('');
  const [selectedFeedBack, setSelectedFeedback] = useState(null);
  const [updateFeedback, setUpdateFeedack] = useState(false);
  const [showDelete , setShowDelete ] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFeedbackData, setSelectedFeedbackData] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [userName, setUserName] = useState('user');
  const [userData, setUserData] = useState(null);
  const [selectedTrainerName, setSelectedTrainerName] = useState(''); 
  const [selectedFeedbackText, setSelectedFeedbackText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id = decodedToken.id;
   
   async function Datatfetch() {
    try {
      const response = await axios.get(`http://localhost:8000/user/${id}`);
      const userData = response.data;

      if (userData) {
        setUserName(userData.fullname);
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  
 
   }
   Datatfetch();
    axios

      .get('http://localhost:8000/trainers')
      .then((response) => {
        setTrainers(response.data); // Assuming the response is an array of trainer names
      })
      .catch((error) => {
        console.error('Error fetching trainers:', error);
      });
  }, []);
 

  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
   
  };

  const handleUpdateButtonClick = (feedback) => {
    setSelectedFeedbackData(feedback);
    setSelectedTrainer(feedback.trainername);
    setFeedbackText(feedback.feedback);
    setShowUpdateModal(true); 
  };

  const handleTrainerSelect = (event) => {
    setSelectedTrainer(event.target.value);
    console.log("traniner name=>",event.target.value)
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };
  const handleAddFeedback  = () => {
    // Handle adding feedback here
    console.log('Adding feedback:', selectedTrainer, feedbackText);
    
    // Close the modal
    toggleAddModal();
  };
  const handleAddUser = () => {
    if (!selectedTrainer || !feedbackText) {
      setErrorMessage('Trainer and Feedback are required fields.');
      return;
    }

    const newFeedback = {
      users: userData._id,
      fullname: userName,
      trainers: selectedTrainer,
      feedback: feedbackText,

    };
   
    setSelectedTrainerName(selectedTrainer);
    setSelectedFeedbackText(feedbackText);

    axios.post('http://localhost:8000/feedback/createfeedback', newFeedback)
    .then((response) => {
      console.log('Feedback added successfully:', response.data);
      setFeedbackList([...feedbackList, response.data]);
      setSelectedTrainer('');
      setFeedbackText('');
      toggleAddModal(); // Close the modal
    })
    .catch((error) => {
      console.error('Error adding feedback:', error);
    });
  };


  const handleUpdateUser = () => {
    if (!selectedFeedbackData) {
      console.error('No feedback data selected for update.');
      return;
    }
  
    const updatedFeedback = {
      _id: selectedFeedbackData._id,
      trainername: selectedTrainer,
      feedback: feedbackText,
      users: selectedFeedbackData.users,
    };
  
    axios
      .put(`http://localhost:8000/feedback/updatefeedback/${selectedFeedbackData._id}`, updatedFeedback)
      .then((response) => {
        console.log('Feedback updated successfully:', response.data);
  
        // Update the feedbackList with the updated feedback data
        const updatedList = feedbackList.map((feedback) => {
          if (feedback._id === selectedFeedbackData._id) {
            return {
              ...feedback,
              trainername: selectedTrainer,
              feedback: feedbackText,
            };
          }
          return feedback;
        });
  
        setFeedbackList(updatedList);
  
        // Clear the form and close the modal
        setSelectedTrainer('');
        setFeedbackText('');
        setShowUpdateModal(false);
      })
      .catch((error) => {
        console.error('Error updating feedback:', error);
      });
  };
  



  const handleDeleteFeedback = () => {
   console.log("Delete",selectedFeedBack)

    if (selectedFeedBack) {
      const id = selectedFeedBack;
      axios.delete(`http://localhost:8000/feedback/delete/${id}`)
        .then(() => {
          // Remove the deleted feedback from the feedbackList state
          const updatedFeedbackList = feedbackList.filter(feedback => feedback._id !== selectedFeedBack);
          setFeedbackList(updatedFeedbackList);
        })
        .catch(error => {
          console.error('Error deleting feedback:', error);
        });
    }
  
    // Close the delete modal
    setShowDeleteModal(false);
  };
  
  

  return (
    <div className='bg-black min-h-screen  '>
      <div className="flex ">
        <Dashboard />
        <div className="h-4/5 w-4/5  mx-32 mt-14 mb-10 ">
          <div className="p-6 gap-4">
            <div className="flex mt-16">
            <button
                className="text-white bold border font-bold bg-yellow-500 rounded px-2 py-1 transition-transform transform-gpu hover:scale-110"
                onClick={toggleAddModal}
              >
                Add Feedback
              </button>
             
            </div>
            {showAddModal && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40">
                  <div className="bg-zinc-800 p-7 rounded shadow-md w-96 ">
                    {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
                    <div className="flex justify-end" aria-hidden="true">
                      <button className="text-yellow-500" onClick={toggleAddModal}>
                        <FaTimes />
                      </button>
                    </div>
                    <p className="text-2xl text-yellow-500 font-bold mb-5">New Feedback</p>
                   
                    <div className="mb-3 flex">
                        <div className="mr-4">
                          <label className="text-yellow-500 text-xl font-semibold mb-4 block mr-8">Username: </label>
                          <span className="text-yellow-500  text-lg">{userName}</span>
                        </div>
                        <div>
                          <label className="text-yellow-500 text-xl font-semibold mb-4 block ">Trainer's Name:</label>
                          <select
                            value={selectedTrainer}
                            onChange={handleTrainerSelect}
                            className="px-6 py-2 w-full rounded-lg border Border-white text-black font-semibold"
                          >
                            <option value="">Select a Trainer</option>
                            {trainers.map((trainer) => (
                              <option key={trainer._id} value={trainer.fullname}>
                                {trainer.fullname}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                    <div className="mb-3">
                      <label className="text-yellow-500 text-xl font-semibold mb-2 block">Feedback</label>
                      <textarea
                        value={feedbackText}
                        onChange={handleFeedbackTextChange}
                        className="w-full rounded-lg p-2 border Border-white text-black"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        className="bg-red-500 text-white font-bold px-4 py-2 mr-2 rounded-lg transition-transform transform-gpu hover:scale-110"
                        onClick={toggleAddModal}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition-transform transform-gpu hover:scale-110"
                        onClick={handleAddUser}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}


            <div className="flex justify-between mb-3">
              <div className="flex justify-between">
                <div className="flex justify-start mb-3"></div>
              </div>
            </div>
            <table className="min-w-full divide-y border border-black">
              <thead className="bg-zinc-600  ">
                <tr className="bg-zinc-600 mt-9 ">
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
                       #
                </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border"
                  >
                    User Name
                  </th>
              
                  <th
                    scope="col"
                    className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border"
                  >
                    Name of the Trainer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border"
                  >
                    Feedback
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-white font-semibold">
                      {feedbackList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((feedback, index) => (
                          <tr
                          key={index}
                          className={index % 2 === 0 ? 'bg-zinc-500' : 'bg-zinc-600'}
                        >
                           <td className="px-6 py-4 whitespace-nowrap border Border-white">
                      {index + 1+(currentPage - 1) * itemsPerPage} 
                    </td>
                          <td className="px-6 py-4 whitespace-nowrap border Border-white text-white font-semibold ">
                            {userName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border Border-white text-white font-semibold">
                            {feedback.trainername}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap border Border-white text-white font-semibold">
                            {feedback.feedback}
                          </td>
                          <td className="justify-center flex items-center px-6 py-4 whitespace-nowrap border Border-white text-white font-semibold">
                          <button
                                  className="text-yellow-500 font-bold px-4 py-2 border border-yellow-500 transition-transform transform-gpu hover:scale-110"
                                  title="update"
                                  onClick={() => {
                                    handleUpdateButtonClick(feedback);
                                
                                  }}
                                >
                                  <FaEdit className="w-5 h-5" />
                              </button>

                              {showUpdateModal && (
                              <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40">
                                <div className="bg-zinc-800 p-7 rounded shadow-md w-96">
                                  {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
                                  <div className="flex justify-end">
                                    <button className="text-yellow-500" onClick={() => setShowUpdateModal(false)}>
                                      <FaTimes />
                                    </button>
                                  </div>
                                  <p className="text-xl text-yellow-500 font-bold mb-3">Update Feedback</p>
                                  
                                  <div className="mb-3">
                                    <label className="text-yellow-500 font-semibold mb-2 block">Trainer's Name</label>
                                    <select
                                      value={selectedTrainer}
                                      onChange={handleTrainerSelect}
                                      className="px-6 py-2 w-full rounded-xl text-black border Border-white"
                                    >
                                      <option value="" className="text-black">Select a Trainer</option>
                                      {trainers.map((trainer) => (
                                        <option key={trainer._id} value={trainer.fullname}>
                                          {trainer.fullname}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="mb-3">
                                    <label className="text-yellow-500 font-semibold mb-2 block">Feedback</label>
                                    <textarea
                                      value={feedbackText}
                                      onChange={handleFeedbackTextChange}
                                      className="w-full rounded-lg p-2 border Border-white text-black"
                                    />
                                  </div>
                                  <div className="flex justify-end">
                                    <button
                                      className="bg-red-500 text-white font-bold px-4 py-2 mr-2 rounded-lg transition-transform transform-gpu hover:scale-110"
                                      onClick={() => {
                                        setShowUpdateModal(false); // Close the modal
                                        setSelectedTrainer(''); // Clear the selected trainer
                                        setFeedbackText(''); // Clear the feedback text
                                      }}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition-transform transform-gpu hover:scale-110"
                                      onClick={() => {
                                        handleUpdateUser(selectedFeedbackData._id); // Update the user data
                                        setShowUpdateModal(false); // Close the modal
                                      }}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}



                                <button className="text-red-500 font-bold px-4 py-2 border ml-5 border-red-500 transition-transform transform-gpu hover:scale-110" type="button"  
                                        onClick={() => { setSelectedFeedback(feedback._id); setShowDeleteModal(true); }}>
                                        <FaTrash className="w-5 h-5" />
                                </button>


                                {showDeleteModal && (
                                        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40">
                                          <div className="bg-zinc-800 p-7 rounded shadow-md w-96">
                                            <p className="text-xl text-yellow-500 font-bold mb-3">Delete Confirmation</p>
                                            <p className="mb-3">Are you sure you want to delete this feedback?</p>
                                            <div className="flex justify-end">
                                              <button
                                                className="bg-red-500 text-white font-bold px-4 py-2 mr-2 rounded-lg transition-transform transform-gpu hover:scale-110"
                                                onClick={() => {
                                                  handleDeleteFeedback();
                                                  setShowDeleteModal(false); // Close the modal
                                                }}
                                              >
                                                Confirm
                                              </button>
                                              <button
                                                className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition-transform transform-gpu hover:scale-110"
                                                onClick={() => setShowDeleteModal(false)} // Close the modal
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                  )}
                        </td>

                        </tr>
                      ))}
                    </tbody>
                  
            </table>
            <div className="flex items-center justify-end mt-4">
                              <button
                                className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                              >
                                <FaArrowLeft className="mr-1" /> 
                              </button>
                              <span className="text-yellow-500 font-semibold">
                                Page {currentPage} of {Math.ceil(feedbackList.length / itemsPerPage)}
                              </span>
                              <button
                                className="bg-yellow-500 text-white px-4 py-1 rounded-lg ml-2"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage * itemsPerPage >= feedbackList.length}
                              >
                                 <FaArrowRight className="ml-1" />
                              </button>
                            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default UserFeedback;
