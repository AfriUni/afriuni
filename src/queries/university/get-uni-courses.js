import { gql } from '@apollo/client';

const query = gql`
  query courses($search: String!) {
    courses(where: { search: $search }) {
      nodes {
        title
        academic_unit
        specialisations {
          nodes {
            name
            ancestors {
              nodes {
                name
              }
            }
          }
        }
        duration_time {
          time_month
          time_number
        }
        final_award
        studiesLevel {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export default query;
