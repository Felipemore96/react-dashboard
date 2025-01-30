import React from "react";

interface WidgetProps {
  title: string;
  children: React.ReactNode;
}

export function Widget({ title, children }: WidgetProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
