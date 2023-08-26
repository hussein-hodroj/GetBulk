import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.jsx';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false); 
  const { userId, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage('Please enter both new password and confirm password.');
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match. Please make sure both passwords match.');
      setMessageType('error');
      setShowMessage(true);
      return;
    }

    axios.post(`http://localhost:8000/reset-password/${userId}/${token}`, { password })
      .then(res => {
        if (res.data.message === 'Password reset successful') {
          setMessage('Password updated successfully. You can now login with your new password.');
          setMessageType('success');
          setPassword('');
          setConfirmPassword('');

          setTimeout(() => {
            navigate('/login'); 
          }, 3000);
        } else {
          setMessage('Error updating password. Please try again.');
          setMessageType('error');
        }
        setShowMessage(true);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setMessage('Invalid or expired reset token. Please request a new password reset.');
          setMessageType('error');
        } else {
          setMessage('Error updating password. Please try again.');
          setMessageType('error');
        }
        setShowMessage(true);
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
      <div className="bg-transparent p-8 rounded-lg shadow-md w-96 transform transition-transform duration-200 border border-yellow-400 hover:shadow-lg">
        <h4 className="text-3xl font-bold text-yellow-500 mb-8">Reset Password</h4>
        {showMessage && (
          <p className={`mb-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-yellow-500 font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              autoComplete="off"
              name="password"
              className="w-full px-3 py-2 rounded border-2 border-black-500 focus:outline-none focus:border-yellow-300 hover:scale-105"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-yellow-500 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              autoComplete="off"
              name="confirmPassword"
              className="w-full px-3 py-2 rounded border-2 border-black-500 focus:outline-none focus:border-yellow-300 hover:scale-105"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="py-2 px-6 rounded transition duration-200 
                       bg-yellow-500 text-black hover:bg-yellow-600 hover:scale-105"
          >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ResetPassword;
