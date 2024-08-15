import React from "react";
import styled from "styled-components";
import { Navbar, Footer } from "../components";
import { mobile } from "../responsive";

const AboutUsPage = () => {
  return (
    <div className="section-center">
      <Navbar />
      <Wrapper>
        <Container>
          <Header>
            <Title>About FunkyFeets</Title>
          </Header>
          <Content>
            FunkyFeets is an online shoe store designed to make shoe shopping fun
            and easy. We offer a wide variety of stylish shoes for men, women, and
            kids. Our goal is to provide a simple, user-friendly platform where
            you can find the perfect pair of shoes for any occasion. Whether
            you're looking for funky shoes, sneakers, or something in between,
            FunkyFeets has you covered.
            <br /><br />
            We aim to enhance your shopping experience with features like secure
            payment options, easy search functionality, and intuitive navigation.
            Additionally, we plan to include options for updating profile
            information, resetting passwords, updating shipping details, filtering
            products by price, color, brand, and size, sorting products by ratings
            and prices, adding and removing products from the cart, viewing
            shopping history, rating products after purchase, and generating top
            picks based on user favorites.
          </Content>
        </Container>
      </Wrapper>

    </div>
  );
};

export default AboutUsPage;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  .container {
    display: flex;
    width: 100%;
    ${mobile({
      display: "flex",
      flexDirection: "column",
    })}
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem;
  ${mobile({
    padding: "2rem",
  })}
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.h2`
  color: var(--clr-primary);
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const Content = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--clr-gray);
  text-align: center;
`;

