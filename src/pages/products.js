import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from '../components/Popup/Popup.jsx';
import UpdatePopup from '../components/UpdateProduct/Update.js';
import DeleteProduct from '../components/DeleteProduct/DeleteProduct.js';
import Dashboard from './dashboard.js';
import {  FaPlus, FaEdit, FaTrash,  FaArrowLeft, FaArrowRight, FaSearch  } from 'react-icons/fa/index.esm.js'; 
import './style.css';


function Product() {
  
  const [products, setProducts] = useState([]);
 
  const [show , setShow ] = useState(false);
  const [showUpdate , setShowUpdate ] = useState(false);
  const [showDelete , setShowDelete ] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Store selected product ID
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const productPerPage = 10;

   
  useEffect(() => {
    axios
      .get('http://localhost:8000/product/')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);


  

  
  const filteredProducts = products?.filter((product) => {
    if (!product.name) return false; 
    const searchTermLower = searchTerm.toLowerCase();
    return product.name.toLowerCase().includes(searchTermLower);
  });
   const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredProducts?.length / productPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
   
<div>
{show && <Popup close={setShow} setProducts={setProducts} products={products}/>}
{showUpdate && <UpdatePopup open={setShowUpdate} productId={selectedProductId} setProducts={setProducts} products={products} />}
{showDelete && <DeleteProduct openDelete={setShowDelete} productId={selectedProductId} setProduct={setProducts}/>}

 <div className='flex'>
     <Dashboard/>
     <div className="h-full w-full ml-56 mt-14 mb-10 ">
      <div className="p-6 gap-4">
        <div className = "flex justify-between">
           
             <div className="flex justify-start mb-3">
                            <FaSearch className="search-icon text-zinc-500 ms-4 mt-2" size={25}/>

            <input
                type="text"
                placeholder="Search by name"
                className="ml-4 p-1 rounded border border-gray-300 text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              </div>
               <div className=" flex justify-end mb-3 mr-4">
              <button
                onClick={() => setShow(true)}
                className="bg-yellow-500 flex justify-between items-center text-white font-bold py-2 px-3 hover:bg-yellow-600 rounded"
              >
              <FaPlus className="mr-2"/> Add product 
              </button>
             
            </div> 
              </div>
            
            <table className="table flex items-center justify-center font-bold bg-zinc-800 text-center w-full"
             style={{ backgroundColor: "#555555" , color: "whitesmoke" }}>
            <thead>
              <tr>
                               <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">

                  #</th>
                               <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
Name</th>
                               <th scope="col" className="px-6 py-3 text-left whitespace-nowrap bold font-medium text-white uppercase tracking-wider Border-white border">
Price $</th>
                               <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
Description</th>
                               <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
Category</th>
<th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
Quantity</th>
                               <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
Image</th>
                               <th scope="col" className="px-6 py-3 text-left bold font-medium text-white uppercase tracking-wider Border-white border">
Action</th>
              </tr>
            </thead>
            <tbody>
                {currentProducts?.map((product, index) => (
                  <tr key={product._id}  className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                           <td className="px-6 py-4 whitespace-nowrap border Border-white">
                           {(currentPage - 1) * productPerPage + index + 1}
</td>
                           <td className="px-6 py-4  border Border-white">
{product.name}</td>
                           <td className="px-6 py-4  border Border-white">
{product.price}</td>
                           <td className="px-6 py-4  border Border-white">
{product.description}</td>
                           <td className="px-6 py-4  border Border-white">
{product.cname}</td>
<td className="px-6 py-4  border Border-white">
{product.quantity}</td>
                           <td className="px-6 py-4 text-center flex justify-center items-center  whitespace-nowrap border Border-white">

                      {product.imagePath && (
                        <img
                        src={`/uploads/usersImages/${product.imagePath}`}

                        style={{
                          width: '100px',
                          height: '90px',
                          display: 'block',
                          transition: 'transform 0.3s ease', 
                        }}
                        className="hover:scale-110"                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border Border-white">

                      
                    <div className="flex items-center justify-center space-x-4 m-2">
  <div className="bg-yellow-500 rounded hover:bg-yellow-600">
    <button  className="text-white font-bold py-1 px-2" type="button" onClick={() => {
                            setSelectedProductId(product._id); // Set the selected product ID
                            setShowUpdate(true); // Show the update modal
                          }} ><FaEdit className="w-5 h-5" /></button>
  </div>
  <div className="bg-red-500 rounded hover:bg-red-600">
    <button className="text-white font-bold py-1 px-2" type="button"  
 onClick= {() => { setSelectedProductId(product._id); setShowDelete(true);}}> <FaTrash className="w-5 h-5" /></button>


      
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
                  Page {currentPage} of {Math.ceil(filteredProducts.length / productPerPage)}
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

export default Product;





