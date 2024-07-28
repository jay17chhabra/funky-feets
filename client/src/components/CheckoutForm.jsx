import React, { useState,useEffect  } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch  } from 'react-redux';
import createOrder from '../utils/createOrder'; // Import createOrder
import { useQuery } from '@apollo/client';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import Loading from '../assets/mui/Loading';
import MuiError from '../assets/mui/Alert';
import { clearCart } from '../features/cartSlice';

const CheckoutForm = () => { // Remove createOrder from here
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const { loading: cartLoading, data, error: cartError } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });
  const cartProducts = data?.getUserCart.cartProducts;

  useEffect(() => {
    console.log('User Info in CheckoutForm:', userInfo);
    console.log('Cart Products in CheckoutForm:', cartProducts);
  }, [userInfo, cartProducts]);

  if (cartLoading) return <Loading />;
  if (cartError) return <MuiError type="error" value="Something went wrong, please try again later." />;
  if (!cartProducts?.length) {
    navigate('/cart');
    return null;
  }



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);

    setLoading(true);
    console.log('Cart Products before payment:', cartProducts); // Debug statement

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    const amount = cartProducts.reduce((total, product) => total + product.productPrice, 0) * 100;
    const { id } = paymentMethod;
    try {
      console.log('Calling payment API with paymentMethodId:', id); // Debug statement
      const response = await axios.post('http://localhost:3000/api/payment', {
        id,
        amount, // Change the amount as per your requirement
        userId: userInfo.id,
        cartProducts: cartProducts,
      });

      if (response.data.success) {
        console.log('Payment successful:', response.data);
        console.log('Cart Products before order creation:', cartProducts);// Debug statement
        // Call createOrder function after successful payment
        //console.log('Calling createOrder with userId:', userInfo.id, 'cartProducts:', cartProducts, 'paymentId:', response.data.payment.id); // Debug statement
        //const orderResponse = await createOrder(userInfo.id, cartProducts, response.data.payment.id);
        //console.log('Order created successfully:', orderResponse);
        dispatch(clearCart()); 
        navigate('/history'); // Redirect to the purchase history page
      } else {
        console.error('Payment failed:', response.data.error);
        setError(response.data.error);
      }
    } catch (error) {
      console.error('Payment request failed:', error);
      setError('Payment failed, please try again.');
    }

    setLoading(false);
    setIsSubmitting(false); 
  };

  return (
    <>
      <Wrapper>
        <TitleContainer>
          <Title>Checkout</Title>
        </TitleContainer>
        <Form onSubmit={handleSubmit}>
          <Info>
            <Label>Credit/Debit Card</Label>
            <CardElementContainer>
              <CardElement options={{ postalCode: 'CA' }} />
            </CardElementContainer>
          </Info>
          {error && <MuiError type="error" value={error} />}
          <Info>
            {loading ? (
              <Loading />
            ) : (
              <SubmitButton type="submit">Confirm and Pay</SubmitButton>
            )}
          </Info>
        </Form>
      </Wrapper>
    </>
  );
};

export default CheckoutForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem; /* Increased padding */
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* Increased width */
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem; /* Increased margin */
  color: var(--clr-primary);
  font-size: 2rem; /* Increased font size */
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Info = styled.div`
  width: 100%;
  margin-bottom: 2rem; /* Increased margin */
`;

const Label = styled.label`
  margin-bottom: 1rem; /* Increased margin */
  color: var(--clr-gray);
  font-size: 1.2rem; /* Increased font size */
`;

const CardElementContainer = styled.div`
  padding: 20px; /* Increased padding */
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  height: 6vh; /* Increased height */
  margin-top: 2rem; /* Increased margin */
  min-width: 60%; /* Increased width */
  background: transparent;
  border: none;
  background-color: var(--clr-primary-2);
  cursor: pointer;
  transition: all 0.3s;
  color: white;
  font-size: 1.2rem; /* Increased font size */
  letter-spacing: 0.5px;
  &:hover {
    background-color: var(--clr-primary);
  }
`;

const Error = styled.div`
  color: red;
  margin-bottom: 10px;
`;