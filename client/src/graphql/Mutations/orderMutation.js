import { gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation createOrder(
    $userId: ID!
    $cartProducts: [OrderProductInput!]!
    $paymentId: String!
  ) {
    createOrder(
      userId: $userId
      cartProducts: $cartProducts
      paymentId: $paymentId
    ) {
      purchasedBy
      datePurchased
      orderProducts {
        productId
        size
        productPrice
      }
      paymentId
    }
  }
`;

export { CREATE_ORDER };
