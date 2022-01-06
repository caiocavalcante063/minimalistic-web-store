import { ADD_TO_CART } from "../actions";
import { REMOVE_FROM_CART } from "../actions";

const INITIAL_STATE = {
  cartItems: [],
  indexCounter: 0,
};

// reference for the next 2 functions below: https://dev.to/suprabhasupi/object-equality-in-javascript-15ff
const isEqual = (obj1, obj2) => {
  var props1 = Object.getOwnPropertyNames(obj1);
  var props2 = Object.getOwnPropertyNames(obj2);

  if (props1.length !== props2.length) {
    return false;
  }

  for (var i = 0; i < props1.length; i++) {
    let val1 = obj1[props1[i]];
    let val2 = obj2[props1[i]];
    let isObjects = isObject(val1) && isObject(val2);

    if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
};

const isObject = (object) => {
  return object != null && typeof object === "object";
};

const productOccurrenceVerifier = (state, action) => {
  let occurrence = false;
  for (let item of state.cartItems) {
    if (
      isEqual(item.selectedAttributes, action.product.selectedAttributes) &&
      isEqual(item.productDetails, action.product.productDetails)
    ) {
      occurrence = true;
    }
  }
  return occurrence;
};

const matchedProductSearcher = (state, action) => {
  return state.cartItems.find((item) => {
    return (
      isEqual(item.selectedAttributes, action.product.selectedAttributes) &&
      isEqual(item.productDetails, action.product.productDetails)
    );
  });
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // checking if there is already an element in the cart with the same properties and selected attributes as the one the user is trying to add
      let addToCartOcurrence = productOccurrenceVerifier(state, action);

      // if there's no occurrence, the product is added to the cart, else, the quantity of the product is updated
      if (!addToCartOcurrence) {
        action.product.productIndex = state.indexCounter;
        return {
          ...state,
          cartItems: [...state.cartItems, action.product],
          indexCounter: state.indexCounter + 1,
        };
      } else {
        const addToCartMatchedProduct = matchedProductSearcher(state, action);
        const newQuantity = (state.cartItems[
          state.cartItems.indexOf(addToCartMatchedProduct)
        ].quantity += 1);

        addToCartMatchedProduct.quantity = newQuantity;

        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      }

    case REMOVE_FROM_CART:
      const removeFromCartMatchedProduct = matchedProductSearcher(
        state,
        action
      );

      // if the product quantity is 1, then the subtract button should remove the product from the cart
      // else, 1 product is subtracted
      if (removeFromCartMatchedProduct.quantity === 1) {
        return {
          ...state,
          cartItems: [
            ...state.cartItems.filter((product) => {
              return product !== matchedProductSearcher(state, action);
            }),
          ],
        };
      } else {
        const newQuantity = (state.cartItems[
          state.cartItems.indexOf(removeFromCartMatchedProduct)
        ].quantity -= 1);

        removeFromCartMatchedProduct.quantity = newQuantity;

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
