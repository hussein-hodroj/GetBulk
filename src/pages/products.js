import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../components/Popup/Popup.js';
import UpdatePopup from '../components/UpdateProduct/Update.js';
import Dashboard from './dashboard.js';

function Product() {
  
  const [products, setProducts] = useState([]);
 
  const [show , setShow ] = useState(false);
  const [showUpdate , setShowUpdate ] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Store selected product ID
  const [searchTerm, setSearchTerm] = useState('');

   
  useEffect(() => {
    axios
      .get('http://localhost:8000/product/')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);


  const deleteProduct= (id) => {
    axios.delete(`http://localhost:8000/product/${id}`)
    .then((response) => {
      console.log(response.data);
      window.location.reload();

    })
    .catch((error) => {
      console.log('Error while deleting the product:', error);
    });
     }; 

     const filteredProducts = products.filter((product) =>
     product.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

  return (
   
<div>
{show && <Popup close={setShow} />}
{showUpdate && <UpdatePopup open={setShowUpdate} productId={selectedProductId} />}

 <div className='flex'>
     <Dashboard/>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
            <div className=" flex justify-end  ">
              <button
                onClick={() => setShow(true)}
                className="bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              >
                Add product
              </button>
             
            </div> 
             <div className="flex justify-start mb-4 ">
            <input
                type="text"
                placeholder="Search by name"
                className="ml-4 p-1 rounded border border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <p className="text-black ms-4 mb-2">{filteredProducts.length} products found</p>
              </div>
            
            <table className="table flex items-center justify-center font-bold bg-zinc-800 text-white text-center w-full">
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
                {filteredProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.cname}</td>
                    <td>
                      {product.imagePath && (
                        <img
                        src={`/uploads/usersImages/${product.imagePath}`}

                          style={{ width: '100px', height: 'auto' }}
                        />
                      )}
                    </td>
                    <td>
                      
                    <div className="flex items-center justify-center space-x-4">
  <div className="bg-yellow-500 rounded">
    <button  className="text-white font-bold py-1 px-2" type="button" onClick={() => {
                            setSelectedProductId(product._id); // Set the selected product ID
                            setShowUpdate(true); // Show the update modal
                          }} >Edit</button>
  </div>
  <div className="bg-yellow-500 rounded">
    <button  className="text-white font-bold py-1 px-2" type="button"  
 onClick= {() => deleteProduct(product._id)} > Delete</button>


      
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





