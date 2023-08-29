import React, { useEffect, useState } from 'react';
import {FaSearch, FaTrash,  FaEdit, FaCheck, FaArrowLeft, FaArrowRight } from 'react-icons/fa/index.esm.js';
import DeleteOrder from '../components/AdminOrder/DeleteOrder.js';
import UpdateOrderStatus from '../components/AdminOrder/UpdateOrderStatus.js';
import UpdateOrder from '../components/AdminOrder/UpdateOrder.js';
import axios from 'axios';
import Dashboard from './dashboard.js';
import './style.css'

function FeedbackAdmin() {
  
  const [orders, setOrders] = useState([]);
  const [show , setShow ] = useState(false);
  const [orderStatus, setOrderStatus] = useState(false);
  const [updateOrder, setUpdateOrder] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
   
  useEffect(() => {
    axios
      .get('http://localhost:8000/order/status')
      .then((response) => setOrders(response.data))
      .catch((error) => console.log(error));
  }, []);


  

  const filteredOrders = orders.filter((order) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      (order.customerName && order.customerName.toLowerCase().includes(searchTermLower)) 
      
    );
  });

    const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);


  return (
   
<div>
{show && <DeleteOrder openDelete={setShow} orderId={selectedOrderId}  setOrders={setOrders}/>}
{orderStatus && <UpdateOrderStatus close={setOrderStatus} orderId={selectedOrderId} setOrders={setOrders} />}
{updateOrder && <UpdateOrder closeUpdate = {setUpdateOrder} orderId = {selectedOrderId} setOrders={setOrders}/>}


 <div className='flex'>
     <Dashboard/>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
        <div className = "flex justify-between">
           
             <div className="flex justify-end mb-3">
               <FaSearch className="search-icon text-zinc-500 ms-4 mt-1" size={25}/>

            <input
                type="text"
                placeholder="Search by name"
                className="ml-4 p-1 rounded border border-gray-300 text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
              
              </div>
            
            <table className="table flex items-center justify-center font-bold text-center w-full"
             style={{ backgroundColor: "#555555" , color: "whitesmoke" }}>
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
#</th>
                                               <th scope="col" >
Customer Name</th>
                                               <th scope="col" >
Customer PhoneNumber </th>
                                               <th scope="col" >
Customer Email</th>
                                               <th scope="col" >
Customer Address</th>
                                               <th scope="col" >
Customer Order</th>
                                               <th scope="col" >
Total Price</th>
                                               <th scope="col" >
Status</th>
                                               <th scope="col" >
Action</th>
              </tr>
            </thead>
            <tbody>
            {currentOrders.map((order, index) => (
                    <tr key={order._id}  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                                              <td className="px-6 py-4 whitespace-nowrap border Border-white">
                                              {(currentPage - 1) * ordersPerPage + index + 1}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{order.customerName}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{order.customerPhoneNumber}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{order.customerEmail}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{order.customerAddress}</td>
                                               <td className="px-6 py-4  whitespace-nowrap border Border-white">
{order.productName}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{order.total}</td>
                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">
{order.status}</td>


                                               <td className="px-6 py-4 whitespace-nowrap border Border-white">

                      
                    <div className="flex items-center justify-center space-x-4">
                    <div className="bg-yellow-500 rounded hover:bg-yellow-600">
    <button  className="text-white font-bold py-1 px-2" title="delivered"
 onClick= {() => { setSelectedOrderId(order._id); setOrderStatus(true);}} > <FaCheck /></button>
  </div>

  <div className="bg-yellow-500 rounded hover:bg-yellow-600">
    <button  className="text-white font-bold py-1 px-2" title="update"
 onClick= {() => { setSelectedOrderId(order._id); setUpdateOrder(true);}} > <FaEdit /></button>
  </div>

  <div className="bg-red-500 rounded hover:bg-red-600">
    <button  className="text-white font-bold py-1 px-2"  title="delete"
 onClick= {() => { setSelectedOrderId(order._id); setShow(true);}} > <FaTrash /></button>
  </div>

  

</div>

                     </td>
                  </tr>
                ))}
              </tbody>
          </table>
          <div className='flex justify-center mt-4'>
              <div className='flex items-center ml-auto'>
                <button
                  className='px-4 py-2 bg-yellow-500 text-white rounded-l-lg hover:bg-yellow-600'
                  onClick={handlePreviousPage}
                >
                  <FaArrowLeft />
                </button>
                <p className='text-md text-yellow-500 ml-4 mr-4'>
                  Page {currentPage} of {Math.ceil(filteredOrders.length / ordersPerPage)}
                </p>
                <button
                  className='px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600'
                  onClick={handleNextPage}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
       </div>
    
    

      
      );
}

export default FeedbackAdmin;





