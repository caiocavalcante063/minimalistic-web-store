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
        <h1 className="category-title">CART</h1>
        <div className="cart-container">
          {cartItems.map(
            ({ productDetails, selectedAttributes, quantity }, index) => {
              const price = getProductPrice(productDetails.prices, currency);

              return (
                <div className="cart-item" key={index}>
                  <div className="cart-item-left">
                    <h2 className="cart-item-left-brand-name">
                      {productDetails.brand}
                    </h2>
                    <h2 className="cart-item-left-name">
                      {productDetails.name}
                    </h2>
                    {/* rounds prices to 2 decimal places */}
                    <h2 className="cart-item-left-price">{`${
                      price.currency.symbol
                    }${Math.round(price.amount * quantity * 100) / 100}`}</h2>
                    <div className="cart-item-left-attributes-container">
                      <ProductAttributes
                        attributes={productDetails.attributes}
                        selectedAttributes={selectedAttributes}
                      />
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <div className="cart-item-right-quantity-container">
                      <CartQuantityHandler
                        quantity={quantity}
                        productDetails={productDetails}
                        selectedAttributes={selectedAttributes}
                      />
                    </div>
                    <div className="cart-item-right-gallery-container">
                      <img
                        key={index}
                        src={productDetails.gallery[0]}
                        alt={productDetails.name}
                        style={{ width: "141px", height: "185px" }}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currentCurrency.currency,
});

export default connect(mapStateToProps)(Cart);
