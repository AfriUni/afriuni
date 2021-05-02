import { gql } from '@apollo/client';
import CourseFragment from "../fragments/course";
import UniversityFragment from "../fragments/university";
import CountryFragment from "../fragments/country";
import CategoryFragment from "../fragments/category";

const GET_SIMILAR_COURSE = gql`
  query GET_SIMILAR_COURSE($random: Boolean, $objectIds: [ID]!, $count_course: Int) {
    specialisations(where: { include: $objectIds }) {
      nodes {
        ...CategoryFragment
        courses(where : { random : $random }, first: $count_course) {
          nodes {
            ...CourseFragment
            university{
              nodes {
                ...UniversityFragment
                locations {
                  nodes {
                    ...CountryFragment
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
      }
    }
  }
  ${CourseFragment}
  ${UniversityFragment}
  ${CountryFragment}
  ${CategoryFragment}
`;

export default GET_SIMILAR_COURSE;
