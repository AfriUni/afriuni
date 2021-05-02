import { gql } from '@apollo/client';
import CountryFragment from '../fragments/country';
import UniversityFragment from "../fragments/university";
import CourseFragment from "../fragments/course";

const GET_UNIVERSITY_BY = gql`
   query GET_UNIVERSITY_BY($id: ID!) {
    university(id: $id, idType: SLUG) {
      ...UniversityFragment
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
          databaseId
          name
          slug
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
      contacts {
        emails
        name
        post
      }      
      courses(first: 1000) {
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

export default GET_UNIVERSITY_BY;
