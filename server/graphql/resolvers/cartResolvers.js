import Product from "../../models/Product.js";
import { UserInputError } from "apollo-server";
import Cart from "../../models/Cart.js";
import { auth } from "../../utils/auth.js";

export const cart = {
  Query: {
    getUserCart: async (_, {}, context) => {
      const user = await auth(context);
      const cart = await Cart.findOne({ userId: user._id });
      if (!cart) {
        throw new UserInputError("No user cart.");
      }
      return { ...cart._doc, user };
    },
  },
  Mutation: {
    addToCart: async (
      _,
      { userId, productId, size, productPrice, quantity },
      context
    ) => {
      const userAuth = await auth(context);
      const product = await Product.findById(productId);
      const existCart = await Cart.findOne({ userId: userAuth._id });
      const existItem = existCart?.cartProducts.find(
        (item) => item.productId === productId
      );

      if (!product) {
        throw new UserInputError("No product found");
      }
      if (!product.size.includes(size)) {
        throw new UserInputError("You must select size");
      }
      if (existItem?.size.includes(size)) {
        throw new UserInputError("Invalid size");
      }
      if (productPrice !== product.price) {
        throw new UserInputError("Wrong Info");
      }

      if (existCart) {
        existCart?.cartProducts.push({
          productId,
          size,
          productPrice,
          quantity,
        });
      } else {
        return new Cart({
          userId,
          cartProducts: { size, productId, productPrice, quantity },
        }).save();
      }

      await existCart.save();
      return { ...existCart._doc };
    },

    deleteProductFromCart: async (_, { id }, context) => {
      const userAuth = await auth(context);
      const cart = await Cart.findOne({ userId: userAuth._id });

      if (userAuth?._id.toString() !== cart?.userId.toString()) {
        throw new UserInputError("Permission denied!");
      }
      if (!cart) {
        throw new UserInputError("Bad Input!");
      }

      cart.cartProducts = cart.cartProducts.filter(
        (product) => product._id.toString() !== id.toString()
      );

      await cart.save();

      return { ...cart._doc, userId: userAuth._id };
    },

    updateCartItemQuantity: async (
      _,
      { userId, productId, size, quantity },
      context
    ) => {
      const userAuth = await auth(context);
      const cart = await Cart.findOne({ userId: userAuth._id });

      if (!cart) {
        throw new UserInputError("Cart not found");
      }

      const cartItemIndex = cart.cartProducts.findIndex(
        (item) => item.productId === productId && item.size.includes(size)
      );

      if (cartItemIndex === -1) {
        throw new UserInputError("Cart item not found");
      }

      cart.cartProducts[cartItemIndex].quantity = quantity;
      await cart.save();

      return cart;
    },
  },
};
