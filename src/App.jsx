import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import CartList from './components/CartList';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import Registration from './components/Registration';
import Header from './components/Header';
import HomePage from './components/HomePage'; // Import the HomePage component

function App() {
  // Manage the logged-in user state
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Load the logged-in user from localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  return (
    <Router>
      {/* Pass the logged-in user to the Header */}
      <Header user={loggedInUser} />
      <div className="container mx-auto px-4">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<HomePage />} />

          {/* Product related routes */}
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartList />} />

          {/* Authentication related routes */}
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile user={loggedInUser} />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
