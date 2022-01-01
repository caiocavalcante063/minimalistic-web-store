import React, { Component } from "react";
import ProductAttributes from "../components/ProductAttributes";
import CartQuantityHandler from "../components/CartQuantityHandler";
import { connect } from "react-redux";
import { getProductPrice } from "../utils/utils";
import "../styles/main.css";

class Cart extends Component {
  render() {
    const { cartItems, currency } = this.props;
    return (
      <>
        <h1>CART</h1>
        {cartItems.map(
          ({ productDetails, selectedAttributes, quantity }, index) => {
            const price = getProductPrice(productDetails.prices, currency);

            return (
              <div className="cart-item" key={index}>
                <h2 className="cart-item-brand-name">{productDetails.brand}</h2>
                <h2 className="cart-item-name">{productDetails.name}</h2>
                {/* rounds prices to 2 decimal places */}
                <h2 className="cart-item-price">{`${price.currency.symbol}${
                  Math.round(price.amount * quantity * 100) / 100
                }`}</h2>
                <div className="cart-item-attributes-container">
                  <ProductAttributes attributes={productDetails.attributes} />
                </div>
                <div className="cart-item-quantity-container">
                  <CartQuantityHandler
                    quantity={quantity}
                    productDetails={productDetails}
                    selectedAttributes={selectedAttributes}
                  />
                </div>
                <div className="cart-item-gallery-container">
                  {productDetails.gallery.map((image, index) => {
                    return (
                      <img key={index} src={image} alt={productDetails.name} />
                    );
                  })}
                </div>
              </div>
            );
          }
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(Cart);
