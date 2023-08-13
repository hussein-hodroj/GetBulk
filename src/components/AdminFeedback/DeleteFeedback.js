import React from 'react';
import axios from 'axios';
import './DeleteFeedback.css';

function DeleteAdminFeedback({ open, feedbackId }) {
    const handleSubmit = (e) => {
        axios.delete(`http://localhost:8000/feedback/delete/${feedbackId}`)
        .then((response) => {
          console.log(response.data);
          window.location.reload();
    
        })
        .catch((error) => {
          console.log('Error while deleting the feedback:', error);
        });
         };
        

  return (
    <div className = "modalBackgroundDeleteFeedback">
          <form onSubmit={handleSubmit}>
      <div className= "modalContainerDeleteFeedback">
        <div className = "CloseBtnDeleteFeedback  flex justify-between">
        <h1 className="text-yellow-500 font-bold "> Delete Feedback: </h1>
        <button onClick = {() => open(false) } className="text-white flex justify-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h1 className="font-bold text-yellow-500">Are you sure you want to delete this ?</h1>
   
              </div>
             

          <div className = "footerDeleteFeedback">
            <button onClick = {() => open(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Delete </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default DeleteAdminFeedback;

