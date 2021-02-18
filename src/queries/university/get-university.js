import { gql } from '@apollo/client';

const GET_UNIVERSITY = gql`
  query GET_UNIVERSITY($id: ID!) {
    university(id: $id, idType: DATABASE_ID) {
      seo {
        title
      }
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
          slug
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
      contacts {
        emails
        name
        post
      }
    }
  }
`;

export default GET_UNIVERSITY;
