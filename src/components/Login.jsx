// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoggedInUser, loadCart } from '../redux/actions/userActions'; // Import your actions

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Find user with matching email and password
    const user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
      // Save the logged-in user's data in localStorage
      localStorage.setItem('loggedIn', JSON.stringify(true));
      localStorage.setItem('user', JSON.stringify(user)); // Save user data for the session

      // Load cart data from localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      dispatch(setLoggedInUser(user));
      dispatch(loadCart(cart)); // Dispatch action to initialize cart

      navigate('/'); // Redirect to home page after login
    } else {
      console.error('Login failed: Invalid email or password');
      alert('Login failed: Invalid email or password');
    }
  };

  return (
    <div className="login container mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md max-w-sm">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
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
          Login
        </button>
        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
