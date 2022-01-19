import { gql } from "@apollo/client";

export const PRODUCT_QUERY = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      name
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query GetProducts($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;

export const CURRENCIES_QUERY = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
        name
    }
  }
`;
