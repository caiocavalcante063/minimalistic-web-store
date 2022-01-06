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
      currencySwitcherIsOpen: false,
    };

    this.handleLocation = this.handleLocation.bind(this);
    this.handleCartOverlayTrigger = this.handleCartOverlayTrigger.bind(this);
    this.handleCurrencySwitcherTrigger =
      this.handleCurrencySwitcherTrigger.bind(this);
  }

  componentDidMount() {
    this.handleLocation();
  }

  handleLocation() {
    const path = window.location.pathname;
    const selectedCategory = path === "/" ? "all" : path.split("/")[1];
    this.setState({ selectedCategory });
  }

  handleCartOverlayTrigger(status) {
    this.setState({ cartOverlayIsOpen: status });
  }

  handleCurrencySwitcherTrigger(status) {
    this.setState({ currencySwitcherIsOpen: status });
  }

  render() {
    const { selectedCategory, cartOverlayIsOpen, currencySwitcherIsOpen } =
      this.state;
    return (
      <>
        {currencySwitcherIsOpen && (
          <div
            className="currency-switcher-closer"
            onClick={() => this.setState({ currencySwitcherIsOpen: false })}
          ></div>
        )}
        {cartOverlayIsOpen && (
          <div
            className="fade-background"
            onClick={() => this.setState({ cartOverlayIsOpen: false })}
          ></div>
        )}
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
              <CurrencySwitcher
                handleCurrencySwitcherTrigger={
                  this.handleCurrencySwitcherTrigger
                }
                currencySwitcherIsOpen={currencySwitcherIsOpen}
                handleCartOverlayTrigger={this.handleCartOverlayTrigger}
                cartOverlayIsOpen={cartOverlayIsOpen}
              />
            </div>
            <div className="cart-overlay">
              <CartOverlay
                handleCartOverlayTrigger={this.handleCartOverlayTrigger}
                cartOverlayIsOpen={cartOverlayIsOpen}
                handleCurrencySwitcherTrigger={
                  this.handleCurrencySwitcherTrigger
                }
                currencySwitcherIsOpen={currencySwitcherIsOpen}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
