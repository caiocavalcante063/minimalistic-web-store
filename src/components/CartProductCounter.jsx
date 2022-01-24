import PropTypes from "prop-types"
import React, { Component } from "react";
import { connect } from "react-redux";
import { productsCounter } from "../utils/utils";

export class CartProductCounter extends Component {
  render() {
    const { cartItems } = this.props;

    return (
      productsCounter(cartItems) >= 1 && (
        <div className="cart-overlay-product-counter">
          <h2>{productsCounter(cartItems)}</h2>
        </div>
      )
    );
  }
}

CartProductCounter.propTypes = {
  cartItems: PropTypes.array
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps)(CartProductCounter);
