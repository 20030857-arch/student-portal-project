import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeLanguageProvider } from "./context/ThemeLanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeLanguageProvider>
    <App />
  </ThemeLanguageProvider>
);