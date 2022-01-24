import PropTypes from "prop-types"
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PRODUCT_QUERY } from "../graphQL/queries";
import { client } from "..";
import cartIconWhite from "../images/cartIconWhite.svg";
import { addToCartAction } from "../redux/actions";

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.productHoverAddToCart = this.productHoverAddToCart.bind(this);
  }

  productHoverAddToCart(e) {
    const { addToCart } = this.props;
    let selectedAttributes = {};
    client
      .query({
        query: PRODUCT_QUERY,
        variables: { id: `${e.target.id}` },
      })
      .then((result) => {
        result.data.product.attributes.map((attribute) => {
          const key = `${attribute.type} ${attribute.name}`;
          selectedAttributes = {
            ...selectedAttributes,
            [key]: attribute.items[0].value,
          };
          return selectedAttributes;
        });

        const productObj = {
          selectedAttributes,
          productDetails: result.data.product,
          quantity: 1,
        };
        return productObj;
      })
      .then((productObj) => addToCart(productObj));
  }

  render() {
    const { id, name, inStock, gallery, prices, brand, currency } = this.props;

    const price = prices.find((price) => price.currency.label === currency);

    return (
      <div className={`product-card${inStock === false ? "-out" : ""}`} id={id}>
        {inStock === false && (
          <Link to={`/product-details/${id}`}>
            <div className="product-card-out-fade"></div>
          </Link>
        )}
        {inStock === true && (
          <button
            className="product-card-hover-cart-button"
            type="button"
            onClick={this.productHoverAddToCart}
            id={id}
          >
            <img
              className="product-card-hover-cart-img"
              id={id}
              src={cartIconWhite}
              width="0"
              alt="cart icon"
              value={id}
            />
          </button>
        )}
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

ProductCard.propTypes = {
  addToCart: PropTypes.func,
  brand: PropTypes.string,
  currency: PropTypes.string,
  gallery: PropTypes.array,
  id: PropTypes.string,
  inStock: PropTypes.bool,
  name: PropTypes.string,
  prices: PropTypes.array
}

const mapStateToProps = (state) => ({
  currency: state.currentCurrency.currency,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(addToCartAction(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
