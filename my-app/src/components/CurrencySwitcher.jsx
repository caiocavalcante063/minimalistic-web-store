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
    const { currencySwitcher } = this.props;
    currencySwitcher(value);
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
  currencySwitcher: (currency) => dispatch(currencySwitcherAction(currency)),
});

const mapStateToProps = (state) => ({
  currency: state.main.currency,
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
