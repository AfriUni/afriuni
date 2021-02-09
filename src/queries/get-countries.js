import { gql } from '@apollo/client';
import CountryFragment from "./fragments/country";

export const GET_COUNTRIES = gql `
    query {
        countries : locations(where: {parent: 0}, first: 1000) {
            nodes {
              ...CountryFragment      
            }
        }
    }
    ${CountryFragment}
`
