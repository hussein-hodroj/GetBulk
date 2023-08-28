import React from 'react';
import axios from 'axios';
import '../AdminFeedback/DeleteFeedback.css';

function UpdateStatus({ close, orderId }) {
    const handleSubmit = (e) => {
        axios.put(`http://localhost:8000/order/status/${orderId}`)
        .then((response) => {
          console.log(response.data);    
        }).then(()=>{
          close(false)
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
        <h1 className="text-yellow-500 font-bold "> Update Order Status: </h1>
        <button onClick = {() => close(false) } className="text-white flex justify-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h1 className="font-bold text-yellow-500 flex justify-start items-start">Are you sure that this order has been delivered ?</h1>
   
              </div>
             

          <div className = "footerDeleteFeedback">
            <button onClick = {() => close(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Save </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default UpdateStatus;


