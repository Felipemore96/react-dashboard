import React from "react";
import styles from "./Widget.module.css";

interface WidgetProps {
  title: string;
  children: React.ReactNode;
  size: "small" | "large";
}

export function Widget({ title, children, size = "small" }: WidgetProps) {
  return (
    <div className={`${styles.widget} ${styles[size]}`}>
      <h2 className={styles.widgetTitle}>{title}</h2>
      <div className={styles.widgetContent}>{children}</div>
    </div>
  );
}
