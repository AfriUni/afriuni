import { gql } from '@apollo/client';
import UniversityFragment from "../fragments/university";

const GET_SIMILAR_UNIVERSITY = gql`
  query GET_SIMILAR_UNIVERSITY($data: String!, $random: Boolean, $count: Int!) {
    universities(where: { data: $data, type_query : "similar", random : $random }, first: $count) {
      nodes {
        ...UniversityFragment
        address
        featuredImage {
          node {
            link
          }
        }
      }
    }
  }
  ${UniversityFragment}
`;

export default GET_SIMILAR_UNIVERSITY;
