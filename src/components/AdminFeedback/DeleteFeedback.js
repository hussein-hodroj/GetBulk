import React from 'react';
import axios from 'axios';
import './DeleteFeedback.css';

function DeleteAdminFeedback({ open, feedbackId , setFeedbacks}) {
    const handleSubmit = (e) => {
            e.preventDefault();

        axios.delete(`http://localhost:8000/feedback/delete/${feedbackId}`)
        .then((response) => {
          setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.filter((feedback) => feedback._id !== feedbackId)
        );        
        }).then(()=>{
          open(false);
        })
        .catch((error) => {
          console.log('Error while deleting the feedback:', error);
        });
         };
        

  return (
    <div className = "modalBackgroundDeleteFeedback">
          <form onSubmit={(e)=>handleSubmit(e)}>
      <div className= "modalContainerDeleteFeedback">
        <div className = "CloseBtnDeleteFeedback  flex justify-between">
        <h1 className="text-yellow-500 font-bold "> Delete Feedback: </h1>
        <button onClick = {() => open(false) } className="text-white flex justify-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h1 className="font-bold text-yellow-500 flex justify-start items-start">Are you sure you want to delete this ?</h1>
   
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

