import React, { Component } from "react";
import ProductAttributes from "../components/ProductAttributes";
import { addToCartAction } from "../redux/actions";
import { connect } from "react-redux";

class Cart extends Component {
  render() {
    const { cartItems, addToCart } = this.props;
    return (
      <>
        <h1>CART</h1>
        {cartItems.map(({ productDetails, selectedAttributes, quantity }) => {
          return (
            <div className="cart-item">
              <h2 className="cart-item-brand-name">{productDetails.brand}</h2>
              <h2 className="cart-item-name">{productDetails.name}</h2>
              <h2 className="cart-item-price">price</h2>
              <div className="cart-item-attributes-container">
                <ProductAttributes attributes={productDetails.attributes} />
              </div>
              <div className="cart-item-quantity-container">
                <button
                  onClick={() =>
                    addToCart({
                      selectedAttributes,
                      productDetails,
                      quantity: 1,
                    })
                  }
                >
                  +
                </button>
                <span className="cart-item-quantity">{quantity}</span>
                <button>-</button>
              </div>
              <div className="cart-item-gallery-container">
                {productDetails.gallery.map((image) => {
                  return <img src={image} alt={productDetails.name} />;
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCartAction(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
