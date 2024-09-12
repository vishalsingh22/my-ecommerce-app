// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
import productReducer from './reducers/productReducer';
import userReducer from './reducers/userReducer'; 

const loadCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || {};
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    user: userReducer,
  },
  preloadedState: {
    cart: {
      cart: loadCartFromLocalStorage(),
    },
  },
});

export default store;
