import React, { Component } from "react";

export default class ProductAttributes extends Component {
  render() {
    const { attributes, handleCart } = this.props;
    const path = window.location.pathname.split("/")[1];

    return attributes.map((attribute, index) => {
      return (
        <div key={index}>
          <h2>{`${attribute.name}:`}</h2>
          {attribute.items.map(({ value, index }) => {
            return (
              <button
                key={`${index}${value}`}
                type="button"
                value={value}
                style={{
                  background: attribute.type === "swatch" ? value : "white",
                  height: "50px",
                  width: "50px",
                }}
                onClick={() =>
                  handleCart({ [`${attribute.type} ${attribute.name}`]: value })
                }
                // if the user is not in the PDP, attributes change is not allowed
                disabled={path !== "product-details"}
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
