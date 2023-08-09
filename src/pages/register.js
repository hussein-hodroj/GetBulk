import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [imagePath, setImagePath] = useState(null); // Use null as the initial state for the image
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
  if (!fullname.trim()) newErrors.fullname = 'Full name is required';
  if (!email.trim()) newErrors.email = 'Email is required';
  if (!password.trim()) newErrors.password = 'Password is required';
  if (!address.trim()) newErrors.address = 'Address is required';
  if (!phonenumber.trim()) newErrors.phonenumber = 'Phone number is required';
  if (!age.trim()) newErrors.age = 'Age is required';
  if (!role) newErrors.role = 'Role is required';

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
    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('phonenumber', phonenumber);
    formData.append('age', age);
    formData.append('role', role);
    formData.append('imagePath', imagePath);

    axios
      .post('http://localhost:8000/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        // {onClose}
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
     <div className=" shadow-md rounded-lg p-8">
  <img
    src="./assets/images/register.jpg"
    alt="register"
    style={{
      width: "560px",
      height: "470px",
      borderRadius: "15px 15px 15px 15px",
    }}
  />
</div>
      <form className="bg-black shadow-md rounded-lg p-8" style={{width:"520px"}} onSubmit={handleSubmit}>
        <div className="flex justify-evenly">
          <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              name="fullName"
              value={fullname}
              placeholder="John Doe"
              onChange={(e) => setFullname(e.target.value)}
            />
                     {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}

          </div>
          <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold ml-2 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="john.doe@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
                    {errors.email && <p className="text-red-500 ml-2 text-sm">{errors.email}</p>}
          </div>
          </div>
          <div className="flex justify-evenly">
          <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          </div>
          <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold ml-2 mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              name="address"
              value={address}
              placeholder="123 Main St, City, Country"
              onChange={(e) => setAddress(e.target.value)}
            />
                    {errors.address && <p className="text-red-500 ml-2 text-sm">{errors.address}</p>}

          </div>
          </div>
          <div className="flex justify-evenly">

          <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold mb-2"
              htmlFor="phonenumber"
            >
              PhoneNumber
            </label>
            <input
              className="shadow appearance-none border rounded w-full mr-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="PhoneNumber"
              type="text"
              name="PhoneNumber"
              value={phonenumber}
              placeholder="+96181622175"
              onChange={(e) => setPhonenumber(e.target.value)}
            />
                    {errors.phonenumber && <p className="text-red-500 text-sm">{errors.phonenumber}</p>}

          </div>
          <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold ml-2 mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full ml-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              name="age"
              value={age}
              placeholder="30"
              onChange={(e) => setAge(e.target.value)}
            />
                    {errors.age && <p className="text-red-500 ml-2 text-sm">{errors.age}</p>}

          </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-yellow-500 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
            <option value="" disabled selected > Please Select Your Role </option>    
            <option value="user">User</option>         
            <option value="trainer">Trainer</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          </div>
          <div className="mb-4">
          <label className="block text-yellow-500 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-yellow-500 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            name="image"
            onChange={(e) => setImagePath(e.target.files[0])}
          />
        </div>

        <div className="bg-yellow-600 rounded flex items-center justify-center mt-8">
  <button
    className="text-white font-bold py-2 px-4  w-full shadow-outline"
    type="submit"
  >
    Register
  </button>
</div>
<p className="text-center text-yellow-500 mt-4">
  Already have an account?{' '}
  <Link to="/login" className="text-yellow-500 font-bold underline">
    Login here
  </Link>
</p>
      </form>
    </div>
  );
}

export default Register;