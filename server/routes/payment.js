import express from 'express';
import Stripe from 'stripe';
import { createOrder } from '../services/orderService.js';

const router = express.Router();
const stripe = new Stripe('sk_test_51PftGsCKGXqfEf1rTGn83wH99LzncvCVBoCLDL56KrToipv5gOVADdUTlUfsp1xWZMXgfKS9INXk5Tzg1gr1AyBN00gH5wDZtQ');

router.post('/payment', async (req, res) => {
    const { id, amount, userId, cartProducts } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      description: 'Order Payment',
      payment_method: id,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });

    const order = await createOrder(userId, cartProducts, payment.id);
    res.json({ success: true, payment });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: error.message });
  }
});

export default router;
