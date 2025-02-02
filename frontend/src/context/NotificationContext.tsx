import { createContext } from "react";

interface Notification {
  id: string;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string) => void;
  removeNotification: (id: string) => void;
}

// context to share globally in the app, across all components
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
