import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js';

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserDetails, setNewUserDetails] = useState({
    fullname: '',
    email: '',
    address: '',
    age: '',
    phone: ''
  });


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

  const toggleAddUserModal = () => {
    setShowAddUserModal(!showAddUserModal);
  };

  const handleNewUserDetailsChange = (field, value) => {
    setNewUserDetails(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  const handleAddUser = async () => {
    console.log('Adding user:', newUserDetails);
    try {
      const response = await axios.post('http://localhost:8000/user/', newUserDetails);
      const newUser = response.data;
      
      // Update the trainers state to include the new user
      setTrainers(prevTrainers => [...prevTrainers, newUser]);
      
      // Close the Add User modal and reset the form fields
      setShowAddUserModal(false);
      setNewUserDetails({
        fullname: '',
        email: '',
        address: '',
        age: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  



  const handleDeleteTrainer = (trainerId) => {
    setSelectedTrainerId(trainerId);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/user/${selectedTrainerId}`);
      // Update the trainers state after successful deletion
      setTrainers((prevTrainers) =>
        prevTrainers.filter((trainer) => trainer._id !== selectedTrainerId)
      );
      setSelectedTrainerId(null); // Reset the selected trainer ID
      setShowDeleteModal(false); // Close the modal
    } catch (error) {
      console.error('Error deleting trainer:', error);
    }
  };
  

  const filteredTrainers = trainers.filter((trainer) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      trainer.fullname.toLowerCase().includes(searchTermLower) ||
      trainer.email.toLowerCase().includes(searchTermLower) ||
      (trainer.phonenumber && trainer.phonenumber.toString().includes(searchTermLower)) ||
      trainer.address.toLowerCase().includes(searchTermLower)
    );
  });
  
  const numFilteredTrainers = filteredTrainers.length;

  return (
    <div className='flex'>
      <Dashboard />
      <div className="h-full w-full ml-56 mt-14 mb-10">
        <div className="p-6 gap-4">

              <div div className="flex justify-start  mb-3">

                        <input
                          type="text"
                          placeholder="Search by name or phone"
                          className="px-4 py-2 border rounded "
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                         <p className="px-4 py-2  rounded  ">Number of Users Found: {numFilteredTrainers}</p>
                         <button
              className="text-white hover:text-black bold border bg-yellow-500 hover:border-black rounded px-2 py-1"
              onClick={toggleAddUserModal}
            >
              Add User
            </button>
                      </div>
                     
          <div className="flex justify-between">
            <div className="flex justify-start mb-3">
              
            </div>
          </div>
          <table className="min-w-full divide-y  border border-black ">
            <thead className="bg-yellow-500 ">
              <tr>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider border-black border">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider border-black border">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider border-black border ">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider border-black border ">
                  Age
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider border-black border">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider border-black border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='text-white font-semibold'>
  {filteredTrainers.map((trainer, index) => (
    <tr
      key={trainer._id}
      className={index % 2 === 0 ? 'bg-zinc-600' : 'bg-zinc-800'}
    >
      <td className="px-6 py-4 whitespace-nowrap border border-black">
        {trainer.fullname}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-black">
        {trainer.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-black">
        {trainer.address}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-black">
        {trainer.age}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-black">
        {trainer.phone}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap border border-black">
                    <button
                      onClick={() => handleDeleteTrainer(trainer._id)}
                      className="text-white hover:text-black border bg-yellow-500 hover:border-black rounded px-2 py-1"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-4 rounded shadow-md">
          <p className="text-xl font-bold mb-2">Confirmation</p>
            <p className="text-lg font-semibold mb-2">Are you sure you want to delete this Trainer?</p>
            <div className="flex justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-800"
                onClick={confirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowDeleteModal(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
       {showAddUserModal && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-xl font-bold mb-2">Add New User</p>
            <div><input
              type="text"
              placeholder="Full Name"
              className="px-4 py-2 border rounded mb-2"
              value={newUserDetails.fullname}
              onChange={(e) => handleNewUserDetailsChange('fullname', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-2 border rounded mb-2"
              value={newUserDetails.email}
              onChange={(e) => handleNewUserDetailsChange('email', e.target.value)}
            /></div>
                  <div><input
                    type="address"
                    placeholder="Address"
                    className="px-4 py-2 border rounded mb-2"
                    value={newUserDetails.address}
                    onChange={(e) => handleNewUserDetailsChange('address', e.target.value)}
                  /> 
                  <input
                  type="phone"
                  placeholder="Phone"
                  className="px-4 py-2 border rounded mb-2"
                  value={newUserDetails.phone}
                  onChange={(e) => handleNewUserDetailsChange('phone', e.target.value)}
             />
          
          </div>

             
            <input
            type="age"
            placeholder="Age"
            className="px-4 py-2 border rounded mb-2"
            value={newUserDetails.age}
            onChange={(e) => handleNewUserDetailsChange('age', e.target.value)}
          />
            
            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-800"
                onClick={handleAddUser}
              >
                Add
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={toggleAddUserModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Trainers;
