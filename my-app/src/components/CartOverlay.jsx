import React, { Component } from "react";
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
      </>
    );
  }
}

export default CartOverlay;
