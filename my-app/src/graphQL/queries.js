import { gql } from '@apollo/client';

export const PRODUCT_QUERY = gql`
query GetProducts {
  product(id: "jacket-canada-goosee") {
    name
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
