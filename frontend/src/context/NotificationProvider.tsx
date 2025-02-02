import { useState, ReactNode } from "react";
import { NotificationContext } from "./NotificationContext";
import { v4 as uuidv4 } from "uuid";

interface Notification {
  id: string;
  message: string;
}

// context provider - to create/manage notification state and allow to pass notifications without props everywhere
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string) => {
    setNotifications((prev) => {
      // Check if a notification with the same message already exists
      if (prev.some((n) => n.message === message)) {
        return prev; // Avoid duplicates
      }
      const id = uuidv4();
      const newNotifications = [...prev, { id, message }];

      // Automatically remove after 4 seconds
      setTimeout(() => {
        setNotifications((current) => current.filter((n) => n.id !== id));
      }, 4000);

      return newNotifications;
    });
  };

  const removeNotification = (id: string) => {
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
