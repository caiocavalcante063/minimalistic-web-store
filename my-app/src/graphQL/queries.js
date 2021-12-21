import { gql } from '@apollo/client';

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
        }
        amount
      }
    }
  }
}
`;

export const CURRENCIES_QUERY =  gql`
query GetCurrencies {
  currencies {
    label
    symbol
  }
}
`;
