import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

// hook to simplify using the context in other components
// throws Error if used outside of a NotificationProvider.
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
