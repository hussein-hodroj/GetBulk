import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js';
import DeleteFeedback from '../components/AdminFeedback/DeleteFeedback.js';
import {FaSearch, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa/index.esm.js';
import './style.css';

function FeedbackAdmin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const feedbackPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8000/feedback/')
      .then((response) => setFeedbacks(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.uname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredFeedbacks.length / feedbackPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  return (
    <div>
      {show && (
        <DeleteFeedback open={setShow} feedbackId={selectedFeedbackId} />
      )}

      <div className='flex'>
        <Dashboard />
        <div className='h-full w-full ml-56 mt-14 mb-10 '>
          <div className='p-6 gap-4'>
            <div className='flex justify-between'>
              <div className='flex justify-start mb-3'>
              <FaSearch className="search-icon text-zinc-500 ms-4 mt-1" size={25}/>

                <input
                  type='text'
                  placeholder='Search by name'
                  className='ml-4 p-1 rounded border border-gray-300 text-black'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
              </div>
            </div>
            <table
              className='table flex items-center justify-center font-bold bg-zinc-800 text-center w-full'
              style={{ backgroundColor: '#555555', color: 'whitesmoke' }}
            >
              <thead>
                <tr>
                  <th scope='col' className='px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border'>
                    #
                  </th>
                  <th>User Name</th>
                  <th>Trainer Name</th>
                  <th>Feedbacks</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentFeedbacks.map((feedback, index) => (
                  <tr
                    key={feedback._id}
                    className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}
                  >
                    <td className='px-6 py-4 whitespace-nowrap border Border-white'>
                    {(currentPage - 1) * feedbackPerPage + index + 1}
                                        </td>
                    <td className='px-6 py-4 whitespace-nowrap border Border-white'>
                      {feedback.uname}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap border Border-white'>
                      {feedback.tname}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap border Border-white'>
                      {feedback.feedback}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap border Border-white'>
                      <div className='flex items-center justify-center space-x-4'>
                        <div className='bg-red-500 rounded hover:bg-red-600'>
                          <button
                            className='text-white font-bold py-1 px-2'
                            onClick={() => {
                              setSelectedFeedbackId(feedback._id);
                              setShow(true);
                            }}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='flex justify-center mt-4'>
              <div className='flex items-center ml-auto'>
                <button
                  className='px-4 py-2 bg-yellow-500 text-white rounded-l-lg hover:bg-yellow-600'
                  onClick={handlePreviousPage}
                >
                  <FaArrowLeft />
                </button>
                <p className='text-md text-yellow-500 ml-4 mr-4'>
                  Page {currentPage} of {Math.ceil(filteredFeedbacks.length / feedbackPerPage)}
                </p>
                <button
                  className='px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600'
                  onClick={handleNextPage}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedbackAdmin;
