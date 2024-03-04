import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slice/cartSlice"; // Adjust import to use cartReducer

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: 'cart',
  storage: storage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, cartReducer); // Use cartReducer here

const rootReducer = combineReducers({
  cart: persistedReducer, // Pass persistedReducer here
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for all reducers
    }),
});
