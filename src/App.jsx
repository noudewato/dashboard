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
import Measurements from "./pages/measurements/Measurements";
import Fashions from "./pages/fashions/Fashions";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/fashions" element={<Fashions />} />
      <Route path="/users" element={<Users />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/measurements/:id" element={<Measurements />} />
      <Route path="/fashions/body-part/:id" element={<Measurements />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />
      <Route path="/stores" element={<Stores />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/drivers" element={<Drivers />} />
    </Routes>
  );
}
