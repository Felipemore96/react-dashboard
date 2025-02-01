import { createContext } from "react";

interface Notification {
  id: number;
  message: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string) => void;
  removeNotification: (id: number) => void;
}

// context to share globally in the app, across all components
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
