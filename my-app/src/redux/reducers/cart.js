import { ADD_TO_CART } from "../actions";

const INITIAL_STATE = {
  cartItems: [],
  totalPrice: 0,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // checking if there is already an element in the cart with the same properties and selected attributes
      // as the one the user is trying to add
      let ocurrence = 0;

      state.cartItems.map((item) => {
        if (
          item.selectedAttributes === action.product.selectedAttributes &&
          item.productDetails === action.product.productDetails
        ) {
          ocurrence = 1;
        }
        return ocurrence;
      });

      // if there is no ocurrence, the product is added to the cart, else, the quantity of the product is updated

      if (ocurrence === 0) {
        return {
          ...state,
          cartItems: [...state.cartItems, action.product],
        };
      } else {
        const repeatedElement = state.cartItems.find((item) => {
          return (
            item.selectedAttributes === action.product.selectedAttributes &&
            item.productDetails === action.product.productDetails
          );
        });

        const newQuantity = (state.cartItems[
          state.cartItems.indexOf(repeatedElement)
        ].quantity += 1);

        repeatedElement.quantity = newQuantity;

        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
