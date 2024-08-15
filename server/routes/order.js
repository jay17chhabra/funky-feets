import express from "express";
import Order from "../models/Order.js"; // Assuming you have an Order model

const router = express.Router();

router.post("/orders", async (req, res) => {
  const { userId, cartProducts, paymentId } = req.body;

  console.log("Received cartProducts:", cartProducts); // Debug statement

  try {
    // Check if an order with the same payment ID already exists
    // const existingOrder = await Order.findOne({ paymentId });
    // if (existingOrder) {
    //   console.log('Order with this payment ID already exists:', paymentId); // Debug statement
    //   return res.status(400).json({ message: 'Order with this payment ID already exists' });
    // }

    // console.log('Creating a new order with payment ID:', paymentId); // Debug statement

    const newOrder = new Order({
      purchasedBy: userId,
      orderProducts: cartProducts,
      datePurchased: new Date(),
      paymentId: paymentId,
    });

    await newOrder.save();
    console.log("Order saved successfully:", newOrder); // Debug statement
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error); // Debug statement
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
});

export default router;
