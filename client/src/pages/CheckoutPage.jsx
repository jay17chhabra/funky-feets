import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CheckoutForm from "../components/CheckoutForm";
import { GET_USER_CART } from "../graphql/Queries/cartQueries";
import { Navbar } from "../components"; // Assuming you have a Navbar component
import Loading from "../assets/mui/Loading";
import MuiError from "../assets/mui/Alert";

const stripePromise = loadStripe(
  "pk_test_51PftGsCKGXqfEf1ryXYT3mKKALQaNIw95cpylPH5ythcubvRZ25bOqLAD37AUsLQi7wIM7QA9wyAgbSjNjIFrpOU00qdfnIUyI"
);

const CheckoutPage = () => {
  const { userInfo, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const { loading, data, error } = useQuery(GET_USER_CART, {
    variables: { userId: userInfo?.id },
  });

  const cartProducts = data?.getUserCart.cartProducts;
  console.log("User Info in CheckoutPage:", userInfo); // Debug statement
  console.log("Cart Products in CheckoutPage:", cartProducts); // Debug statement

  if (loading || isLoading) return <Loading />;
  if (error)
    return (
      <MuiError
        type="error"
        value="Something went wrong, please try again later."
      />
    );
  if (!cartProducts.length) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="section-center">
      <Navbar />

      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5efec;
  padding: 2rem;
`;
