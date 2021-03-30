import { gql } from '@apollo/client';
import CountryFragment from '../fragments/country';
import UniversityFragment from "../fragments/university";
import CourseFragment from "../fragments/course";

const GET_UNIVERSITY = gql`
   query GET_UNIVERSITY($id: ID!) {
    university(id: $id, idType: SLUG) {
      ...UniversityFragment
      seo {
        title
      }
      address      
      cover
      content
      admission_detail
      keyInfo_detail
      howApply_detail
      foreignStudent_detail
      gallery
      gallery_medium
      video_link
      website_url
      course_count
      number_student
      is_premium
      ranking
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
          ...CountryFragment
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
      location_detail
      whyStudy {
          title
          content
      }
      officials {
          image
          name
          post
      }
      schoolTypes {
        edges {
          node {
            id
            description
          }
        }
      }
      contacts {
        emails
        name
        post
      }      
        course(first: 1000) {
            nodes {
                ...CourseFragment
                studiesLevel(first: 1000){
                  nodes {
                    id
                    name
                    databaseId
                    slug
                  }
                }
                duration_time {
                  time_month
                  time_number
                }
                specialisations(first: 1000) {
                    nodes {
                        id
                        databaseId
                        name
                        slug
                        parent {
                            node {
                                id
                                databaseId
                                name
                            }
                        }
                    }
                }
            }
        }
    }
  }
  ${CountryFragment}
  ${CourseFragment}
  ${UniversityFragment}
`;

export default GET_UNIVERSITY;
