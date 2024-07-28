import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MuiError from '../assets/mui/Alert';
import Loading from '../assets/mui/Loading';
import { Navbar, OrderSum } from '../components';
import CartItems from '../components/CartItems';
import { GET_USER_CART } from '../graphql/Queries/cartQueries';
import { GET_PRODUCTS } from '../graphql/Queries/productQueries';
import { GET_USER_ORDER } from '../graphql/Queries/orderQueries';
import { mobile } from '../responsive';
import { validateShippingAddress } from '../utils/validators';
import CheckoutForm from '../components/CheckoutForm'; // Import CheckoutForm
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import createOrder from '../utils/createOrder'; // Import the createOrder function

const stripePromise = loadStripe('pk_test_51PftGsCKGXqfEf1ryXYT3mKKALQaNIw95cpylPH5ythcubvRZ25bOqLAD37AUsLQi7wIM7QA9wyAgbSjNjIFrpOU00qdfnIUyI');

const OrderPage = () => {
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });
  const cartProducts = data?.getUserCart.cartProducts;

  const { city, address, country, postalCode, phoneNumber } =
    !isLoading && userInfo?.shippingAddress;
  const { errors } = validateShippingAddress(
    city,
    address,
    country,
    postalCode,
    phoneNumber
  );
  const errorsLength = Object.keys(errors).length;

  useEffect(() => {
    console.log("Cart Products in OrderPage:", cartProducts);
    if (data?.getUserCart.cartProducts.length < 1) {
      navigate('/history');
    }
  }, [data?.getUserCart, navigate]);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="section-center">
      <Navbar />
      <Wrapper>
        {loading ? (
          <Loading />
        ) : errorsLength > 0 ? (
          <ErrorContainer>
            <MuiError type="error">{errors.general}</MuiError>
            <Link className="shipping_link" to="/shipping">
              <Button>Go to profile</Button>
            </Link>
          </ErrorContainer>
        ) : (
          <>
            <LoadingContainer>
              <Container>
                <OrderInfo>
                  <Title>SHIPPING</Title>
                  <p>
                    Address: {address}, {city}, {postalCode}, {country}
                  </p>
                  <Title>ORDERS</Title>
                  <CartContainer>
                    {cartProducts?.map((cartItem, index) => (
                      <CartItems key={index} orderPage {...cartItem} />
                    ))}
                  </CartContainer>
                </OrderInfo>
              </Container>
              <OrderSummary>
                <OrderSum
                  onClick={handleCheckout}
                  cartProducts={cartProducts}
                  orderPage
                />
              </OrderSummary>
            </LoadingContainer>
            {/* <Elements stripe={stripePromise}>
              <CheckoutForm createOrder={createOrder} userId={userInfo?.id} cartProducts={cartProducts} />
            </Elements> */}
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default OrderPage;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 80vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  ${mobile({ display: 'flex', flexDirection: 'column' })}
`;

const OrderInfo = styled.div`
  margin-top: 1rem;
`;
const Title = styled.h1`
  letter-spacing: 1px;
  color: var(--clr-primary-2);
`;

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 0.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 50vh;
  margin-top: 1rem;
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.15);
  }
  &::-webkit-scrollbar {
    width: 2px;
  }
  ${mobile({
    margin: '0 auto',
    padding: '0',
  })}
`;

const OrderSummary = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  padding: 6rem;
  flex-direction: column;
  ${mobile({
    display: 'flex',
    padding: '0',
    justifyContent: 'center',
    width: '100%',
  })}
`;
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  .shipping_link {
    padding: 1rem;
  }
`;

const Button = styled.button`
  background-color: var(--clr-mocha-3);
  color: white;
  border-radius: 5px;
  padding: 0.375rem 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 14px;
  transition: all 0.3s;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: var(--clr-mocha-2);
  }
`;
