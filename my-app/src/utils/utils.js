export const getProductPrice = (prices, currency) => {
  return prices && prices.find((price) => price.currency.label === currency);
};
