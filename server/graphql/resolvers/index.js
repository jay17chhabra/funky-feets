import { users } from "./userResolvers.js";
import { products } from "./productResolvers.js";
import GraphQLDateTime from "graphql-iso-date";

export default {
  Date: GraphQLDateTime,
  Query: {
    ...users.Query,
    ...products.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...products.Mutation,
  },
};
