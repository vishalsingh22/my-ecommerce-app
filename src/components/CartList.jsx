// 
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions';

const CartList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart[userId] || { items: [] });

  useEffect(() => {
    // Ensure that localStorage is in sync with Redux state
    if (userId) {
      const existingCart = JSON.parse(localStorage.getItem('cart') || '{}');
      if (!existingCart[userId]) {
        localStorage.setItem('cart', JSON.stringify({ ...existingCart, [userId]: cart }));
      }
    }
  }, [cart, userId]);

  const totalPrice = cart.items.reduce((total, item) => {
    if (item && item.price) {
      return total + (item.price * (item.quantity || 1));
    }
    return total;
  }, 0);

  if (!userId) {
    return <p className="text-center text-lg">Please log in to view your cart.</p>;
  }

  return (
    <div className="container mx-auto my-8 p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p className="text-lg">No items in cart.</p>
      ) : (
        <>
          {cart.items.map((item) => (
            item && (
              <div
                key={item.id}
                className="cart-item border border-gray-300 rounded-md p-4 mb-4 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                  <p className="text-sm text-gray-500">Price: ${item.price}</p>
                  <p className="text-sm text-gray-700 font-semibold">
                    Total: ${item.price * (item.quantity || 1)}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(userId, item.id))}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            )
          ))}
          <div className="cart-total mt-6 text-right">
            <h3 className="text-xl font-semibold">Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;
