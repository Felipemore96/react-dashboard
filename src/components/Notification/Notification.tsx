import { useNotification } from "../../hooks/useNotification";
import styles from "./Notification.module.css";

export function Notification() {
  const { notifications } = useNotification();

  return (
    <div className={styles.notificationContainer}>
      {notifications.map((notif) => (
        <div key={notif.id} className={styles.notification}>
          {notif.message}
        </div>
      ))}
    </div>
  );
}
