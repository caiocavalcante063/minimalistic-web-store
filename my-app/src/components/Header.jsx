import React, { Component } from "react";
import { Link } from "react-router-dom";
import CurrencySwitcher from "./CurrencySwitcher";

export default class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-left-container">
          <Link to="/">ALL</Link>
          <Link to="/clothes">CLOTHES</Link>
          <Link to="/tech">TECH</Link>
        </div>
        <div className="header-center-container"></div>
        <div className="header-rigth-container">
          <div className="currency-switcher-container">
            <CurrencySwitcher />
          </div>
          <div className="cart-overlay-container">
            <Link to="/cart">CART</Link>
          </div>
        </div>
      </div>
    );
  }
}
