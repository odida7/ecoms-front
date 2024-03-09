import { createSlice } from "@reduxjs/toolkit";

// Create Initial State
const initialState = [];

// Create the slice with Reducers
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {  
    addToCart: (state, action) => {
      //const { item } = action.payload;
      const { _id, name, price, image } = action.payload;
      // Check if the item already exists in the cart
      const existingItemIndex = state.findIndex((item) => item._id === _id);
   
      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        state[existingItemIndex].qty += 1;
      } else {
        // If the item doesn't exist, add it to the cart
        state.push({ _id, name, price, qty: 1, image });
      }
    
    },

    removeFromCart: (state, action) => {
      const cartId = action.payload;
      return state.filter((item) => item._id !== cartId);
    },

    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item._id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
      }
    },

    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item._id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
      }
    },

    clearCart: (state) => {
      // Reset the cart state to an empty array
      return [];
    },

  },
});

// export the reducers(actions)
export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart } =
  cartSlice.actions;

// Export the reducer
export const cartReducer = cartSlice.reducer;
