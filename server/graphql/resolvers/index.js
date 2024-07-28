import { users } from "./userResolvers.js";
import { products } from "./productResolvers.js";
import { cart } from "./cartResolvers.js";
import { order } from "./orderResolvesr.js";
import GraphQLDateTime from "graphql-iso-date";

export default {
  Date: GraphQLDateTime,
  Query: {
    ...users.Query,
    ...products.Query,
    ...cart.Query,
    ...order.Query,
  },
  Mutation: {
    ...users.Mutation,
    ...products.Mutation,
    ...cart.Mutation,
  },
};
