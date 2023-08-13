import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../components/Popup/Popup.js';
import UpdatePopup from '../components/UpdateProduct/Update.js';
import DeleteProduct from '../components/DeleteProduct/DeleteProduct.js';
import Dashboard from './dashboard.js';
import { FaEdit, FaTrash } from 'react-icons/fa/index.esm.js'; 
import './style.css';


function Product() {
  
  const [products, setProducts] = useState([]);
 
  const [show , setShow ] = useState(false);
  const [showUpdate , setShowUpdate ] = useState(false);
  const [showDelete , setShowDelete ] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Store selected product ID
  const [searchTerm, setSearchTerm] = useState('');

   
  useEffect(() => {
    axios
      .get('http://localhost:8000/product/')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);


  

     const filteredProducts = products.filter((product) =>
     product.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

  return (
   
<div>
{show && <Popup close={setShow} />}
{showUpdate && <UpdatePopup open={setShowUpdate} productId={selectedProductId} />}
{showDelete && <DeleteProduct openDelete={setShowDelete} productId={selectedProductId} />}

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
              <p className="text-white font-bold border rounded py-2 px-2 bg-yellow-500 ms-4">{filteredProducts.length} products found</p>
              </div>
               <div className=" flex justify-end mb-3 mr-4">
              <button
                onClick={() => setShow(true)}
                className="bg-yellow-500 text-white font-bold py-2 px-3  rounded"
              >
                Add product
              </button>
             
            </div> 
              </div>
            
            <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full"
             style={{ backgroundColor: "#555555" , color: "whitesmoke" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product._id}  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.cname}</td>
                    <td>
                      {product.imagePath && (
                        <img
                        src={`/uploads/usersImages/${product.imagePath}`}

                          style={{ width: '100px', height: '90px',display: 'block', margin: '0 auto'}}
                        />
                      )}
                    </td>
                    <td>
                      
                    <div className="flex items-center justify-center space-x-4">
  <div className="bg-yellow-500 rounded">
    <button  className="text-white font-bold py-1 px-2" type="button" onClick={() => {
                            setSelectedProductId(product._id); // Set the selected product ID
                            setShowUpdate(true); // Show the update modal
                          }} ><FaEdit className="w-5 h-5" /></button>
  </div>
  <div className="bg-yellow-500 rounded">
    <button className="text-white font-bold py-1 px-2" type="button"  
 onClick= {() => { setSelectedProductId(product._id); setShowDelete(true);}}> <FaTrash className="w-5 h-5" /></button>


      
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

export default Product;





