import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.jsx';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

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
   
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-black p-8 m-8 rounded-lg shadow-md w-96">
        <h4 className="text-2xl font-bold text-yellow-500 mb-4">Forgot Password</h4>
        {showMessage && (
          <p className={`mb-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-yellow-500 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 rounded border-2 border-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="text-yellow-500 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ForgotPassword;
