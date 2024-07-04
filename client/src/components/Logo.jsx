import React from "react";
import styled from "styled-components";
import logo from "../assets/items/navimage.png";
import aboutimage from "../assets/items/aboutimage.png";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Wrapper>
      <Image src={aboutimage} />
      <Title>{/* <Link to="/">FunkyFeets</Link> */}</Title>
    </Wrapper>
  );
};

export default Logo;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 20%;
  min-width: 245px;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  padding-left: 5px;
  margin-left: -80px;
`;
const Image = styled.img`
  width: 35%;
  margin-right: 35%;
  margin-top: 20px;
  margin-bottom: 10px;
`;
