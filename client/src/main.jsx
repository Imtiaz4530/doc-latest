import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { StoreProvider } from "easy-peasy";

import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>
);
