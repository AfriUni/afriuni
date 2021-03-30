import { gql } from '@apollo/client';

const GET_UNIVERSITY_SEARCH = gql`
  query GET_UNIVERSITY_SEARCH($search: String!) {
    universities(where: { search: $search }) {
      nodes {
        title
        slug
        address
        databaseId
        course_count
        logo
        gallery
        locations {
            nodes {
              name
              is_country
              flag
              slug
            }
        }
        featuredImage {
          node {
            link
          }
        }
        schoolTypes {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export default GET_UNIVERSITY_SEARCH;
