import { gql } from '@apollo/client';

const CourseFragment = gql`
  fragment CourseFragment on Course {
    id
    title
    slug
    databaseId
    seo {
       title
    }
    is_premium
    premium_start_at
    premium_end_at
  }
`;

export default CourseFragment;
