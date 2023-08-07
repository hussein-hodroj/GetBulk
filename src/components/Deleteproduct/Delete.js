import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Delete.css';

function Delete ({ open }) {
 

  return (
    <div className = "modalBackground">
          {/* <form  onSubmit={handleSubmit}> */}
      <div className= "modalContainer">
        <div className = "titleCloseBtn">
        <button onClick = {() => open(false) } className="text-white">  X  </button>
        </div>
        <div className = "title">
          <h1 className="text-yellow-500 font-bold"> Delete Product</h1>
        </div>
        <div className = "body">
                <h1 className="text-yellow-500 font-bold" > Are you sure you want to delete this product ?</h1>
            </div>
        
          <div className = "footer">
            <button onClick = {() => open(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Delete </button>

          </div>

      </div>
      {/* </form> */}

    </div>
  );
};

export default Delete;

