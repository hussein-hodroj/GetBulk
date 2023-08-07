import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../components/Popup/Popup.js';
import Delete from '../components/Deleteproduct/Delete.js';
import Dashboard from './dashboard.js';
function Product() {
  
  const [products, setProducts] = useState([]);
 
  const [show , setShow ] = useState(false);

  const [deleteShow, setDeleteShow ] = useState(false);

  
  useEffect(() => {
    axios
      .get('http://localhost:8000/product/')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  
  return (
   
<div>
{show && <Popup close={setShow} />}
{deleteShow && <Delete open={setDeleteShow} />}

 <div className='flex'>
     <Dashboard/>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
            <div className="flex justify-end mb-4 ml-240">
              <button
                onClick={() => setShow(true)}
                className="bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              >
                Add product
              </button>
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
                {products.map((product) => (
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
    <button  className="text-white font-bold py-1 px-2" type="submit">Edit</button>
  </div>
  <div className="bg-yellow-500 rounded">
    <button  className="text-white font-bold py-1 px-2" type="submit" onClick={() => setDeleteShow(true)} >Delete</button>
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





