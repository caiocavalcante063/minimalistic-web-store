export const getProductPrice = (prices, currency) => {
  return prices && prices.find((price) => price.currency.label === currency);
};

export const productsCounter = (cartItems) => {
  let counter = 0;

  cartItems.map(({ quantity }) => {
    return (counter += quantity);
  });

  return counter;
};
