import React, { Component } from "react";
import "../styles/main.css";

export default class ProductAttributes extends Component {
  render() {
    const { attributes, handleCart } = this.props;
    const path = window.location.pathname.split("/")[1];
    console.log(path);

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
