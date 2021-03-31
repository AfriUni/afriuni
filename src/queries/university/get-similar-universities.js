import { gql } from '@apollo/client';
import UniversityFragment from "../fragments/university";

const GET_SIMILAR_UNIVERSITY = gql`
  query GET_SIMILAR_UNIVERSITY($similar: String!, $count: Int!) {
    universities(where: { similar: $similar, data_type : "specialisation" }, first: $count) {
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
