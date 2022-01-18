import React, { Component } from "react";
import ProductAttributes from "../components/ProductAttributes";
import CartQuantityHandler from "../components/CartQuantityHandler";
import { connect } from "react-redux";
import { getProductPrice } from "../utils/utils";
import leftArrow from "../images/leftArrow.svg";
import rightArrow from "../images/rightArrow.svg";
import "../styles/main.css";

class Cart extends Component {
  constructor() {
    super();

    this.state = {
      galleryIndexes: [],
    };

    this.handleCurrentImage = this.handleCurrentImage.bind(this);
    this.galleryIndexFinder = this.galleryIndexFinder.bind(this);
    this.imageIndex = this.imageIndex.bind(this);
  }

  componentDidMount() {
    // setting initial indexes for the carousels
    const { cartItems } = this.props;
    this.setState({
      galleryIndexes: cartItems.map(({ productIndex }) => [productIndex, 0]),
    });
  }

  galleryIndexFinder(productIndex) {
    const { galleryIndexes } = this.state;
    const currIndex = galleryIndexes.find((index) => index[0] === productIndex);
    return currIndex;
  }

  handleCurrentImage(productGallery, productIndex, e) {
    const { galleryIndexes } = this.state;
    let currIndex = galleryIndexes.find((index) => index[0] === productIndex);

    e.target.className.includes("right")
      ? currIndex[1] >= productGallery.length - 1
        ? (currIndex[1] = 0)
        : (currIndex[1] += 1)
      : currIndex[1] <= 0
      ? (currIndex[1] = productGallery.length - 1)
      : (currIndex[1] -= 1);

    this.setState({ galleryIndexes: [...galleryIndexes, currIndex] });
  }

  imageIndex(index) {
    const { galleryIndexes } = this.state;
    const currIndex =
      galleryIndexes &&
      galleryIndexes.length > 0 &&
      this.galleryIndexFinder(index)[1];
    return currIndex;
  }

  render() {
    const { cartItems, currency } = this.props;

    return (
      <div className="body-wrapper">
        <h1 className="category-title-cart">CART</h1>
        <div className="cart-container">
          {cartItems.map(
            (
              { productDetails, selectedAttributes, quantity, productIndex },
              index
            ) => {
              const price = getProductPrice(productDetails.prices, currency);

              return (
                <div className="cart-item" key={index}>
                  <div className="cart-item-left">
                    <h2 className="cart-item-left-brand-name">
                      {productDetails.brand}
                    </h2>
                    <h2 className="cart-item-left-name">
                      {productDetails.name}
                    </h2>
                    {/* rounds prices to 2 decimal places */}
                    <h2 className="cart-item-left-price">{`${
                      price.currency.symbol
                    }${Math.round(price.amount * quantity * 100) / 100}`}</h2>
                    <div className="cart-item-left-attributes-container">
                      <ProductAttributes
                        attributes={productDetails.attributes}
                        selectedAttributes={selectedAttributes}
                      />
                    </div>
                  </div>
                  <div className="cart-item-right">
                    <div className="cart-item-right-quantity-container">
                      <CartQuantityHandler
                        quantity={quantity}
                        productDetails={productDetails}
                        selectedAttributes={selectedAttributes}
                      />
                    </div>
                    <div className="cart-item-right-gallery-container">
                      {productDetails.gallery.length > 1 && (
                        <>
                          <img
                            className="left-arrow"
                            src={leftArrow}
                            alt="previous"
                            onClick={(e) =>
                              this.handleCurrentImage(
                                productDetails.gallery,
                                productIndex,
                                e
                              )
                            }
                          />
                          <img
                            className="right-arrow"
                            src={rightArrow}
                            alt="next"
                            onClick={(e) =>
                              this.handleCurrentImage(
                                productDetails.gallery,
                                productIndex,
                                e
                              )
                            }
                          />
                        </>
                      )}
                      <img
                        className="product-img"
                        key={index}
                        src={
                          productDetails.gallery[this.imageIndex(productIndex)]
                        }
                        alt={productDetails.name}
                      />
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  currency: state.currentCurrency.currency,
});

export default connect(mapStateToProps)(Cart);
