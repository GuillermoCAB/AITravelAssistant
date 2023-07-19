import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import './main.css'

createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);