import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import { Navigate } from "react-router-dom";

const ProtectedRoute = lazy(() => import("./Layout/ProtectedRoute"));
const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const UsersPage = lazy(() => import("./pages/UsersPage/UsersPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage/ProductsPage"));
const ProductForm = lazy(
  () => import("./pages/AddProductPage/ProductForm"),
);
const OrdersPage = lazy(() => import("./pages/OrdersPage/OrdersPage"));
const CartsPage = lazy(() => import("./pages/CartsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));

function App() {
  return (
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
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/edit/:id" element={<ProductForm />} />
            <Route path="products/add" element={<ProductForm />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="carts" element={<CartsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
