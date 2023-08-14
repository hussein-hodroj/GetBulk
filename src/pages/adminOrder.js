import React, { useEffect, useState } from 'react';
import { FaTrash,  FaEdit, FaCheck } from 'react-icons/fa/index.esm.js';
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

   
  useEffect(() => {
    axios
      .get('http://localhost:8000/order/status')
      .then((response) => setOrders(response.data))
      .catch((error) => console.log(error));
  }, []);


  

     const filteredOrders = orders.filter((order) =>
     order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
   );

  return (
   
<div>
{show && <DeleteOrder openDelete={setShow} orderId={selectedOrderId} />}
{orderStatus && <UpdateOrderStatus close={setOrderStatus} orderId={selectedOrderId} />}
{updateOrder && <UpdateOrder closeUpdate = {setUpdateOrder} orderId = {selectedOrderId} />}


 <div className='flex'>
     <Dashboard/>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
        <div className = "flex justify-between">
           
             <div className="flex justify-end mb-3">
            <input
                type="text"
                placeholder="Search by name"
                className="ml-4 p-1 rounded border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <p className="text-white font-bold border rounded py-2 px-2 bg-yellow-600 ms-4">{filteredOrders.length} Orders found</p>
              </div>
              
              </div>
            
            <table className="table flex items-center justify-center font-bold text-center w-full"
             style={{ backgroundColor: "#555555" , color: "whitesmoke" }}>
            <thead>
              <tr>
                <th >Customer Name</th>
                <th >Customer PhoneNumber </th>
                <th >Customer Email</th>
                <th >Customer Address</th>
                <th >Customer Order</th>
                <th >Total Price</th>
                <th >Status</th>
                <th >Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredOrders.map((order, index) => (
                    <tr key={order._id}  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                    <td>{order.customerName}</td>
                    <td>{order.customerPhoneNumber}</td>
                    <td>{order.customerEmail}</td>
                    <td>{order.customerAddress}</td>
                    <td>{order.productName}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>


                    <td>
                      
                    <div className="flex items-center justify-center space-x-4">
                    <div className="bg-yellow-600 rounded">
    <button  className="text-white font-bold py-1 px-2" title="delivered"
 onClick= {() => { setSelectedOrderId(order._id); setOrderStatus(true);}} > <FaCheck /></button>
  </div>

  <div className="bg-yellow-600 rounded">
    <button  className="text-white font-bold py-1 px-2" title="update"
 onClick= {() => { setSelectedOrderId(order._id); setUpdateOrder(true);}} > <FaEdit /></button>
  </div>

  <div className="bg-yellow-600 rounded">
    <button  className="text-white font-bold py-1 px-2"  title="delete"
 onClick= {() => { setSelectedOrderId(order._id); setShow(true);}} > <FaTrash /></button>
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

export default FeedbackAdmin;





