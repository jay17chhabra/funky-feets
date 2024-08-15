import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import { auth } from "../../utils/auth.js";
import { UserInputError } from "apollo-server";

export const order = {
  Query: {
    getUserOrders: async (_, { userId }) => {
      try {
        const orders = await Order.find({ purchasedBy: userId });
        return orders;
      } catch (err) {
        throw new Error("Error fetching user orders: " + err.message);
      }
    },
  },

  Mutation: {
    createOrder: async (_, { userId, cartProducts, paymentId }, context) => {
      const userAuth = await auth(context);
      const cart = await Cart.findOne({ userId: userAuth._id });
      const products = await Product.find({
        _id: cartProducts.map((c) => c.productId),
      });
      const topPicksBrands = products.map((p) => p.brand);

      for (const cartInfo of cartProducts) {
        for (const product of products) {
          product.size = product.size.filter((size) => size !== +cartInfo.size);
          await product.save();
        }
      }
      if (cartProducts.length < 1) {
        throw new UserInputError("No available order!");
      }
      userAuth.topPicks.push(...topPicksBrands);

      await userAuth.save();
      const newOrder = new Order({
        orderProducts: cartProducts,
        purchasedBy: userAuth._id,
        datePurchased: new Date(),
        paymentId,
      });
      await newOrder.save();
      return newOrder;
    },
  },
};
