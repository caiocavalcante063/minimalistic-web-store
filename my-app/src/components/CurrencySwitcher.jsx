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
      open: false,
    };

    this.handleClick = this.handleClick.bind(this);
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
  }

  render() {
    const { currencies, open } = this.state;
    const { label } = this.props;
    return (
      <>
        <div className="currency-switcher-header">
          <button
            type="button"
            onClick={() => {
              this.setState({ open: !open });
            }}
          >
            {label}
            <img
              src={currencyDropdownIcon}
              alt="currency dropdown icon"
              className={`currency-switcher-icon${open ? "-open" : "-closed"}`}
            />
          </button>
        </div>
        {open && (
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
