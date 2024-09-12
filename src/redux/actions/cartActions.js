// src/redux/actions/cartActions.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (userId, product) => ({
  type: ADD_TO_CART,
  payload: {
    userId,
    product
  }
});

export const removeFromCart = (userId, productId) => ({
  type: REMOVE_FROM_CART,
  payload: {
    userId,
    productId
  }
});
