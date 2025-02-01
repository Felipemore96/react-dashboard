import { createContext, useContext, useState, ReactNode } from "react";

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
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

// context provider - to create/manage notification state and allow to pass notifications without props everywhere
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    setNotifications((prev) => {
      // Check if a notification with the same message already exists
      if (prev.some((n) => n.message === message)) {
        return prev; // Avoid duplicates
      }
      const id = Date.now();
      const newNotifications = [...prev, { id, message }];

      // Automatically remove after 4 seconds
      setTimeout(() => {
        setNotifications((current) => current.filter((n) => n.id !== id));
      }, 4000);

      return newNotifications;
    });
  };

  const removeNotification = (id: number) => {
    setNotifications((current) => current.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// hook to simplify using the context in other components, preventing error
export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}
