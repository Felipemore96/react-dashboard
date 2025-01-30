import React from "react";

interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

export function Widget({ title, children }: WidgetProps) {
  return (
    <div>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
