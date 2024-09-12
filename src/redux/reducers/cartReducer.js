// src/redux/reducers/cartReducer.js
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart') || '{}')
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const updatedCartAdd = {
        ...state.cart,
        [action.payload.userId]: {
          ...state.cart[action.payload.userId],
          items: [...(state.cart[action.payload.userId]?.items || []), action.payload.product]
        }
      };
      localStorage.setItem('cart', JSON.stringify(updatedCartAdd));
      return {
        ...state,
        cart: updatedCartAdd
      };

    case REMOVE_FROM_CART:
      const updatedCartRemove = {
        ...state.cart,
        [action.payload.userId]: {
          ...state.cart[action.payload.userId],
          items: state.cart[action.payload.userId]?.items.filter(item => item.id !== action.payload.productId) || []
        }
      };
      localStorage.setItem('cart', JSON.stringify(updatedCartRemove));
      return {
        ...state,
        cart: updatedCartRemove
      };

    default:
      return state;
  }
};

export default cartReducer;
