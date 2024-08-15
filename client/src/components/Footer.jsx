import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <FooterSection>
        <FooterColumn>
          <ColumnTitle>Our Brands</ColumnTitle>
          <FooterItem>Nike</FooterItem>
          <FooterItem>Adidas</FooterItem>
          <FooterItem>Under Armour</FooterItem>
          <FooterItem>New Balance</FooterItem>
        </FooterColumn>
        <FooterColumn>
          <ColumnTitle>Quick Links</ColumnTitle>
          <FooterItem onClick={() => navigate("/")}>Home</FooterItem>
          <FooterItem onClick={() => navigate("/about")}>About Us</FooterItem>
          <FooterItem onClick={() => navigate("/contact-us")}>
            Contact Us
          </FooterItem>
          <FooterItem onClick={() => navigate("/shop")}>Shop</FooterItem>
          <FooterItem onClick={() => navigate("/cart")}>Cart</FooterItem>
        </FooterColumn>
      </FooterSection>
      <FooterBottom>
        FunkyFeets <br />
        2024 &copy; All Rights Reserved.
      </FooterBottom>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  background-color: var(--clr-primary-2);
  color: white;
  padding: 2rem;
  margin-top: 40px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 0.5rem;
`;

const ColumnTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1rem;
`;

const FooterItem = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: white;
  cursor: pointer;
  &:hover {
    color: var(--clr-primary);
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  font-size: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  margin-top: 1rem;
  color: white;
`;
