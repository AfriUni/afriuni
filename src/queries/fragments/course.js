import { gql } from '@apollo/client';

const CourseFragment = gql`
    fragment CourseFragment on Course {
          id
          title
          slug
          databaseId
    }
`;

export default CourseFragment;
