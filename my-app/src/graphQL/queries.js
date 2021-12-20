import { gql } from '@apollo/client';

const PRODUCT_QUERY = gql`
query GetRates {
  product(id: "jacket-canada-goosee") {
    name
  }
}
`;

export default PRODUCT_QUERY;