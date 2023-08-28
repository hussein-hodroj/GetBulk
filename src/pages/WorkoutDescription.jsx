import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import UserDashboard from './UserDashboard.js';

function WorkoutDescription() {
  const [trainerInfo, setTrainerInfo] = useState({});
  const { trainerId } = useParams();
  const [workouts, setWorkouts] = useState([]);
  const { workoutId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // You can adjust this value as needed

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/trainers/${trainerId}`)
      .then((response) => setTrainerInfo(response.data))
      .catch((error) => console.log(error));
  }, [trainerId]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/workout/${workoutId}/getByid`)
      .then((response) => setWorkouts(response.data))
      .catch((error) => console.log(error));
  }, [workoutId]);

  // Calculate the indexes of items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = workouts?.imageworkout?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-center items-center bg-black">
        <UserDashboard />
        <div className="h-full w-full mt-14 mb-10 bg-black ">
          <div className="p-6 gap-4">
            <div className="desc-container bg-black border border-yellow-500 shadow-yellow-500">
              <div className="trainer-info">
              <div className="flex justify-evenly items-center">
                  {trainerInfo.imagePath && (
                    <img
                      src={`/uploads/usersImages/${trainerInfo.imagePath}`}
                      alt="Trainer"
                      style={{ width: '460px', height: '380px' }}
                      className="border border-yellow-500 rounded"
                    />
                  )}
                  <div className="info-container ml-4">
                  <p className="text-2xl font-bold mb-2">
  <span className="text-yellow-500">Name:</span> <span className="text-white">{trainerInfo.fullname}</span>
</p>
                    <p className="text-2xl font-bold mb-2">
                    <span className="text-yellow-500">Email:</span> <span className="text-white">{trainerInfo.email}</span></p>
                    <p className="text-2xl font-bold mb-2">
                    <span className="text-yellow-500"> Phone Number:</span><span className="text-white">{trainerInfo.phonenumber}</span>
                    </p>
                    <p className="text-2xl font-bold mb-2">
                    <span className="text-yellow-500"> Address:</span> <span className="text-white">{trainerInfo.address}</span>
                    </p>
                  </div>
                </div>
              </div>
             
              <div className="table-container mt-12">
               <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full">
                  <thead>
                    <tr>
                      <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider border">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider border">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3 text-center bold font-medium text-white uppercase tracking-wider border">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
            {currentItems?.map((image, index) => (
              <tr key={index} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                <td className="px-6 py-4 text-center whitespace-nowrap border border-white">
                  {index + 1 + indexOfFirstItem}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap border border-white">
                  {/* Center the image using flexbox */}
                  <div className="flex justify-center">
                    <img
                      src={`/uploads/usersImages/${image}`}
                      style={{ width: '200px', height: '180px' }}
                      className="border border-yellow-500 rounded"
                      alt={`Workout Image ${index}`}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap border border-white">
                  {workouts?.descriptionworkout?.[index + indexOfFirstItem] && (
                    <p className="text-white">{workouts.descriptionworkout[index + indexOfFirstItem]}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pagination flex justify-between">
          <div className="back mt-4 button ">
          <Link to={`/workoutselection/${trainerId}`}>
          <button
            type="button"
            className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 mt-2 mb-2 font-bold"
          >
            Back
          </button>
          </Link>
          </div>
          {workouts?.imageworkout && (
            <ul className="pages flex mt-4 ">
              {Array.from({ length: Math.ceil(workouts.imageworkout.length / itemsPerPage) }).map((_, index) => (
                <li key={index} className="px-3 py-2 m-1 bg-yellow-600 cursor-pointer rounded hover:bg-yellow-500" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </li>
              ))}
            </ul>
          )}
        </div>
              </div>
            </div>
              </div>
              </div>
    </div>
    </div>
  );
}

export default WorkoutDescription;
