import { gql } from '@apollo/client';

const UniversityFragment = gql`
    fragment UniversityFragment on University {
          id
          title
          slug
          databaseId
    }
`;

export default UniversityFragment;
