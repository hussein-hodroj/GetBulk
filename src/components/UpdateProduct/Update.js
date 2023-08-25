import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Update.css';

function Update ({ open, productId }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imagePath, setImagePath] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const {id} = useParams();

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Check if the required fields are filled
    if (!name) newErrors.name = 'Name is required';
    if (!price) newErrors.price = 'Price is required';
    if (!description) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }

  
  useEffect(() => {
    axios
      .get(`http://localhost:8000/product/${productId}`)
      .then(response =>{console.log(response)
        setName(response.data.name)
        setPrice(response.data.price)
        setDescription(response.data.description)
        setImagePath(response.data.imagePath)
        setCategory(response.data.category)
    })
    .catch((error) => console.log(error));
}, [productId]);

 useEffect(() => {
    axios
      .get('http://localhost:8000/category/')
      .then((response) => setCategories(response.data))
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form fields before submitting
    validateForm();

    if (isValid) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category', category);
      if (imagePath) {
        formData.append('imagePath', imagePath);
      }

      axios
      .put(`http://localhost:8000/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      }).then(()=>{
        open(false);
      })
      .catch((error) => {
        console.log('Error while submitting the form:', error);
      });
    
    }
  };
  return (
    <div className = "modalBackground">
          <form onSubmit={(e)=>handleSubmit(e)}>
      <div className= "modalContainer">
        <div className = "titleCloseBtn">
        <button onClick = {() => open(false) } className="text-white">  X  </button>
        </div>
        <div className = "title">
          <h1 className="text-yellow-500 font-bold"> Edit Product: </h1>
        </div>
        <div className = "body">

   <div className="flex justify-between">
        <div className="mb-2">
      <label
              className="block text-yellow-500 text-sm  font-bold mb-2"
              htmlFor="Name"> Name </label>
            <input
              className="shadow w-64 mb-2 border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={name}
              placeholder="Enter product's name" 
              onChange={(e) => setName(e.target.value)}
              /> 
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div className="mb-2">
             <label
              className="block text-yellow-500 text-sm  font-bold mb-2"
              htmlFor="Price">Price </label>
            <input
              className="shadow w-64 mb-2 border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="text"
              name="price"
              value={price}
              placeholder="Enter product's price" 
              onChange={(e) => setPrice(e.target.value)}
              /> 
              {errors.price&& <p className="text-red-500 text-sm">{errors.price}</p>}

              </div>          
              </div>
              <div className="flex justify-between">
              <div className="mb-2">
        <label
              className="block text-yellow-500 text-sm font-bold mb-2"
              htmlFor="category"> Category </label>
            <select
              className="shadow  mb-2 border rounded  py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              name="category"
              value={category}
              placeholder="Enter product's category" 
              onChange={(e) => setCategory(e.target.value)}
              >

                 {categories.map((c) => (
        <option key={c._id} value={c._id}>
          {c.name}
        </option>
      ))}       
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

               </div>       
                <div className="mb-2">
             <label
              className="block text-yellow-500 text-sm font-bold mb-2"
              htmlFor="description"> Description </label>
            <input
              className="shadow w-64 mb-2 border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              name="description"
              value={description}
              placeholder="Enter product's description"
              onChange={(e) => setDescription(e.target.value)}
              />   
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

              </div>        
              </div>
              <div className="mb-2">
          <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="shadow  border w-full rounded py-2 px-3 text-yellow-500 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            onChange={(e) => setImagePath(e.target.files[0])}
          />  
        </div>
              </div>
             
        
          <div className = "footer">
            <button onClick = {() => open(false) } id="cancelBtn"> Cancel </button>
            <button type = "submit"> Save </button>

          </div>

      </div>
      </form>

    </div>
  );
};

export default Update;

