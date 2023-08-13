import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js';
import DeleteFeedback from '../components/AdminFeedback/DeleteFeedback.js';
import { FaTrash } from 'react-icons/fa/index.esm.js'; 
import './style.css'



function FeedbackAdmin() {
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [show , setShow ] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null); // Store selected product ID

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

  return (

<div>
{show && <DeleteFeedback open={setShow} feedbackId={selectedFeedbackId} />}

 <div className='flex'>
     <Dashboard/>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
        <div className = "flex justify-between">
           
             <div className="flex justify-start mb-3">
            <input
                type="text"
                placeholder="Search by name"
                className="ml-4 p-1 rounded border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <p className="text-white font-bold border rounded py-2 px-2 bg-yellow-500 ms-4">{filteredFeedbacks.length} Feedbacks found</p>
              </div>
              
              </div>
            
            <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full"  style={{ backgroundColor: "#555555" , color: "whitesmoke" }}>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Trainer Name</th>
                <th>Feedbacks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredFeedbacks.map((feedback, index) => (
                    <tr key={feedback._id}  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                    <td>{feedback.uname}</td>
                    <td>{feedback.tname}</td>
                    <td>{feedback.feedback}</td>
                    
                    <td>
                      
                    <div className="flex items-center justify-center space-x-4">
                    <div className="bg-yellow-500 rounded">
    <button  className="text-white font-bold py-1 px-2" onClick={() => {
                            setSelectedFeedbackId(feedback._id); 
                            setShow(true);
                          }} ><FaTrash /></button>
  </div>
</div>

                     </td>
                  </tr>
                ))}
              </tbody>
          </table>
         

          </div>
        </div>
      </div>
       </div>
    
    

      
      );
}

export default FeedbackAdmin;





