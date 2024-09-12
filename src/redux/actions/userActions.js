// src/redux/actions/userActions.js

export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOAD_CART = 'LOAD_CART'; // Action to load cart data

// Action to set the logged-in user
export const setLoggedInUser = (user) => ({
  type: SET_LOGGED_IN_USER,
  payload: user,
});

// Action to log out the user
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

// Action to load cart data
export const loadCart = (cart) => ({
  type: LOAD_CART,
  payload: cart,
});
