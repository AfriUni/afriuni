import { gql } from '@apollo/client';

const GET_UNIVERSITY_SEARCH = gql`
  query GET_UNIVERSITY_SEARCH($search: String!) {
    universities(where: { search: $search }) {
      nodes {
        title
        address
        course_count
        logo
        gallery
        featuredImage {
          node {
            link
          }
        }
      }
    }
  }
`;

export default GET_UNIVERSITY_SEARCH;
