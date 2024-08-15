import React from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";
import nikeimage from "../assets/items/nike1.png";
import adidasimage from "../assets/items/adidas1.png";
import underarmour from "../assets/items/undera1.png";
import newbalance from "../assets/items/newbal1.png";

const BrandsComponent = () => {
  return (
    <Wrapper>
    <div>
    <Title>Our Featured Brands</Title>
    <BrandsContainer>
      <BrandLogo>
        <img src={nikeimage} alt="Nike Logo"/>
      </BrandLogo>
      <BrandLogo>
        <img src={adidasimage} alt="Adidas logo"/>
      </BrandLogo>
      <BrandLogo>
        <img src={underarmour} alt="Under Armour Logo" />
      </BrandLogo>
      <BrandLogo>
        <img src={newbalance} alt="New Balance Logo" />
      </BrandLogo>
    </BrandsContainer>
  </div>
  </Wrapper>
  );
};

export default BrandsComponent;

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--clr-primary);
  margin-bottom: 20px;
  ${mobile({ display: "flex", flexDirection: "column", alignItems: "center" })}
`;

const BrandsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;
const Wrapper = styled.div`
  margin-top: 5rem;
  border-bottom: 2px solid var(--clr-border);
`;
const BrandLogo = styled.div`
  width: 220px;  // Adjust size as necessary
  height: 160px;  // Adjust size as necessary

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(100%);
    transition: 0.4s;
  }

  img:hover {
    filter: grayscale(100%);
    transform: scale(1.1);
  }
`;