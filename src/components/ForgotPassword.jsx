// src/components/ForgotPassword.jsx
import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Fetch users from localStorage
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      // Find user with matching email
      const userIndex = storedUsers.findIndex(user => user.email === email);

      if (userIndex === -1) {
        throw new Error('Email not found.');
      }

      // Update password for the user
      storedUsers[userIndex].password = newPassword;

      // Save updated users to localStorage
      localStorage.setItem('users', JSON.stringify(storedUsers));

      setMessage('Password has been reset successfully.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">New Password:</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Reset Password'}
        </button>
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
