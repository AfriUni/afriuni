import { gql } from '@apollo/client';

export const GET_FEATURED_COURSE = gql`
    query GET_FEATURED_COURSE ($type: String, $start_date: String, $random: Boolean) {
        coursesFeatured (where: {start_date: $start_date, type: $type, random: $random}) {
            nodes {
              end_date
              featured_list {
                nodes {
                  id
                  databaseId
                  title
                  slug
                  university (first: 1000) {
                    nodes {
                      id
                      title
                      databaseId
                      logo              
                      slug
                      locations {
                        nodes {
                          name
                          is_country
                        }
                      }
                    }
                  }
                  studiesLevel (first: 1000) {
                    nodes {
                      name
                    }
                  }
                }
              }      
              featured_data {
                priority
                id
              }
            }
          }       
    }
`
