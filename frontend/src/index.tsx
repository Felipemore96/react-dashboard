import * as React from "react";
import { createRoot } from "react-dom/client";
import { Dashboard } from "./features/Dashboard";
import { Sidebar } from "./features/Sidebar";

// import "./index.css";

createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <Sidebar />
    <Dashboard />
  </React.StrictMode>
);
