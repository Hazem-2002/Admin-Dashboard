import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";
import AuthReducer from "../features/auth/authSlice";
import OrdersReducer from "../features/orders/orderSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    users: usersReducer,
    products: productsReducer,
    orders: OrdersReducer,
  },
});
