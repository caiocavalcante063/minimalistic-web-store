import React, { Component } from "react";
import { connect } from "react-redux";
import { PRODUCT_QUERY } from "../graphQL/queries";
import { client } from "..";
import AddToCartButton from "../components/AddToCartButton";
import ProductAttributes from "../components/ProductAttributes";
import { getProductPrice } from "../utils/utils";
import "../styles/main.css";

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      productId: "",
      productDetails: {},
      selectedAttributes: {},
    };

    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    const path = window.location.pathname;
    const productId = path === "/" ? "all" : path.split("/")[2];

    this.setState({ productId }, () =>
      client
        .query({
          query: PRODUCT_QUERY,
          variables: { id: `${productId}` },
        })
        .then((result) =>
          this.setState({ productDetails: result.data.product })
        )
    );
  }

  handleCart(attributes) {
    this.setState((prevState) => ({
      selectedAttributes: {
        ...prevState.selectedAttributes,
        ...attributes,
      },
    }));
  }

  handleDescription(productDescription) {
    return { __html: `${productDescription}` };
  }

  render() {
    const { productDetails, selectedAttributes } = this.state;
    const { currency } = this.props;
    const { brand, gallery, name, attributes, prices, description } =
      productDetails;
    const price = getProductPrice(prices, currency);

    return (
      <div className="product-details">
        <div className="product-details-gallery-container">
          {gallery &&
            gallery.map((image, index) => {
              return <img key={index} src={image} alt={name} width="150px" />;
            })}
        </div>
        <div className="product-details-main-img-container">
          {gallery && <img src={gallery[0]} alt={name} width="300px" />}
        </div>
        <div className="product-details-title">
          <h1>{brand}</h1>
          <h1>{name}</h1>
        </div>
        <div className="product-details-attributes-container">
          {attributes && (
            <ProductAttributes
              attributes={attributes}
              handleCart={this.handleCart.bind(this)}
            />
          )}
        </div>
        <div className="product-details-price-container">
          <h2>PRICE:</h2>
          <h2>{prices && `${price.currency.symbol}${price.amount}`}</h2>
        </div>
        <div className="div-details-cart-button-container">
          <AddToCartButton
            selectedAttributes={selectedAttributes}
            productDetails={productDetails}
          />
        </div>
        <div className="product-details-description-container">
          {/* using element's html structure to create the product description */}
          {description && (
            <div
              dangerouslySetInnerHTML={this.handleDescription(description)}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.currentCurrency.currency,
});

export default connect(mapStateToProps)(ProductDetails);
