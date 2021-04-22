import { gql } from '@apollo/client';

const UniversityFragment = gql`
  fragment UniversityFragment on University {
    id
    title
    slug
    databaseId
    logo
    seo {
       title
    }
    is_premium
    premium_start_at
    premium_end_at
  }
`;

export default UniversityFragment;
