import React from "react";
import styled from "styled-components";
import logo from "../assets/items/navimage.png";
import aboutimage from "../assets/items/aboutimage.png";
import image from "../assets/items/nike_jordan_1_travis_mocha_high.png";
import { mobile } from "../responsive";
const About = () => {
  return (
    <Wrapper>
      <AboutContainer>
        <Title>
          <img
            src={aboutimage}
            alt="Logo"
            style={{ width: "100px", marginRight: "1rem" }}
          />
          About FunkyFeets
        </Title>
        <Info>
          FunkyFeets is an online shoe store designed to make shoe shopping fun
          and easy. We offer a wide variety of stylish shoes for men, women, and
          kids. Our goal is to provide a simple, user-friendly platform where
          you can find the perfect pair of shoes for any occasion. Whether
          you're looking for funky shoes, sneakers, or something in between,
          FunkyFeets has you covered.
          <br></br>
          <br></br>
          We aim to enhance your shopping experience with features like secure
          payment options, easy search functionality, and intuitive navigation.
          Additionally, we plan to include options for updating profile
          information, resetting passwords, updating shipping details, filtering
          products by price, color, brand, and size, sorting products by ratings
          and prices, adding and removing products from the cart, viewing
          shopping history, rating products after purchase, and generating top
          picks based on user favorites.
        </Info>
      </AboutContainer>
      <ImageContainer>
        <Image src={image} />
      </ImageContainer>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  display: flex;
  margin-top: 5rem;
`;
const AboutContainer = styled.div`
  ${mobile({
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    textAlign: "center",
    width: "100%",
  })}
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  color: var(--clr-primary);
  ${mobile({ display: "flex", flexDirection: "column" })}
`;
const Logo = styled.img`
  width: 10%;
  min-width: 50px;
  margin-right: 1rem;
  ${mobile({ width: "30%" })}
`;

const Info = styled.p`
  color: var(--clr-gray);
  ${mobile({
    margin: "1rem",
  })}
`;

const ImageContainer = styled.div`
  ${mobile({ display: "none" })}
`;
const Image = styled.img`
  height: 50vh;
  width: 35vw;
  object-fit: cover;
`;
