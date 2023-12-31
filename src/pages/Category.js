import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateCategory from '../components/CategorgModel/UpdateCategory.js';
import DeleteCategory from '../components/CategorgModel/DeleteCategory.js';
import AddCategoryModal from '../components/CategorgModel/AddCategoryModal.js';
import Dashboard from './dashboard.js';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa/index.esm.js';
import './style.css'; // Make sure to import your CSS file

function Category() {
  const [categories, setCategories] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get('http://localhost:8000/category')
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  };

  const filteredCategories = categories.filter((category) =>
    category.name && category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteCategory = (deletedCategoryId) => {
    setCategories(categories.filter(category => category._id !== deletedCategoryId));
    setShowDelete(false);
  };

  const handleUpdateCategory = () => {
    fetchCategories();
    setShowUpdate(false);
  };

  const handleAddCategory = () => {
    fetchCategories();
    setShowPopup(false);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  return (
    <div>
      {showUpdate && (
        <UpdateCategory
          open={() => setShowUpdate(false)}
          categoryId={selectedCategoryId}
          onUpdate={handleUpdateCategory}
        />
      )}
      {showDelete && (
        <DeleteCategory
          openDelete={() => setShowDelete(false)}
          categoryId={selectedCategoryId}
          onDelete={handleDeleteCategory}
        />
      )}

      <div className='flex'>
        <Dashboard />
        <div className='h-full w-full ml-56 mt-14 mb-10'>
          <div className='p-6 gap-4'>
            <div className='flex justify-between'>
              <div className='flex justify-start mb-3'>
                <FaSearch className='search-icon text-zinc-500 ms-4 mt-2' size={25} />
                <input
                  type='text'
                  placeholder='Search by name'
                  className='ml-4 p-1 rounded border text-black border-gray-300'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='flex justify-end mb-3 mr-4'>
                <button
                  onClick={() => setShowPopup(true)}
                  className='flex justify-between items-center px-4 py-2 bg-yellow-500 text-white font-bold  rounded hover:bg-yellow-400 hover:scale-105'
                >
                  <FaPlus />Add category
                </button>
              </div>
            </div>

            <table
              className="table flex items-center justify-center font-bold bg-zinc-700 text-center w-full"
              style={{
                backgroundColor: "#555555", // Use the color value from Product component
                color: "whitesmoke", // Use the color value from Product component
                fontSize: "16px", // Use the font size value from Product component
              }}
            >
              <thead>
                <tr>
                  <th className='px-6 py-3 '>#</th>
                  <th className='px-6 py-3 '>Name</th>
                  <th className='px-6 py-3 '>Image</th>
                  <th className='px-6 py-3 '>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.map((category, index) => (
                  <tr
                    key={category._id}
                    className={
                      index % 2 === 0 ? 'table-row-even' : 'table-row-odd'
                    }
                  >
                    <td className='px-1.5 py-1'>{index + 1}</td>
                    <td>{category.name}</td>
                    <td className="flex items-center justify-center px-6 py-4">
                      {category.categoryimage &&( 
                      <img src={`/uploads/usersImages/${category.categoryimage}`} alt={category.name} className="w-16 h-16 object-cover hover:scale-110" />
                      )}
                    </td>
                    <td>
                      <div className='flex items-center justify-center space-x-4'>
                        <div className='bg-yellow-500 rounded'>
                          <button
                            className=' hover:bg-yellow-600 transition py-1 px-2 hover:scale-105 rounded'
                            type='button'
                            onClick={() => {
                              setSelectedCategoryId(category._id);
                              setShowUpdate(true);
                            }}
                          >
                            <FaEdit className="w-5 h-5 " />
                          </button>
                        </div>
                        <div className='bg-red-600 rounded'>
                          <button
                            className='hover:bg-red-800 transition py-1 px-2 hover:scale-105 rounded'
                            type='button'
                            onClick={() => {
                              setSelectedCategoryId(category._id);
                              setShowDelete(true);
                            }}
                          >
                            <FaTrash className="w-5 h-5 " />
                          </button>
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
                  className='px-4 py-2 bg-yellow-500 text-white rounded-l-lg hover:bg-yellow-600 hover:scale-105'
                  onClick={handlePreviousPage}
                >
                  <FaArrowLeft />
                </button>
                <p className='text-md text-yellow-500 ml-4 mr-4'>
                  Page {currentPage} of {Math.ceil(filteredCategories.length / categoriesPerPage)}
                </p>
                <button
                  className='px-4 py-2 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 hover:scale-105'
                  onClick={handleNextPage}
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryModal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}

export default Category;
