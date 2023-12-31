import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js';
import bcrypt from 'bcryptjs';
import { FaTimes, FaTrash,FaArrowLeft, FaArrowRight, FaSearch,FaEdit ,FaPlus} from 'react-icons/fa/index.esm.js'; 



function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
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
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const handleEditTrainer = (trainer) => {
    setEditingTrainer(trainer);
    setShowEditModal(true);
  };
  const handleSaveEditedTrainer = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/user/${editingTrainer._id}`,
        editingTrainer
      );
  
      // Update the trainers state with the updated trainer
      setTrainers((prevTrainers) =>
        prevTrainers.map((trainer) =>
          trainer._id === editingTrainer._id ? editingTrainer : trainer
        )
      );
  
      setEditingTrainer(null); // Reset the editing state
      setShowEditModal(false); // Close the edit modal
    } catch (error) {
      console.error('Error updating trainer:', error);
    }
  };
  
  
  const handleAddUser = async () => {
    console.log('Adding user:', newUserDetails);
    try {
      const saltRounds = 10; // Number of salt rounds for hashing
      const hashedPassword = await bcrypt.hash(newUserDetails.password, saltRounds);
      const newUser = {
        ...newUserDetails,
        password: hashedPassword
      };
      const response = await axios.post('http://localhost:8000/user/addUser', newUserDetails);
      const addedUser  = response.data;
      
      setTrainers(prevTrainers => [...prevTrainers, addedUser ]);
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
      (trainer.fullname && trainer.fullname.toLowerCase().includes(searchTermLower)) ||
      (trainer.email && trainer.email.toLowerCase().includes(searchTermLower)) ||
      (trainer.phonenumber && trainer.phonenumber.toString().includes(searchTermLower)) ||
      (trainer.address && trainer.address.toLowerCase().includes(searchTermLower))
    );
  });
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };
  const numFilteredTrainers = filteredTrainers.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTrainers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='flex'>
      <Dashboard />
      <div className="h-full w-full ml-56 mt-14 mb-10">
        <div className="p-6 gap-4">

        <div className="flex justify-between mb-3">
            <div className="flex justify-start mb-3 ">
              <FaSearch className="search-icon text-zinc-500 ms-4 mt-2 mr-3" size={25}/>
              <input
                type="text"
                placeholder="Search by name or phone"
                className="px-4 py-2 border rounded text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              
            </div>
            <div className=" flex justify-end mb-3 mr-4">
            <button
            className="text-white font-bold border bg-yellow-500 rounded px-3 py-2 transition-transform transform-gpu hover:scale-110 flex items-center"
            onClick={toggleAddUserModal}
          >
            <FaPlus className="mr-2" />
            Add Trainer
          </button>
            </div>
           

</div>
                
          <div className="flex justify-between">
            <div className="flex justify-start mb-3">
              
            </div>
          </div>
          <table className="min-w-full divide-y  " >
            <thead className="bg-[#525252] ">
              <tr>
                <th scope="col" className="px-6 py-3 text-left bold font-medium items-center text-white uppercase tracking-wider Border-white border">
                       #
                </th>

                <th scope="col" className="px-6 py-3 text-left bold font-medium  text-white uppercase tracking-wider Border-white border">
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
              {currentItems.map((trainer, index) => (
                <tr
                  key={trainer._id}
                  className={index % 2 === 0 ? 'bg-[#737373]' : 'bg-[#525252]'}
                >
                  <td className="px-6 py-4 whitespace-nowrap border Border-white">
                      {index + 1+(currentPage - 1) * itemsPerPage} 
                    </td>
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
                  
                  <td className="px-6 py-4 whitespace-nowrap border border-white flex items-center justify-center">
                  <button
                              className="text-white font-bold py-1 px-2 bg-yellow-500 rounded transition-transform transform-gpu hover:scale-110 "
                              onClick={() => handleEditTrainer(trainer)}
                            >
                              <FaEdit className="w-5 h-5" />
                            </button>
                          <button
                                onClick={() => handleDeleteTrainer(trainer._id)}
                                className="bg-red-500 font-bold text-white  ml-3 transition-transform transform-gpu hover:scale-110 rounded px-2 py-1 flex items-center justify-center"
                              >
                                <FaTrash className="w-5 h-5" />
                    </button>
                   
                    
                              </td>
                            </tr>
                          ))}
            </tbody>
          </table>
          <div className="flex items-center justify-end mt-4">
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded-lg mr-2"
                  onClick={() => handlePaginationChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaArrowLeft className="mr-1" /> 
                </button>
                <span className="text-yellow-500 font-semibold">
                  Page {currentPage} of {Math.ceil(filteredTrainers.length / itemsPerPage)}
                </span>
                <button
                  className="bg-yellow-500 text-white px-4 py-1 rounded-lg ml-2"
                  onClick={() => handlePaginationChange(currentPage + 1)}
                  disabled={indexOfLastItem >= filteredTrainers.length}
                >
                  <FaArrowRight className="ml-1" />
                </button>
              </div>

        </div>
      </div>
      {showEditModal && editingTrainer && (
  <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-zinc-700 bg-opacity-40">
    <div className="bg-zinc-800 p-7 rounded-xl shadow-md">
      <div className="flex justify-end">
        <button
          className="text-yellow-500"
          onClick={() => {
            setEditingTrainer(null);
            setShowEditModal(false);
          }}
        >
          <FaTimes />
        </button>
      </div>
      <p className="text-xl text-yellow-500 font-bold mb-5">Edit Trainer</p>
      <div className="grid grid-cols-2 gap-4 mb-4 text-black">
        <div>
          <p className="text-yellow-500 font-semibold mb-2">Full Name</p>
          <input
            type="text"
            placeholder="Full Name"
            className="px-4 py-2 border rounded w-full"
            value={editingTrainer.fullname}
            onChange={(e) => setEditingTrainer(prevTrainer => ({ ...prevTrainer, fullname: e.target.value }))}
          />
        </div>
        <div>
          <p className="text-yellow-500 font-semibold mb-2">Email</p>
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 border rounded w-full"
            value={editingTrainer.email}
            onChange={(e) => setEditingTrainer(prevTrainer => ({ ...prevTrainer, email: e.target.value }))}
          />
        </div>
        <div>
          <p className="text-yellow-500 font-semibold mb-2">Age</p>
          <input
            type="text"
            placeholder="Age"
            className="px-4 py-2 border rounded w-full"
            value={editingTrainer.age}
            onChange={(e) => setEditingTrainer(prevTrainer => ({ ...prevTrainer, age: e.target.value }))}
          />
        </div>
        <div>
          <p className="text-yellow-500 font-semibold mb-2">Phone Number</p>
          <input
            type="text"
            placeholder="Phone Number"
            className="px-4 py-2 border rounded w-full"
            value={editingTrainer.phonenumber}
            onChange={(e) => setEditingTrainer(prevTrainer => ({ ...prevTrainer, phonenumber: e.target.value }))}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          className="bg-red-500 text-white font-bold px-4 py-2 mr-2 rounded-lg transition-transform transform-gpu hover:scale-110"
          onClick={() => {
            setEditingTrainer(null);
            setShowEditModal(false);
          }}
        >
          Cancel
        </button>

        <button
          className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg transition-transform transform-gpu hover:scale-110"
          onClick={handleSaveEditedTrainer} // Implement this function to save the edited trainer
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      {showDeleteModal && (
  <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40 ">
    <div className="bg-zinc-700 p-4 rounded-xl w-96">
      <div className="flex justify-end">
        <button
          className="text-yellow-500"
          onClick={() => setShowDeleteModal(false)}
        >
          <FaTimes />
        </button>
      </div>
      <p className="text-lg text-yellow-500 font-bold mb-2">Confirmation</p>
      <p className="text-sm text-yellow-500 py-5 font-semibold mb-2">Are you sure you want to delete this Trainer?</p>
      <div className="flex justify-end">
        <button
          className="bg-red-500 text-white px-4 py-1 mr-2 rounded-lg font-bold transition-transform transform-gpu hover:scale-110 "
          onClick={() => setShowDeleteModal(false)}
        >
          Cancel
        </button>
        <button
          className="bg-yellow-600 text-white px-4 py-1 rounded-lg font-bold transition-transform transform-gpu hover:scale-110 "
          onClick={confirmDelete}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
       {showAddUserModal && (
     
     <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-40">
     <div className="bg-zinc-800 p-7 rounded-xl shadow-md">
       {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
       <div className="flex justify-end">
        <button
          className="text-yellow-500 " 
          onClick={toggleAddUserModal}
        >
          <FaTimes />
        </button>
      </div>
       <p className="text-xl text-yellow-500 font-bold mb-5">Add Trainer</p>
       <div className="grid grid-cols-2 gap-4 mb-4 text-black">
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
           className="bg-red-500 text-white font-bold px-4 py-2  mr-2 rounded-lg transition-transform transform-gpu hover:scale-110"
           onClick={toggleAddUserModal}
         >
           Cancel
         </button>

         <button
           className="bg-yellow-500 text-white font-bold px-4 py-2 rounded-lg   transition-transform transform-gpu hover:scale-110"
           onClick={handleAddUser}
         >
           Add
         </button>
         
       </div>
     </div>
   </div>
   
   
      )}
    </div>
  );
}


export default Trainers;
