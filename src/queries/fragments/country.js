import { gql } from '@apollo/client';

const CountryFragment = gql`
  fragment CountryFragment on Location {
    id
    name
    slug
    databaseId
    image
  }
`;

export default CountryFragment;
