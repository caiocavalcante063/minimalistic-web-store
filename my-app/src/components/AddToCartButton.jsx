import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCartAction } from "../redux/actions";

class AddToCartButton extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { selectedAttributes, productDetails, addToCart } = this.props;

    const newProduct = {
      selectedAttributes,
      productDetails,
      quantity: 1,
    };

    addToCart(newProduct);
  }

  render() {
    const { selectedAttributes, productDetails } = this.props;

    return (
      <div>
        <button
          disabled={
            (selectedAttributes && Object.keys(selectedAttributes).length) !==
            (productDetails &&
              productDetails.attributes &&
              productDetails.attributes.length)
          }
          onClick={this.handleClick}
        >
          ADD TO CART
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCartAction(product)),
});

export default connect(null, mapDispatchToProps)(AddToCartButton);
