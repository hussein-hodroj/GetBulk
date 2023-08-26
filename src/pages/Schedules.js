import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {FaPlus, FaEdit, FaTrash, FaArrowLeft, FaArrowRight, FaSearch } from 'react-icons/fa/index.esm.js';
import Dashboard from './TrainerDashboard.js';
import './style.css';
import AddScheduleModal from '../components/schedules/AddScheduleModal.js';
import UpdateScheduleModal from '../components/schedules/UpdateScheduleModal.js';
import DeleteScheduleModal from '../components/schedules/DeleteScheduleModal.js';


function Schedules() {
    const [schedules, setSchedules] = useState([]);
    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const schedulesPerPage = 10; 
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.id;
        fetchSchedules(userId); 
      }
    }, []);
    
    
    const fetchSchedules = async (userId) => {
      try {
        const response = await axios.get(`http://localhost:8000/schedule/getAllschedule`);
        const userSchedules = response.data.filter(schedule => schedule.trainerId.includes(userId));
        setSchedules(userSchedules);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    };
    
    
  
  const handleAddSchedule = async (newSchedule) => {
    try {
      await axios.post('http://localhost:8000/schedule/createschedule', newSchedule);
      fetchSchedules();
      setAddModalIsOpen(false);
    } catch (error) {
      console.error('Error adding schedule:', error.response.data);
    }
  };

  const handleUpdateSchedule = async (updatedSchedule) => {
    try {
      await axios.post(
        `http://localhost:8000/schedule/updateschedule/${selectedSchedule._id}`,
        updatedSchedule
      );
      fetchSchedules();
      setUpdateModalIsOpen(false);
    } catch (error) {
      console.error('Error updating schedule:', error.response.data);
    }
  };

  const handleDeleteSchedule = async () => {
    if (!selectedSchedule) {
      console.error('No schedule selected for deletion.');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/schedule/deleteschedule/${selectedSchedule._id}`);
      fetchSchedules();
      setDeleteModalIsOpen(false);
      setSelectedSchedule(null);
    } catch (error) {
      console.error('Error deleting schedule:', error.response.data);
    }
  };

  const handleDeleteClick = (schedule) => {
    setSelectedSchedule(schedule);
    setDeleteModalIsOpen(true);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); 
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredSchedules.length / schedulesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastSchedule = currentPage * schedulesPerPage;
  const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.tname.toLowerCase().includes(searchInput.toLowerCase())
  );

  const currentSchedules = filteredSchedules.slice(
    indexOfFirstSchedule,
    indexOfLastSchedule
  );

  return (
    <div className='flex'>
      <Dashboard />
    <div className="h-full w-full ml-56 mt-14 mb-10">
      <div className="p-6 gap-4">
      <div className="flex justify-between items-center mb-4">
      <div className="flex items-center rounded-md bg-gray-100 p-2">
  <input
    type="text"
    placeholder="Search..."
    className="bg-transparent border-none focus:outline-none text-gray-500"
    value={searchInput}
    onChange={handleSearchInputChange}
  />
  <FaSearch className="ml-2 text-gray-500" />
</div>
         
<button
  className="flex justify-between items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-black hover:border-yellow-500 hover:rounded-lg ml-auto"
  onClick={() => setAddModalIsOpen(true)}
>
  <FaPlus /> Add Schedule
</button>

           
           
         </div>
        <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full" style={{ backgroundColor: "#555555", color: "whitesmoke" }}>
          <thead>
            <tr>
            <th>#</th>
              <th>Trainer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {currentSchedules.map((schedule, index) => (
              <tr key={schedule._id} className={schedules.indexOf(schedule) % 2 === 0 ? 'table-row-even' : 'table-row-odd'} >
                <td className="py-2 px-4">{index + 1}</td>
                 <td style={{  padding:'7px' }}>{schedule.tname}</td> 
                <td style={{  padding:'7px' }}>{schedule.date}</td>
                <td style={{  padding:'7px' }}>{schedule.Timeschedule}</td>
                <td style={{  padding:'7px' }}>{schedule.status === 1 ? 'Active' : 'Unactive'}</td>
                <td style={{  padding:'7px' }}>
                  <button
  className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2 hover:bg-yellow-600"
  onClick={() => {
    setSelectedSchedule(schedule); 
    setUpdateModalIsOpen(true);
  }}
>
  <FaEdit />
</button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleDeleteClick(schedule)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
            <div className="flex items-center ml-auto">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-l-lg hover:bg-yellow-600"
                onClick={handlePreviousPage}
              >
                <FaArrowLeft />
              </button>
              <p className="text-md text-yellow-500 ml-4 mr-4">
                Page {currentPage} of {Math.ceil(filteredSchedules.length / schedulesPerPage)}
              </p>
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600"
                onClick={handleNextPage}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
      </div>
    </div>
    <AddScheduleModal
        isOpen={addModalIsOpen}
        onClose={() => {
          setAddModalIsOpen(false);
        }}
        onAdd={handleAddSchedule}
      />
      <UpdateScheduleModal
      isOpen={updateModalIsOpen}
      onClose={() => setUpdateModalIsOpen(false)}
      handleUpdateSchedule={handleUpdateSchedule}
      selectedSchedule={selectedSchedule} 
      updateSchedulesList={fetchSchedules}
    />
       <DeleteScheduleModal
        isOpen={deleteModalIsOpen}
        onCancel={() => setDeleteModalIsOpen(false)}
        onDelete={handleDeleteSchedule}
      />
    </div>
  );
}

export default Schedules;
