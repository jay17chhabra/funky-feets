import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cartProducts.push(action.payload);
    },
    clearCart: (state) => {
      state.cartProducts = [];
    },
  },
});

export const { addProductToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
