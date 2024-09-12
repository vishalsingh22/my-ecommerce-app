import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all products from API
    axios.get('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (userId && product && product.id) {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      if (!cart[userId]) {
        cart[userId] = { items: [] };
      }

      const existingItemIndex = cart[userId].items.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        cart[userId].items[existingItemIndex].quantity = (cart[userId].items[existingItemIndex].quantity || 1) + 1;
      } else {
        cart[userId].items.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(addToCart(userId, product));

      alert('Item added to cart successfully!');
    } else if (!userId) {
      alert('Please log in to add items to the cart.');
    } else {
      console.error('Invalid product:', product);
      alert('An error occurred while adding the product to the cart.');
    }
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  const visibleProducts = showAll ? products : products.slice(0, 8); // Show 2 rows (8 products) initially

  return (
    <div className="container mx-auto my-8 p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
      <p className="text-lg mb-6">Discover all of our products below.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleProducts.map(product => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">{truncateDescription(product.description)}</p>
              <p className="text-lg font-bold mb-4">${product.price}</p>
              <div className="flex justify-between">
                <Link 
                  to={`/product/${product.id}`} 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)} // Add to cart functionality
                  className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length > 8 && !showAll && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            See All Products
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
