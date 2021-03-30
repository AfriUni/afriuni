import { gql } from '@apollo/client';

const CountryFragment = gql`
  fragment CountryFragment on Location {
    id
    name
    slug
    databaseId
    image
    is_country
    flag
  }
`;

export default CountryFragment;
