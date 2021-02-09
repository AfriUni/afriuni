import { gql } from '@apollo/client';

export const GET_CATEGORY_BY = gql`
    query GET_CATEGORY_BY ($id : ID!) {
        specialisation (id : $id , idType: SLUG) {
              id
              name
              logo
              slug
              databaseId
              university_count
              count
              children (first: 1000) {
                  nodes {
                    id
                    databaseId
                    name
                    slug
                    courses (first: 1000) {
                      nodes{
                        id
                        databaseId
                        title
                        slug
                        university (first: 1000){
                          nodes {
                            id
                            title
                            databaseId
                            logo              
                            slug
                            locations (first: 1000){
                              nodes {
                                name
                                is_country
                              }
                            }
                          }
                        }
                        studiesLevel (first: 1000){
                          nodes {
                            name
                          }
                        }
                      }
                    }
                  }
                }
        }          
    }
`;
