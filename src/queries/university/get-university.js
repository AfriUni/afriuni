import { gql } from '@apollo/client';

const GET_UNIVERSITY = gql`
  query GET_UNIVERSITY($id: ID!) {
    university(id: $id, idType: DATABASE_ID) {
      title
      address
      logo
      cover
      content
      admission_detail
      gallery
      video_link
      website_url
      course_count
      number_student
      schoolTypes {
        nodes {
          name
        }
      }
      locations {
        nodes {
          name
          is_country
          flag
        }
      }
      faculties {
        name
        subFaculty {
          name
          subFaculty {
            name
          }
        }
      }
      scholarship_detail
      schoolTypes {
        edges {
          node {
            id
            description
          }
        }
      }
      location_detail
    }
  }
`;

export default GET_UNIVERSITY;
