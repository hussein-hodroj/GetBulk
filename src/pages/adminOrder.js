import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from './dashboard.js';
import './style.css'

function FeedbackAdmin() {
  
  const [orders, setOrders] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

   
  useEffect(() => {
    axios
      .get('http://localhost:8000/order/')
      .then((response) => setOrders(response.data))
      .catch((error) => console.log(error));
  }, []);


  const deleteOrder= (id) => {
    axios.delete(`http://localhost:8000/order/${id}`)
    .then((response) => {
      console.log(response.data);
      window.location.reload();

    })
    .catch((error) => {
      console.log('Error while deleting the order:', error);
    });
     }; 

     const filteredOrders = orders.filter((order) =>
     order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
   );

  return (
   
<div>

 <div className='flex'>
     <Dashboard/>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
        <div className = "flex justify-between">
           
             <div className="flex justify-start mb-3">
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
                <th className="text-white">Customer Name</th>
                <th className="text-white">Customer PhoneNumber </th>
                <th className="text-white">Customer Email</th>
                <th className="text-white">Customer Address</th>
                <th className="text-white">Customer Order</th>
                <th className="text-white">Total Price</th>
                <th className="text-white">Status</th>
                <th className="text-white">Action</th>
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
    <button  className="text-white font-bold py-1 px-2" type="button"  
 onClick= {() => deleteOrder(order._id)} > Delete</button>


      
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





