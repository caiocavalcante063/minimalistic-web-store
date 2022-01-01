import React, { Component } from "react";
import "../styles/main.css";

export default class ProductAttributes extends Component {
  selectedAttributeHandler(attributeValue) {
    const { selectedAttributes } = this.props;
    selectedAttributes &&
      console.log(Object.entries(selectedAttributes)[0], attributeValue);
    return (
      selectedAttributes &&
      Object.entries(selectedAttributes)[0].some(
        (val) => val === attributeValue
      )
    );
  }
  render() {
    const { attributes, handleCart } = this.props;

    return attributes.map((attribute, index) => {
      return (
        <div key={index} className="attributes-container">
          <h2 className="attribute-name">{`${attribute.name}:`}</h2>
          {attribute.items.map(({ value, index }) => {
            return (
              <button
                key={`${index}${value}`}
                type="button"
                value={value}
                style={{
                  background: attribute.type === "swatch" ? value : "white",
                }}
                onClick={() =>
                  handleCart({
                    [`${attribute.type} ${attribute.name}`]: value,
                  })
                }
                className={
                  this.selectedAttributeHandler(value) === true
                    ? "selected"
                    : "not-selected"
                }
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
