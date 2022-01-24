import PropTypes from "prop-types"
import React, { Component } from "react";
import "../styles/main.css";

export default class ProductAttributes extends Component {
  constructor() {
    super();

    this.state = {
      selectedAttributes: {},
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(attribute, value) {
    const { selectedAttributes, handleCart } = this.props;

    this.setState({ selectedAttributes });
    handleCart({
      [`${attribute.type} ${attribute.name}`]: value,
    });
  }

  render() {
    const { attributes, selectedAttributes } = this.props;

    return attributes.map((attribute, index) => {
      return (
        <div key={index} className="attributes-container">
          <h2 className="attribute-name">{`${attribute.name.toUpperCase()}:`}</h2>
          {attribute.items.map(({ value, index }) => {
            const checkSwatch = attribute.type === "swatch" ? "-swatch" : "";
            const selected =
              selectedAttributes &&
                Object.entries(selectedAttributes).length > 0 &&
                Object.entries(selectedAttributes).some(
                  (val) =>
                    val[0] === `${attribute.type} ${attribute.name}` &&
                    val[1] === value
                )
                ? `selected${checkSwatch}`
                : `not-selected${checkSwatch}`;

            return (
              <button
                key={`${index}${value}`}
                type="button"
                value={value}
                style={{
                  background: attribute.type === "swatch" ? value : "white",
                }}
                onClick={() => this.handleClick(attribute, value)}
                className={selected}
              >
                {attribute.type === "swatch" ? "" : value}
              </button>
            );
          })}
        </div>
      );
    });
  }
}

ProductAttributes.propTypes = {
  attributes: PropTypes.array,
  handleCart: PropTypes.func,
  selectedAttributes: PropTypes.object
}
