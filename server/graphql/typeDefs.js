import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar Date
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String
    lastName: String
    isAdmin: Boolean!
    token: String!
    shoeSize: Float
    shippingAddress: Shipping!
    createdAt: String!
    updatedAt: String!
    currentPassword: String
    topPicks: [String]
  }

  type Shipping {
    city: String!
    postalCode: String!
    country: String!
    address: String!
    phoneNumber: String!
  }

  type Product {
    id: ID!
    title: String!
    brand: String!
    model: String!
    price: Float!
    image: String
    rates: Float!
    numReviews: Int!
    userReviews: [ID!]
    reviews: [Reviews]
    color: [String]!
    inStock: Boolean!
    size: [Float!]!
    totalPages: Int
  }

  type ProductPagination {
    products: [Product!]!
    numOfPages: Int
  }

  type TopPicksProducts {
    id: ID!
    title: String!
    rates: Int!
    image: String!
    price: Float!
  }

  type Reviews {
    userId: ID!
    rating: Float!
  }

  type Query {
    getUserById: User!
    getProducts(page: Int): [Product!]!
    getProductsByTitle(searchQuery: String): [Product!]!
    getProductById(productId: ID!): Product!
    getTopPicksProducts: [Product]!
    getDefaultTopPicks: [Product]!
    getProductsPagination(
      page: Int
      productsFiltersInput: ProductsFiltersInput
    ): ProductPagination!
    getUserCart: Cart!
    getUserOrders(userId: ID!): [Order]
  }

  type Cart {
    userId: ID!
    cartProducts: [CartProducts]!
  }

  type CartProducts {
    productId: String!
    size: [Float!]!
    productPrice: Int!
    id: ID
  }

  type Order {
    id: ID!
    purchasedBy: ID!
    orderProducts: [OrderProduct]
    datePurchased: Date
    paymentId: String
  }

  type OrderProduct {
    productId: String
    size: [Float]
    productPrice: Float
  }

  input OrderProductInput {
    productId: String!
    size: [Float!]!
    productPrice: Float!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmedPassword: String!
  }

  input ProductsFiltersInput {
    brand: String
    size: Float
    color: String
    price: [Int]
    sort: String
    rates: Float
  }

  input UpdateUserInput {
    email: String
    username: String
    firstName: String
    lastName: String
    shoeSize: Float
    password: String
    currentPassword: String
  }

  input UpdateShippingInput {
    city: String
    postalCode: String
    country: String
    phoneNumber: String
    address: String
  }

  input AddProductInput {
    title: String!
    model: String!
    brand: String!
    image: String!
    price: String
    color: String
    size: String
  }
  input UpdateProductInput {
    productId: ID
    title: String
    model: String
    brand: String
    image: String
    price: String
    color: String
    size: String
  }

  input DeleteProductInput {
    productId: ID!
  }

  type Mutation {
    login(username: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
    updateUser(updateUserInput: UpdateUserInput): User!
    addProduct(addProductInput: AddProductInput): Product!
    updateProduct(updateProductInput: UpdateProductInput): Product!
    deleteProduct(deleteProductInput: DeleteProductInput): Product!
    createProductReview(productId: ID!, userRate: Int!): Product!
    updateShipping(updateShippingInput: UpdateShippingInput): User!
    addToCart(
      userId: ID!
      productId: ID!
      size: [Float]!
      productPrice: Int!
    ): Cart!
    deleteProductFromCart(id: ID!): Cart!
    createOrder(
      userId: ID!
      cartProducts: [OrderProductInput!]!
      paymentId: String!
    ): Order!
  }
`;
