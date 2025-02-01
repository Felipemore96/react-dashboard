import "./styles/styles.css";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { NotificationProvider } from "./context/NotificationProvider";
import { Notification } from "./components/Notification/Notification";
import * as React from "react";

function App() {
  return (
    <React.StrictMode>
      <NotificationProvider>
        <Dashboard />
        <Notification />
      </NotificationProvider>
    </React.StrictMode>
  );
}

export default App;
