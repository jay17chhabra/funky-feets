import { gql } from '@apollo/client';

const GET_USER_DETAILS = gql`
  query {
    getUserById {
      id
      username
      email
      firstName
      lastName
      isAdmin
      password
      shoeSize
      token
      topPicks
      shippingAddress {
        city
        postalCode
        country
        address
        phoneNumber
      }
    }
  }
`;

export { GET_USER_DETAILS };
