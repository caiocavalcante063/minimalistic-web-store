import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProductCard extends Component {
  render() {
    const { id, name, inStock, gallery, prices, brand, currency } = this.props;

    const price = prices.find((price) => price.currency.label === currency);

    return (
      <Link to={`/product-details/${id}`}>
        <div className="product-card-container" id={id}>
          <img src={gallery[0]} alt={name} width="300px" />
          <h2>{`${brand} ${name}`}</h2>
          <h2>{`${price.currency.symbol}${price.amount}`}</h2>
          <h2>{`In Stock ? ${inStock}`}</h2>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.main.currency,
});

export default connect(mapStateToProps)(ProductCard);
