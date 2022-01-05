import React, { Component } from "react";
import { Link } from "react-router-dom";
import CurrencySwitcher from "./CurrencySwitcher";
import CartOverlay from "./CartOverlay";
import logo from "../images/logo.svg";
import "../styles/main.css";

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      selectedCategory: "all",
      cartOverlayIsOpen: false,
    };

    this.handleLocation = this.handleLocation.bind(this);
    this.handleCartOverlayTrigger = this.handleCartOverlayTrigger.bind(this);
  }

  componentDidMount() {
    this.handleLocation();
  }

  handleLocation() {
    const path = window.location.pathname;
    const selectedCategory = path === "/" ? "all" : path.split("/")[1];
    this.setState({ selectedCategory });
  }

  handleCartOverlayTrigger() {
    const { cartOverlayIsOpen } = this.state;
    this.setState({ cartOverlayIsOpen: !cartOverlayIsOpen });
  }

  render() {
    const { selectedCategory, cartOverlayIsOpen } = this.state;
    return (
      <>
        {cartOverlayIsOpen && <div className="fade-background"></div>}
        <div className="header">
          <div className={"header-left-container"}>
            <div
              className={`header-link-page${
                selectedCategory === "all" ? "-selected" : ""
              }`}
              onClick={this.handleLocation}
            >
              <Link to="/">ALL</Link>
            </div>
            <div
              className={`header-link-page${
                selectedCategory === "clothes" ? "-selected" : ""
              }`}
              onClick={this.handleLocation}
            >
              <Link to="/clothes">CLOTHES</Link>
            </div>
            <div
              className={`header-link-page${
                selectedCategory === "tech" ? "-selected" : ""
              }`}
              onClick={this.handleLocation}
            >
              <Link to="/tech">TECH</Link>
            </div>
          </div>
          <div className="header-center-container">
            <img src={logo} alt="logo" width="41px" />
          </div>
          <div className="header-right-container">
            <div className="currency-switcher">
              <CurrencySwitcher />
            </div>
            <div className="cart-overlay">
              <CartOverlay
                handleCartOverlayTrigger={this.handleCartOverlayTrigger}
                cartOverlayIsOpen={cartOverlayIsOpen}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
