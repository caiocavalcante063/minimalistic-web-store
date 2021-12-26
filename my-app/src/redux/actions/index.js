export const CURRENCY_SWITCH = "CURRENCY_SWITCH";
export const ADD_TO_CART = "ADD_TO_CART";

export const currencySwitcherAction = (currency) => ({
  type: CURRENCY_SWITCH,
  currency,
});

export const addToCartAction = (product) => ({
  type: ADD_TO_CART,
  product,
});
