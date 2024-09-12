// src/redux/reducers/userReducer.js

import { SET_LOGGED_IN_USER, LOGOUT_USER, LOAD_CART } from '../actions/userActions';

const initialState = {
  user: null,
  cart: {}, // Initialize cart state if needed
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_USER:
      return {
        ...state,
        user: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        cart: {}, // Clear cart on logout if desired
      };

    case LOAD_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
