import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header.jsx';


function ResetPassword() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showMessage, setShowMessage] = useState(false); 
  const { userId, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      setMessage('Please enter a new password.');
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
  
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-black p-8 rounded-lg shadow-md w-96">
        <h4 className="text-2xl font-bold text-yellow-500 mb-4">Reset Password</h4>
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
              className="w-full px-3 py-2 rounded border-2 border-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="text-yellow-500 py-2 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ResetPassword;
