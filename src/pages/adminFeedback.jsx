import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js';

function AdminFeedback() {
  
  const [feedbacks, setFeedbacks] = useState([]);
 

  const [searchTerm, setSearchTerm] = useState('');

   
  useEffect(() => {
    axios
      .get('http://localhost:8000/feedback/')
      .then((response) => setFeedbacks(response.data))
      .catch((error) => console.log(error));
  }, []);


  const deleteFeedbacks = (id) => {
    axios.delete(`http://localhost:8000/feedback/${id}`)
    .then((response) => {
      console.log(response.data);
      window.location.reload();

    })
    .catch((error) => {
      console.log('Error while deleting the feedback:', error);
    });
     }; 

     const filteredFeedbacks = feedbacks.filter((feedback) =>
     feedback.user.toLowerCase().includes(searchTerm.toLowerCase())
   );

  return (
   
<div>


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
            
            <table className="table flex items-center justify-center font-bold bg-zinc-800 text-white text-center w-full">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Trainer Name</th>
                <th>Feedbacks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {filteredFeedbacks.map((feedback) => (
                  <tr key={feedback._id}>
                    <td>{feedback.user}</td>
                    <td>{feedback.trainer}</td>
                    <td>{feedback.feedbackContent}</td>
                    <td> 
                    <div className="flex items-center justify-center space-x-4">
  <div className="bg-yellow-500 rounded">
    <button  className="text-white font-bold py-1 px-2" type="button"  
 onClick= {() => deleteFeedbacks(feedback._id)} > Delete</button>
  
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

export default AdminFeedback;





