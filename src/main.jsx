import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </HelmetProvider>
);
