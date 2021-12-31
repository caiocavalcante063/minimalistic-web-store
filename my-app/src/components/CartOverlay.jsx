import React, { Component } from "react";
import ProductAttributes from "../components/ProductAttributes";
import CartQuantityHandler from "../components/CartQuantityHandler";
import { connect } from "react-redux";
import cartIcon from "../images/cartIcon.svg";

export class CartOverlay extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    const { open } = this.state;
    const { cartItems, currency } = this.props;

    return (
      <>
        <div className="cart-overlay-header">
          <button
            type="button"
            onClick={() => {
              this.setState({ open: !open });
            }}
          >
            <img className="cart-overlay-icon" src={cartIcon} alt="cart icon" />
          </button>
        </div>
        {open && (
          <div className="cart-overlay-body">
            <h2 className="cart-overlay-body-title">
              My bag,
              <span className="cart-overlay-body-title-quantity"> 2 items</span>
            </h2>
            <div className="cart-overlay-body-products-container">
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
                      }${Math.round(price.amount * quantity * 100) / 100}`}</h2>
                      <div className="cart-overlay-body-product-attributes-container">
                        <ProductAttributes
                          attributes={productDetails.attributes}
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
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(CartOverlay);
