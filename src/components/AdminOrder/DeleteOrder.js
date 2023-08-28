import React from 'react';
import axios from 'axios';
import '../AdminFeedback/DeleteFeedback.css';

function DeleteProduct({ openDelete, orderId }) {
    const handleSubmit = (e) => {
        axios.delete(`http://localhost:8000/order/${orderId}`)
        .then((response) => {
          console.log(response.data);    
        }).then(()=>{
          openDelete(false);
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
        <h1 className="text-yellow-500 font-bold "> Delete Order: </h1>
        <button onClick = {() => openDelete(false) } className="text-white flex justify-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h1 className="font-bold text-yellow-500 flex justify-start items-start">Are you sure you want to delete this ?</h1>
   
              </div>
             

          <div className = "footerDeleteFeedback">
            <button onClick = {() => openDelete(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Delete </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default DeleteProduct;


