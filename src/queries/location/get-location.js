import { gql } from '@apollo/client';
import CountryFragment from "../fragments/country";
import CourseFragment from "../fragments/course";
import UniversityFragment from "../fragments/university";

export const GET_LOCATION_BY = gql`
    query GET_LOCATION_BY ($id : ID!) {
        location(id: $id, idType: SLUG) {
            ...CountryFragment
            flag
            academic_year
            total_courses
            total_universities
            studyLevel {
              id
              name
              count
            }
            courses(first: 1000) {
              nodes {
                ...CourseFragment
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
            children(first: 1000) {
              nodes {
                ...CountryFragment
                universities(first: 1000) {
                  nodes {
                    ...UniversityFragment
                    course_count
                    gallery
                    schoolTypes(first: 1000) {
                      nodes {
                        id
                        databaseId
                        name
                        slug
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
