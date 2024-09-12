import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id || 'defaultUserId';

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (userId && product) {
      dispatch(addToCart(userId, product));
      alert('Item added to cart successfully!');
    } else {
      console.error('No user logged in or invalid product.');
      alert('Please log in to add items to the cart.');
    }
  };

  if (!product) return <p className="text-center text-xl">Loading...</p>;

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className="w-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-500 mb-6">${product.price}</p>

          {/* Add to Cart button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
