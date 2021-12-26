import { combineReducers } from "redux";
import { CURRENCY_SWITCH } from "../actions";
import { ADD_TO_CART } from "../actions";

const INITIAL_STATE = {
  currency: "USD",
  cartItems: [],
  totalPrice: 0,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCY_SWITCH:
      return {
        ...state,
        currency: action.currency,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.product],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  main: shopReducer,
});

export default rootReducer;
