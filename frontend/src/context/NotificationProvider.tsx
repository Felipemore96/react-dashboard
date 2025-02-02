import { useState, ReactNode, useRef, useEffect } from "react";
import { NotificationContext } from "./NotificationContext";
import { v4 as uuidv4 } from "uuid";

interface Notification {
  id: string;
  message: string;
}

// context provider - to create/manage notification state and allow to pass notifications without props everywhere
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    const currentTimeoutIds = timeoutIds.current; // Store the current value in a variable

    return () => {
      currentTimeoutIds.forEach(clearTimeout); // Use the variable in the cleanup function
    };
  }, []);

  // Adds a new notification and schedules its removal after 4 seconds
  const addNotification = (message: string) => {
    setNotifications((prev) => {
      // Check if a notification with the same message already exists
      if (prev.some((n) => n.message === message)) {
        return prev; // Avoid duplicates
      }
      const id = uuidv4();
      const newNotification = { id, message };

      // Schedule removal after 4 seconds
      const timeoutId = setTimeout(() => {
        setNotifications((current) => current.filter((n) => n.id !== id));
      }, 4000);

      // Store timeout ID for cleanup
      timeoutIds.current.push(timeoutId);

      return [...prev, newNotification];
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
