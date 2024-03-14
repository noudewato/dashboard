import React from "react";
import ReactDOM from "react-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </HelmetProvider>
);
