import { combineReducers } from "redux";
import currencyReducer from "./currency";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  cart: cartReducer,
  currency: currencyReducer,
});

export default rootReducer;
