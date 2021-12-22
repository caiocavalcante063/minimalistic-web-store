import React, { Component } from "react";
import { connect } from "react-redux";
import { PRODUCT_QUERY } from "../graphQL/queries";
import { client } from "..";
import AddToCartButton from "../components/AddToCartButton";

class ProductDetails extends Component {
  constructor() {
    super();

    this.state = {
      productId: "",
      productDetails: {},
    };
  }

  componentDidMount() {
    const path = window.location.pathname;
    const productId = path === "/" ? "all" : path.split("/")[2];

    this.setState({ productId });

    client
      .query({
        query: PRODUCT_QUERY,
        variables: { id: `${productId}` },
      })
      .then((result) => this.setState({ productDetails: result.data.product }));
  }

  render() {
    const { productId, productDetails } = this.state;
    const { currency } = this.props;
    const { brand, gallery, name, attributes, prices, description } =
      productDetails;
    const price =
      prices && prices.find((price) => price.currency.label === currency);

    return (
      <div className="product-details">
        <div className="product-details-gallery-container">
          {gallery &&
            gallery.map((image) => {
              return <img src={image} alt={name} width="150px" />;
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
          {attributes &&
            attributes.map((attribute) => {
              return (
                <>
                  <h2>{`${attribute.name}:`}</h2>
                  {attribute.items.map((item) => {
                    return <h3>{item.value}</h3>;
                  })}
                </>
              );
            })}
        </div>
        <div className="product-details-price-container">
          <h2>PRICE:</h2>
          <h2>{prices && `${price.currency.symbol}${price.amount}`}</h2>
        </div>
        <div className="div-details-cart-button-container">
          <AddToCartButton />
        </div>
        <div className="product-details-description-container">
          {/* removing the paragraph structure from the description element */}
          <p>{description && description.split(">")[1].split("<")[0]}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.main.currency,
});

export default connect(mapStateToProps)(ProductDetails);
