import React, { Component } from "react";
import { connect } from "react-redux";

class ProductCard extends Component {
  render() {
    const { id, name, inStock, gallery, prices, currency } = this.props;

    const price = prices.find((price) => price.currency.label === currency);

    return (
      <div className="product-card" id={id}>
        <img src={gallery[0]} alt={name} />
        <h2>{name}</h2>
        <h2>{`${price.currency.symbol}${price.amount}`}</h2>
        <h2>{`In Stock ? ${inStock}`}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.main.currency,
});

export default connect(mapStateToProps)(ProductCard);
