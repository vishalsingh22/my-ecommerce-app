// // src/components/ProductList.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/actions/cartActions';
// import { Link } from 'react-router-dom';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     axios.get('https://fakestoreapi.com/products')
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleAddToCart = (product) => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const userId = user?.id || 'defaultUserId'; // Retrieve user ID from localStorage
//     if (userId) {
//       dispatch(addToCart(userId, product));
//       // Update cart data in localStorage
//       const cart = JSON.parse(localStorage.getItem('cart')) || {};
//       if (!cart[userId]) {
//         cart[userId] = { items: [] };
//       }
//       cart[userId].items.push(product);
//       localStorage.setItem('cart', JSON.stringify(cart));
//     } else {
//       console.error('No user logged in.');
//       alert('Please log in to add items to the cart.');
//     }
//   };

//   return (
//     <div className="container mx-auto my-8 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-48 object-cover"
//           />
//           <div className="p-4">
//             <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
//             <p className="text-xl font-bold text-gray-700 mb-4">${product.price}</p>
//             <button
//               onClick={() => handleAddToCart(product)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
//             >
//               Add to Cart
//             </button>
//             <Link
//               to={`/product/${product.id}`}
//               className="text-blue-600 hover:underline block mt-2"
//             >
//               View Details
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;

// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all products from API
    axios.get('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    // Retrieve user data fresh from localStorage to ensure it's up to date
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id;

    if (userId && product && product.id) {
      // Retrieve and update cart data in localStorage
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      if (!cart[userId]) {
        cart[userId] = { items: [] };
      }

      const existingItemIndex = cart[userId].items.findIndex(item => item.id === product.id);

      if (existingItemIndex >= 0) {
        // Update quantity if item already in cart
        cart[userId].items[existingItemIndex].quantity = (cart[userId].items[existingItemIndex].quantity || 1) + 1;
      } else {
        // Add new product to cart
        cart[userId].items.push({ ...product, quantity: 1 });
      }

      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(addToCart(userId, product)); // Dispatch action if using Redux

      alert('Item added to cart successfully!');
    } else if (!userId) {
      alert('Please log in to add items to the cart.');
    } else {
      console.error('Invalid product:', product);
      alert('An error occurred while adding the product to the cart.');
    }
  };

  return (
    <div className="container mx-auto my-8 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
            <p className="text-xl font-bold text-gray-700 mb-4">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
              className="text-blue-600 hover:underline block mt-2"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

