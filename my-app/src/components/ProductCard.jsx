import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class ProductCard extends Component {
  render() {
    const { id, name, inStock, gallery, prices, brand, currency } = this.props;

    const price = prices.find((price) => price.currency.label === currency);

    return (
      <div className={`product-card${inStock === false ? "-out" : ""}`} id={id}>
        <Link to={`/product-details/${id}`}>
          {inStock === false && (
            <div className="out-of-stock">
              <h2 className="out-of-stock-text">OUT OF STOCK</h2>
            </div>
          )}
          <div className="product-card-image-container">
            <img className="product-card-img" src={gallery[0]} alt={name} />
          </div>
          <h2 className="product-card-name">{`${brand} ${name}`}</h2>
          <h2 className="product-card-price">{`${price.currency.symbol}${price.amount}`}</h2>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
});

export default connect(mapStateToProps)(ProductCard);
