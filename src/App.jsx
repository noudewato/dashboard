import { Routes, Route } from "react-router-dom";
import {
  Orders,
  Dashboard,
  Users,
  Products,
  Customers,
  Stores,
  Inventory,
  Drivers
} from "./pages/index";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/drivers" element={<Drivers />} />
    </Routes>
  );
}
