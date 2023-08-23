import React, { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Dashboard from './dashboard.js';

function EditPassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      setAlertType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[A-Z]/.test(newPassword) || !/[a-z]/.test(newPassword)) {
      setMessage("New password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one digit");
      setAlertType('error');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/editPassword', {
        userId,
        oldPassword,
        newPassword,
      });

      setMessage(response.data);
      setAlertType('success');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Old password is incorrect');
      setAlertType('error');
      setTimeout(() => setMessage(''), 4000);
      console.error('Old password is incorrect:', error);
    }
  };
  return (
    <div className='flex'>
      <Dashboard />
      <div className="h-full w-full ml-56 mt-20 mb-5">
        <div className="p-3 flex-auto pr-20 pt-8">
          <form onSubmit={handleSubmit} className="bg-zinc-600 p-5 rounded shadow-md">
            <div className="mb-4">
              <label htmlFor="oldPassword" className="block text-white font-semibold mb-4">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-white font-semibold mb-4">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-white font-semibold mb-4">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 hover:text-black text-white font-semibold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Update Password
              </button>
            </div>
            {message && (
              <p className={`text-${alertType === 'error' ? 'red' : 'green'}-500 font-bold mt-3`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPassword;
