import React from 'react';
import Dashboard from './UserDashboard.js';
import { images } from '../constants/index.js';

const UserDash = () => {
  return (
    <div>
        <div className="flex ">
        <Dashboard />
        <div className="h-full w-full ml-56 mt-20 mb-5 ">
          <div className="p-3 flex-auto pr-20 pt-8">
            <div className="flex justify-end mb-2 ">
            </div>
      
              <div className="flex-1 flex items-center justify-center">
                    <img
                      className="w-80  pt-16 mx-auto pr-1"
                      src={images.Logo} 
                      alt="logo"
                    />
                </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDash;
