import Cart from '../models/Cart.js'; // Importing the default export
import Order from '../models/Order.js'; // Importing the default export

export const createOrder = async (userId, cartProducts, paymentId) => {
  try {
    const newOrder = new Order({
        purchasedBy: userId,
        orderProducts: cartProducts,
        paymentId,
        datePurchased: new Date(),
      });

    const savedOrder = await newOrder.save();

    // Clear the cart
    await Cart.findOneAndUpdate({ userId }, { $set: { cartProducts: [] } });

    return savedOrder;
  } catch (error) {
    throw new Error('Error creating order: ' + error.message);
  }
};
