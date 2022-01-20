import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductAttributes from "../components/ProductAttributes";
import CartQuantityHandler from "../components/CartQuantityHandler";
import CartProductCounter from "./CartProductCounter";
import { connect } from "react-redux";
import cartIcon from "../images/cartIcon.svg";
import { getProductPrice, productsCounter } from "../utils/utils";

export class CartOverlay extends Component {
  constructor() {
    super();

    this.handleTrigger = this.handleTrigger.bind(this);
  }
  getTotalPrice() {
    const { currency, cartItems } = this.props;
    let totalPrice = 0;
    cartItems.map(({ productDetails: { prices }, quantity }) => {
      const price = getProductPrice(prices, currency);
      return (totalPrice += price.amount * quantity);
    });
    return Math.round(totalPrice * 100) / 100;
  }

  handleTrigger() {
    const {
      handleCurrencySwitcherTrigger,
      handleCartOverlayTrigger,
      cartOverlayIsOpen,
    } = this.props;
    handleCurrencySwitcherTrigger(false);
    handleCartOverlayTrigger(!cartOverlayIsOpen);
  }

  render() {
    const { cartItems, currency, currencyLabel, cartOverlayIsOpen } =
      this.props;

    return (
      <>
        <div className="cart-overlay-header">
          <button type="button" onClick={() => this.handleTrigger()}>
            <img className="cart-overlay-icon" src={cartIcon} alt="cart icon" />
            <CartProductCounter />
          </button>
        </div>
        {cartOverlayIsOpen && (
          <div className="cart-overlay-body">
            <h2 className="cart-overlay-body-title">
              My bag,
              <span className="cart-overlay-body-title-quantity">{` ${productsCounter(
                cartItems
              )} ${productsCounter(cartItems) !== 1 ? "items" : "item"}`}</span>
            </h2>
            <div className="cart-overlay-body-products-container">
              <div className="cart-overlay-body-top-container">
                {cartItems.map(
                  ({ productDetails, selectedAttributes, quantity }, index) => {
                    const price =
                      productDetails.prices &&
                      productDetails.prices.find(
                        (price) => price.currency.label === currency
                      );
                    return (
                      <div key={index} className="cart-overlay-body-product">
                        <div className="cart-overlay-body-product-title-container">
                          <h2>
                            {`${productDetails.name} ${productDetails.brand}`}
                          </h2>
                        </div>
                        <h2 className="cart-overlay-body-product-price">{`${
                          price.currency.symbol
                        }${Math.round(price.amount * 100) / 100}`}</h2>
                        <div className="cart-overlay-body-product-attributes-container">
                          <ProductAttributes
                            attributes={productDetails.attributes}
                            selectedAttributes={selectedAttributes}
                          />
                        </div>
                        <div className="cart-overlay-body-product-quantity-container">
                          <CartQuantityHandler
                            quantity={quantity}
                            productDetails={productDetails}
                            selectedAttributes={selectedAttributes}
                          />
                        </div>
                        <div className="cart-overlay-body-product-img-container">
                          <img
                            key={index}
                            src={productDetails.gallery[0]}
                            alt={productDetails.name}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
              <div className="cart-overlay-body-bottom-container">
                <div className="cart-overlay-body-total-container">
                  <h2 className="cart-overlay-body-total-title">
                    Total{" "}
                    <span className="cart-overlay-body-total-price">{`${currencyLabel} ${this.getTotalPrice()}`}</span>
                  </h2>
                </div>
                <div className="cart-overlay-body-bag-and-checkout-container">
                  <Link to="/cart">
                    <button
                      className="view-bag-button"
                      onClick={() => this.handleTrigger()}
                    >
                      VIEW BAG
                    </button>
                  </Link>
                  <button className="checkout-button">CHECK OUT</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currentCurrency.currency,
  currencyLabel: state.currentCurrency.label,
});

export default connect(mapStateToProps)(CartOverlay);
