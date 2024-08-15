import { gql } from "@apollo/client";

const ADD_TO_CART = gql`
  mutation (
    $userId: ID!
    $productId: ID!
    $size: [Float]!
    $productPrice: Int!
    $quantity: Int!
  ) {
    addToCart(
      userId: $userId
      productId: $productId
      size: $size
      productPrice: $productPrice
      quantity: $quantity
    ) {
      userId
      cartProducts {
        quantity
        productId
        productPrice
        size
        id
      }
    }
  }
`;

const DELETE_FROM_CART = gql`
  mutation ($id: ID!) {
    deleteProductFromCart(id: $id) {
      userId
      cartProducts {
        id
        productId
        productPrice
        size
      }
    }
  }
`;

const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity(
    $userId: ID!
    $productId: ID!
    $size: Float!
    $quantity: Int!
  ) {
    updateCartItemQuantity(
      userId: $userId
      productId: $productId
      size: $size
      quantity: $quantity
    ) {
      userId
      cartProducts {
        id
        productId
        size
        quantity
      }
    }
  }
`;

export { ADD_TO_CART, DELETE_FROM_CART, UPDATE_CART_ITEM_QUANTITY };
