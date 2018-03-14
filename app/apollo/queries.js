import gql from 'graphql-tag'

const BestsellersQuery = gql`
    query bestsellers($list: String!) {
        bestsellers(list: $list) {
            listName
            books{
                id
                title
                isbn
                cover
                authors{
                    id
                    name
                    role
                }
            }
        }
    }
`;

export { BestsellersQuery };
