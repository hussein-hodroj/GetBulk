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
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [newUserDetails, setNewUserDetails] = useState({

    fullname: '',
    email: '',
    address: '',
    age: '',
    phonenumber: '',
    password:"",
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
      const response = await axios.post('http://localhost:8000/user/addUser', newUserDetails);
      const newUser = response.data;
      
      setTrainers(prevTrainers => [...prevTrainers, newUser]);
      setShowAddUserModal(false);
      setNewUserDetails({
        fullname: '',
        email: '',
        password: '',
        address: '',
        phonenumber:'',
        age: '',
        role: 'trainer'
       
      });
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error adding user');
      }
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

        <div className="flex justify-between mb-3">
  <div className="flex">
    <input
      type="text"
      placeholder="Search by name or phone"
      className="px-4 py-2 border rounded"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <p className="px-4 py-2 rounded">
      Number of Users Found: {numFilteredTrainers}
    </p>
  </div>
  <button
    className="text-white hover:text-black bold border bg-yellow-500 hover:border-black rounded px-2 py-1"
    onClick={toggleAddUserModal}
  >
    Add Trainer
  </button>
</div>


                     
          <div className="flex justify-between">
            <div className="flex justify-start mb-3">
              
            </div>
          </div>
          <table className="min-w-full divide-y  border border-black ">
            <thead className="bg-zinc-600 ">
              <tr>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border ">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border ">
                  Age
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='text-white font-semibold'>
  {filteredTrainers.map((trainer, index) => (
    <tr
      key={trainer._id}
      className={index % 2 === 0 ? 'bg-zinc-500' : 'bg-zinc-600'}
    >
      <td className="px-6 py-4 whitespace-nowrap border Border-white">
        {trainer.fullname}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-white">
        {trainer.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-white">
        {trainer.address}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-white">
        {trainer.age}
      </td>
      <td className="px-6 py-4 whitespace-nowrap border border-white">
        {trainer. phonenumber}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap border border-white">
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
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 ">
          <div className="bg-white p-4 rounded shadow-md ">
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
     <div className="bg-zinc-800 p-7 rounded shadow-md">
       {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
       <p className="text-xl text-yellow-500 font-bold mb-5">Add Add Trainer</p>
       <div className="grid grid-cols-2 gap-4 mb-4">
         <div>
           <p className="text-yellow-500 font-semibold mb-2">Full Name</p>
           <input
             type="text"
             placeholder="Full Name"
             className="px-4 py-2 border rounded w-full"
             value={newUserDetails.fullname}
             onChange={(e) => handleNewUserDetailsChange('fullname', e.target.value)}
           />
         </div>
         <div>
           <p className="text-yellow-500 font-semibold mb-2">Email</p>
            <input
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 border rounded w-full"
                    value={newUserDetails.email}
                    onChange={(e) => handleNewUserDetailsChange('email', e.target.value)}
                    autoComplete="off"
                  />
         </div>
         <div>
           <p className="text-yellow-500 font-semibold mb-2">Address</p>
           <input
             type="address"
             placeholder="Address"
             className="px-4 py-2 border rounded w-full"
             value={newUserDetails.address}
             onChange={(e) => handleNewUserDetailsChange('address', e.target.value)}
           />
         </div>
         <div>
           <p className="text-yellow-500 font-semibold mb-2">Phone Number</p>
           <input
             type="phonenumber"
             placeholder="Phone Number"
             className="px-4 py-2 border rounded w-full"
             value={newUserDetails.phonenumber}
             onChange={(e) => handleNewUserDetailsChange('phonenumber', e.target.value)}
           />
         </div>
         <div >
           <p className="text-yellow-500 font-semibold mb-2">Age</p>
           <input
             type="age"
             placeholder="Age"
             className="px-4 py-2 border rounded "
             value={newUserDetails.age}
             onChange={(e) => handleNewUserDetailsChange('age', e.target.value)}
           />
         </div>
         <div>
            <p className="text-yellow-500 font-semibold mb-2">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="px-4 py-2 border rounded w-full"
              value={newUserDetails.password}
              onChange={(e) => handleNewUserDetailsChange('password', e.target.value)}
              autoComplete="off"
            />
          </div>

       </div>
       
       <div className="mt-8 flex justify-end">
         <button
           className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
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
