import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header.jsx';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [showMessage, setShowMessage] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email.');
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    axios.post('http://localhost:8000/forgot-password', { email })
      .then(res => {
        if (res.data.message === 'Reset password email sent successfully') {
          setMessage('Password reset email sent successfully. Please check your email.');
          setMessageType('success');
          setEmail('');
        } else if (res.data.message === 'User not found') {
          setMessage('User not found. Please check the entered email.');
          setMessageType('error');
        }
        setShowMessage(true);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setMessage('User not found. Please check the entered email.');
          setMessageType('error');
          setShowMessage(true);
        }
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <div>
      <Header/>
   
      <div
      className="flex items-center justify-center h-screen bg-black"
      style={{
        backgroundImage: "url('./assets/images/login4.jpg')",
        backgroundSize: 'cover',
      }}
    >
      <div className="bg-transparent p-8 m-8 rounded-lg shadow-md w-96 transition-transform duration-200 transform hover:scale-105 hover:shadow-lg ">
        <h2 className="text-3xl font-bold text-yellow-500 mb-8">Forgot Password?</h2>
        <p className='text-orange-300 mb-8'>Don't worry. Resetting your password is easy, just tell us the email address you registered with GetBulk.</p>
        {showMessage && (
          <p className={`mb-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-yellow-500 font-semibold mb-2 mt-2">
              
            </label>
            <input
              type="email"
              placeholder="Email Address"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 rounded border-2 border-black-500 focus:outline-none focus:border-yellow-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-6 rounded transition duration-200 
                       bg-yellow-500 text-black hover:bg-yellow-600 "
          >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
