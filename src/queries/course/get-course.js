import { gql } from '@apollo/client';
import CourseFragment from "../fragments/course";
import UniversityFragment from "../fragments/university";
import CountryFragment from "../fragments/country";
import CategoryFragment from "../fragments/category";

const GET_COURSE_BY = gql `
    query GET_COURSE_BY($id: ID!) {
        course(id: $id, idType: DATABASE_ID) {
            ...CourseFragment
            content
            admission_detail
            curriculum_detail
            application_detail
            career_detail
            tuition_fees_detail
            language
            course_type
            student_quota
            academic_unit
            final_award
            campus
            attendant
            option
            duration_time {
              time_month
              time_number
            }
            fees_duration
            fees_apply_to_national
            national_fees {
                currency
                tuition_fees
            }
            national_application_fees {
                currency
                tuition_fees
            }
            fees_apply_to_international
            international_fees {
                currency
                tuition_fees
            }
            international_application_fees {
                currency
                tuition_fees
            }
            university{
                nodes {
                    ...UniversityFragment
                    number_student
                    course_count
                    address
                    gallery
                    schoolTypes {
                      nodes {
                        name
                      }
                    }
                }
            }
            locations {
                nodes {
                    ...CountryFragment
                }
            }
            all_open
            sessions {
                name      
                classes_begin {
                    day
                    month
                    year
                }
                deadline_application {
                    day
                    month
                    year
                }
                start_application {
                    day
                    month
                    year
                }
            }
            admission {
              type
              name
              date
              format
            }
            contacts {  
                name              
                emails
                post
                code_country
                phone
            }
            studiesLevel {
                nodes {
                    name
                }
            }
            specialisations {
              nodes {
                ...CategoryFragment
                children {
                  nodes {
                    ...CategoryFragment
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

export default GET_COURSE_BY;
