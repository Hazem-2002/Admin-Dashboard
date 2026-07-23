import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// Layout
const Layout = lazy(() => import("./Layout/Layout"));
const ProtectedRoute = lazy(() => import("./Layout/ProtectedRoute"));
const DashboardPage = lazy(() => import("./pages/Home/DashboardPage"));
const UsersPage = lazy(() => import("./pages/Users/UsersPage"));
const ProductsPage = lazy(() => import("./pages/Products/ProductsPage"));
const AddProductsPage = lazy(
  () => import("./pages/Products/add-product/addProductPage"),
);
const EditProductPage = lazy(() => import("./pages/Products/edit-product/EditProductPage"));
const ViewProductPage = lazy(
  () => import("./pages/Products/view-product/viewProductPage"),
);
const OrdersPage = lazy(() => import("./pages/Orders/OrdersPage"));
const CartsPage = lazy(() => import("./pages/CartsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const LoginPage = lazy(() => import("./pages/login/Login"));
const ForgotPasswordPage = lazy(
  () => import("./pages/Login/ForgotPasswordPage"),
);
const VerifyResetOTPPage = lazy(
  () => import("./pages/Login/VerifyResetOTPPage"),
);

// Toast
import Toast from "./toast/Toast";

import { setTheme } from "./features/theme/themeSlice";

function App() {
  const themeDispatch = useDispatch();
  const { open, message, severity } = useSelector((store) => store.toast);
  const { theme } = useSelector((store) => store.theme);

  useEffect(() => {
    themeDispatch(setTheme(theme));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<VerifyResetOTPPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/view/:id" element={<ViewProductPage />} />
              <Route path="products/edit/:id" element={<EditProductPage />} />
              <Route path="products/add" element={<AddProductsPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="carts" element={<CartsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>

      <Toast open={open} message={message} severity={severity} />
    </>
  );
}

export default App;
