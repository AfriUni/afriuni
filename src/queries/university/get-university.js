import { gql } from '@apollo/client';

const GET_UNIVERSITY = gql`
   query GET_UNIVERSITY($id: ID!) {
    university(id: $id, idType: SLUG) {
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
      undergraduate_fees_max {
          currency
          tuition_fees
      }
      undergraduate_fees_min {
          currency
          tuition_fees
      }
      postgraduate_fees_max {
          currency
          tuition_fees
      }
      postgraduate_fees_min {
          currency
          tuition_fees
      }
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
