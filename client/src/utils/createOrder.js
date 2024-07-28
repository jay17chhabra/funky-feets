import axios from 'axios';

const createOrder = async (userId, cartProducts, paymentId) => {
  try {
    const response = await axios.post('http://localhost:3000/api/orders', {
      userId,
      cartProducts,
      paymentId,
    });
    return response.data;
  } catch (error) {
    throw new Error('Order creation failed: ' + error.message);
  }
};

export default createOrder;
