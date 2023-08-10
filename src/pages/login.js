import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

// Validation state variables
const [errors, setErrors] = useState({});
const [isValid, setIsValid] = useState(false);

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Regular expression for password validation (at least 8 characters, 1 number, 1 lowercase, 1 uppercase)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
// Function to validate the form fields
const validateForm = () => {
  const newErrors = {};

  // Check if the required fields are filled
  if (!email.trim()) newErrors.email = 'Email is required';
  if (!password.trim()) newErrors.password = 'Password is required';

  // Check email format using regex
  if (email.trim() && !emailRegex.test(email)) {
    newErrors.email = 'Invalid email format';
  }

  // Check password format using regex
  if (password.trim() && !passwordRegex.test(password)) {
    newErrors.password =
      'At least 8 characters, 1 number, 1 lowercase and 1 uppercase letter';
  }
  // Update the errors state and determine if the form is valid
  setErrors(newErrors);
  setIsValid(Object.keys(newErrors).length === 0);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form fields before submitting
  validateForm();

  if (isValid) {

    axios
      .post('http://localhost:8000/user/login', {email, password})
      .then(result => {
        console.log("result=>",result)
        navigate('/dashboard')
        alert('Login success');
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  };

      return (

        <div className="min-h-screen flex items-center justify-center" 
        style={{
            backgroundImage: 'url(./assets/images/back2.jpg)',
           
        
         }}>
        
   <form className="shadow-md rounded-lg p-8" style={{
    width:"520px", 
    marginLeft:"750px", 
    marginBottom:"150px",
    boxShadow: "0 0 10px rgba(255, 202, 40, 0.5)"
    }} onSubmit={handleSubmit}>
   <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold ml-2 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="john.doe@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
                                {errors.email && <p className="text-red-700 ml-2 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
                                {errors.password && <p className="text-red-700 text-sm">{errors.password}</p>}

          </div>
          <div className="bg-yellow-600 rounded flex items-center justify-center mt-8">
  <button
    className="text-white font-bold py-2 px-4  w-full shadow-outline"
    type="submit"
  >
    Login
  </button>
</div>
<div className="text-center mt-4">
          <Link to="/forgettpassword" className="text-zinc-800 font-bold  underline">
            Forgot Password?
          </Link>
        </div>
          </form>
   </div>
      );

}
export default Login; 
