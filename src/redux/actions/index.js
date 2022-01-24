export const CURRENCY_SWITCH = "CURRENCY_SWITCH";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const currencySwitcherAction = ({ currency, label }) => ({
  type: CURRENCY_SWITCH,
  currency,
  label,
});

export const addToCartAction = (product) => ({
  type: ADD_TO_CART,
  product,
});

export const removeFromCartAction = (product) => ({
  type: REMOVE_FROM_CART,
  product,
})
