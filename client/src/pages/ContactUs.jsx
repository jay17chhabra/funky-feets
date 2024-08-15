import React, { useState } from "react";
import styled from "styled-components";
import { Navbar, Footer } from "../components";
import { mobile } from "../responsive";

const ContactUsPage = () => {
  const initialState = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [values, setValues] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setValues(initialState); // Reset form fields after closing the popup
    }, 3000); // Popup will disappear after 3 seconds
  };

  return (
    <div className="section-center">
      <Navbar />
      <Wrapper>
        <Container>
          <Header>
            <Title>Contact Us</Title>
          </Header>
          <Content>
            <Form onSubmit={onSubmit}>
              <Info>
                <Label>Name</Label>
                <Input
                  name="name"
                  value={values.name}
                  onChange={onChange}
                  type="text"
                  required
                />
              </Info>
              <Info>
                <Label>Email</Label>
                <Input
                  name="email"
                  value={values.email}
                  onChange={onChange}
                  type="email"
                  required
                />
              </Info>
              <Info>
                <Label>Subject</Label>
                <Input
                  name="subject"
                  value={values.subject}
                  onChange={onChange}
                  type="text"
                  required
                />
              </Info>
              <Info>
                <Label>Message</Label>
                <TextArea
                  name="message"
                  value={values.message}
                  onChange={onChange}
                  required
                />
              </Info>
              <Info>
                <SubmitButton type="submit">Submit</SubmitButton>
              </Info>
            </Form>
            {isSubmitted && (
              <Popup>
                We have received your message. We will get back to you soon.
              </Popup>
            )}
          </Content>
        </Container>
      </Wrapper>
    </div>
  );
};

export default ContactUsPage;

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

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--clr-gray);
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Info = styled.div`
  width: 100%;
  text-align:left;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  margin-bottom: 1rem;
  color: var(--clr-gray);
  font-size: 1.2rem;
`;

const Input = styled.input`
  width: 100%; /* Set width to 100% to fit within the container */
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--clr-gray);
  background-color: transparent;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%; /* Set width to 100% to fit within the container */
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid var(--clr-gray);
  background-color: transparent;
  font-size: 1rem;
  resize: vertical;
`;

const SubmitButton = styled.button`
  height: 5vh;
  margin-top: 1.8rem;
  background-color: var(--clr-primary-2);
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--clr-primary);
  }
`;

const Popup = styled.div`
  background-color: var(--clr-primary);
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  margin-top: 2rem;
  text-align: center;
  font-size: 1.1rem;
  transition: opacity 0.3s ease;
  ${mobile({
    margin: "1rem auto",
    padding: "0.5rem 1rem",
  })}
`;
