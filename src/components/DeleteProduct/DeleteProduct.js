import React, { useState } from 'react';
import axios from 'axios';
import '../AdminFeedback/DeleteFeedback.css';

function DeleteProduct({ openDelete, productId,setProduct }) {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleSubmit = (e) => {
          e.preventDefault();
        axios.delete(`http://localhost:8000/product/${productId}`)
        .then((response) => {
          setProduct((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );          
        }).then(() => {
          openDelete(false);
          setShowSuccessAlert(true);
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 3000);
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
        <h1 className="text-yellow-500 font-bold "> Delete Product: </h1>
        <button onClick = {() => openDelete(false) } className="text-white flex justify-end">  X  </button>
        </div>
        <div className = "titleDeleteFeedback">
        </div>
        <div className = "bodyDeleteFeedback">

                <h1 className="font-bold text-yellow-500 flex justify-start align-start">Are you sure you want to delete this ?</h1>
   
              </div>
             

          <div className = "footerDeleteFeedback">
            <button onClick = {() => openDelete(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Delete </button>

          </div>

      </div>
      {showSuccessAlert && (
          <div className="success-alert bg-blue text-black">
            Product deleted successfully!
          </div>
        )}
      </form>

    </div>
  );
};

export default DeleteProduct;


