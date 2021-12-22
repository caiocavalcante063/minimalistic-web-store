import React, { Component } from "react";
import { connect } from "react-redux";
import { currencySwitcherAction } from "../redux/actions";
import { client } from "..";
import { CURRENCIES_QUERY } from "../graphQL/queries";

class CurrencySwitcher extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    client
      .query({
        query: CURRENCIES_QUERY,
      })
      .then((result) => this.setState({ currencies: result.data.currencies }));
  }

  handleChange({ target: { value } }) {
    const { currencySwitcherFunction } = this.props;
    currencySwitcherFunction(value);
  }

  render() {
    const { currencies } = this.state;
    return (
      currencies.length > 0 && (
        <select onChange={this.handleChange}>
          {currencies.map(({ label }) => {
            return <option value={label}>{label}</option>;
          })}
        </select>
      )
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencySwitcherFunction: (currency) =>
    dispatch(currencySwitcherAction(currency)),
});

export default connect(null, mapDispatchToProps)(CurrencySwitcher);
