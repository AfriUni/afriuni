import { gql } from '@apollo/client';

const CategoryFragment = gql`
  fragment CategoryFragment on Specialisation {
    id
    databaseId
    name
    slug
    count
    seo {
        title
    }
  }
`;

export default CategoryFragment;
