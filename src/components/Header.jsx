// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../redux/actions/userActions'; // Import the action

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user); // Get user from Redux store

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    dispatch({ type: LOGOUT_USER }); // Dispatch logout action
    navigate('/login'); // Redirect to login page
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="mr-4">Home</Link>
          {user && <Link to="/cart" className="mr-4">Cart</Link>}
        </div>

        <div>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name}</span>
              <Link to="/profile" className="mr-4">Profile</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
