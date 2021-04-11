import { gql } from '@apollo/client';
import CategoryFragment from "../fragments/category";
import CourseFragment from "../fragments/course";
import UniversityFragment from "../fragments/university";

export const GET_CATEGORY_BY = gql`
  query GET_CATEGORY_BY($id: ID!, $random: Boolean, $count_course: Int) {
    specialisation(id: $id, idType: SLUG) {
      ...CategoryFragment
      logo
      university_count
      courses(where : { random : $random }, first: $count_course) {
        nodes {
          ...CourseFragment
          university{
            nodes {
              ...UniversityFragment
              locations {
                nodes {
                  name
                  is_country
                }
              }
            }
          }
          studiesLevel {
            nodes {
              name
            }
          }
        }
      }
      children(first: 1000) {
        nodes {
          ...CategoryFragment
        }
      }
    }
  }
  ${CategoryFragment}
  ${CourseFragment}
  ${UniversityFragment}
`;
