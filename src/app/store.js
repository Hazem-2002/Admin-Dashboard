import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import usersReducer from "../features/users/usersSlice";
import productsReducer from "../features/products/productsSlice";
import ordersReducer from "../features/orders/orderSlice";
import cartsReducer from "../features/carts/cartsSlice";
import themeReducer from "../features/theme/themeSlice";
import toastReducer from "../features/Toast/toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    users: usersReducer,
    products: productsReducer,
    orders: ordersReducer,
    carts: cartsReducer,
    theme: themeReducer,
    toast: toastReducer,
  },
});
