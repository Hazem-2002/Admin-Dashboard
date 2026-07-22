import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import toastReducer from "../features/Toast/toastSlice";
import themeReducer from "../features/theme/themeSlice";
import ordersReducer from "../features/orders/orderSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    orders: ordersReducer,
    products: productsReducer,
    toast: toastReducer,
    theme: themeReducer,
  },
});
