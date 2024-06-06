import { gql } from 'apollo-server-express';

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

  type Query {
    getUserById: User!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmedPassword: String!
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

  type Mutation {
    login(username: String!, password: String!): User!
    register(registerInput: RegisterInput): User!
    updateUser(updateUserInput: UpdateUserInput): User!
  }
`;
