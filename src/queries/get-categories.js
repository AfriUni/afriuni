import { gql } from '@apollo/client';
import CategoryFragment from "./fragments/category";

export const GET_CATEGORIE = gql`
    query {
        categories : specialisations(where: {parent: 0}, first: 1000) {
            nodes {
              ...CategoryFragment
              logo
              children (first: 1000) {
                nodes {
                  ...CategoryFragment
                }
              }      
            }
        }        
    }
    ${CategoryFragment}
`
