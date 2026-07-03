import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import OrdersPage from "./pages/OrdersPage";
import CartsPage from "./pages/CartsPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/dashboard" element={<DashboardPage />} />

        <Route path="users" element={<UsersPage />} />

        <Route path="products" element={<ProductsPage />} />
        <Route path="products/add" element={<AddProductPage />} />

        <Route path="orders" element={<OrdersPage />} />
        <Route path="carts" element={<CartsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
