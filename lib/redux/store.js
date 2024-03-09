
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { cartReducer } from "./slice/cartSlice";

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['cart'],
};



const rootReducer = combineReducers({
  cart: cartReducer, // Pass persistedReducer here
});

const persistedReducer = persistReducer(persistConfig, rootReducer); // Use cartReducer here

   
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for all reducers
    }),
});
