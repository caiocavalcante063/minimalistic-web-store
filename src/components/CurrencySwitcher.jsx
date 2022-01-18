import React, { Component } from "react";
import { connect } from "react-redux";
import { currencySwitcherAction } from "../redux/actions";
import { client } from "..";
import { CURRENCIES_QUERY } from "../graphQL/queries";
import currencyDropdownIcon from "../images/currencyDropdownIcon.svg";

class CurrencySwitcher extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTrigger = this.handleTrigger.bind(this);
  }

  componentDidMount() {
    client
      .query({
        query: CURRENCIES_QUERY,
      })
      .then((result) => this.setState({ currencies: result.data.currencies }));
  }

  handleClick({ target: { value, innerText } }) {
    const { currencySwitcherFunction } = this.props;
    const label = innerText.split(" ")[0];
    const objectToDispatch = { currency: value, label };
    currencySwitcherFunction(objectToDispatch);
    this.handleTrigger();
  }

  handleTrigger() {
    const {
      handleCurrencySwitcherTrigger,
      handleCartOverlayTrigger,
      currencySwitcherIsOpen,
    } = this.props;
    handleCurrencySwitcherTrigger(!currencySwitcherIsOpen);
    handleCartOverlayTrigger(false);
  }

  render() {
    const { currencies } = this.state;
    const { label, currencySwitcherIsOpen } = this.props;
    return (
      <>
        <div className="currency-switcher-header">
          <button type="button" onClick={() => this.handleTrigger()}>
            {label}
            <img
              src={currencyDropdownIcon}
              alt="currency dropdown icon"
              className={`currency-switcher-icon${
                currencySwitcherIsOpen ? "-open" : "-closed"
              }`}
            />
          </button>
        </div>
        {currencySwitcherIsOpen && (
          <div className="currency-switcher-body">
            {currencies.map(({ symbol, label }) => {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={this.handleClick}
                  value={label}
                >
                  {`${symbol} ${label}`}
                </button>
              );
            })}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.currentCurrency.label,
});

const mapDispatchToProps = (dispatch) => ({
  currencySwitcherFunction: (currency) =>
    dispatch(currencySwitcherAction(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
