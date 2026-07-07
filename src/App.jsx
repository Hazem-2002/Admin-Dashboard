import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";

const DashboardPage = lazy(() => import("./pages/DashboardPage/DashboardPage"));
const UsersPage = lazy(() => import("./pages/UsersPage/UsersPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage/ProductsPage"));
const AddProductPage = lazy(() => import("./pages/AddProductPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const CartsPage = lazy(() => import("./pages/CartsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

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
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="users" element={<UsersPage />} />

          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddProductPage />} />

          <Route path="orders" element={<OrdersPage />} />
          <Route path="carts" element={<CartsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
