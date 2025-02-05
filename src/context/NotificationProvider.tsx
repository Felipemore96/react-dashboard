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

  // cleanup timeouts on unmount
  useEffect(() => {
    const currentTimeoutIds = timeoutIds.current; // store the current value in a variable

    return () => {
      currentTimeoutIds.forEach(clearTimeout); // use the variable in the cleanup function
    };
  }, []);

  // adds a new notification and schedules its removal after 4 seconds
  const addNotification = (message: string) => {
    setNotifications((prev) => {
      // check if a notification with the same message already exists
      const id = uuidv4();
      const newNotification = { id, message };

      if (prev.some((n) => n.id === newNotification.id)) {
        return prev; // Avoid duplicates
      }

      // schedule removal after 4 seconds
      const timeoutId = setTimeout(() => {
        setNotifications((current) => current.filter((n) => n.id !== id));
      }, 4000);

      // store timeout ID for cleanup
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
