import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import MuiError from "../../assets/mui/Alert";
import { FormRow } from "../../components";
import { DELETE_PRODUCT } from "../../graphql/Mutations/productMutation";
import Loading from "../../assets/mui/Loading";
import { useForm } from "../../utils/customHooks";

const DeleteItem = () => {
  const initialState = {
    productId: "",
    errors: "",
    successMessage: "",
  };

  const { onChange, onSubmit, values } = useForm(
    deleteProductFunction,
    initialState
  );

  const [deleteProduct, { loading, error }] = useMutation(DELETE_PRODUCT, {
    onCompleted({ deleteProduct }) {
      values.successMessage = `Product ${deleteProduct.title} deleted successfully.`;
      values.errors = "";
    },
    onError(err) {
      values.errors = err.message;
      values.successMessage = "";
    },
  });

  // function deleteProductFunction() {
  //   deleteProduct({ variables: { productId: values.productId } });
  // }
  function deleteProductFunction() {
    deleteProduct({ variables: { title: values.title } });
  }
  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <Form onSubmit={onSubmit}>
          <Title>Please type the title of the item to delete</Title>
          <FormRow
            //name="productId"
            name="title"
            type="text"
            //value={values.productId}
            value={values.title}
            onChange={onChange}
          />
          <Button type="submit">Delete</Button>
          {values.errors ? (
            <MuiError type="error">{values.errors}</MuiError>
          ) : error ? (
            <MuiError type="error">{error.message}</MuiError>
          ) : values.successMessage ? (
            <MuiError type="success">{values.successMessage}</MuiError>
          ) : (
            ""
          )}
        </Form>
      )}
    </Wrapper>
  );
};

export default DeleteItem;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 2rem 3rem;
`;

const Form = styled.form``;
const Title = styled.h2``;
const Button = styled.button`
  color: white;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 1rem;
  background-color: var(--clr-primary);
  border-radius: 12px;
  padding: 6px;
  transition: all 0.3s;
  width: 50%;
  &:hover {
    background-color: var(--clr-primary-2);
  }
`;
