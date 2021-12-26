import React, { Component } from "react";

export default class ProductAttributes extends Component {
  render() {
    const { attributes, handleCart } = this.props;
    return attributes.map((attribute) => {
      return (
        <>
          <h2>{`${attribute.name}:`}</h2>
          {attribute.items.map(({ value }) => {
            return (
              <button
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
              >
                {attribute.type === "swatch" ? "" : value}
              </button>
            );
          })}
        </>
      );
    });
  }
}
