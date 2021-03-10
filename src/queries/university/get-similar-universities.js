import { gql } from '@apollo/client';

const query = gql`
  query courses($search: String!, $count: Int!) {
    universities(where: { search: $search }, first: $count) {
      nodes {
        title
        address
        databaseId
        featuredImage {
          node {
            link
          }
        }
      }
    }
  }
`;

export default query;
