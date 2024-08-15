import { gql } from "@apollo/client";

const GET_USER_ORDER = gql`
  query getUserOrders($userId: ID!) {
    getUserOrders(userId: $userId) {
      id
      purchasedBy
      orderProducts {
        productId
        size
        productPrice
      }
      datePurchased
      paymentId
    }
  }
`;

export { GET_USER_ORDER };
