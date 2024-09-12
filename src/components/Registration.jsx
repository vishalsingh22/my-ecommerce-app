// src/components/Registration.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Function to generate a unique user ID
const generateUserId = () => `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a unique user ID
    const userId = generateUserId();

    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { id: userId, name, email, password }; // Include userId
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2">Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
          <label className="text-lg font-semibold mb-2">Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
