import React from "react";
import styles from "./Widget.module.css";

interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

export function Widget({ title, children }: WidgetProps) {
  return (
    <div className={styles.widget}>
      <h2 className={styles.widgetTitle}>{title}</h2>
      <div className={styles.widgetContent}>{children}</div>
    </div>
  );
}
