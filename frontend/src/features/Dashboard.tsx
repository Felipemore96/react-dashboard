import { TemperatureWidget } from "../components/TemperatureWidget";
import { HumidityWidget } from "../components/HumidityWidget.tsx";
import { PressureWidget } from "../components/PressureWidget.tsx";
import { SidePanel } from "./SidePanel";
import { useState } from "react";

export function Dashboard() {
  const [widgetState, setWidgetState] = useState({
    temperature: true,
    humidity: true,
    pressure: true,
  });
  const [interval, setInterval] = useState(1000);

  return (
    <div className="flex h-screen">
      <SidePanel
        widgetState={widgetState}
        setWidgetState={setWidgetState}
        interval={interval}
        setInterval={setInterval}
      />
      <div>
        {widgetState.temperature && <TemperatureWidget interval={interval} />}
        {widgetState.humidity && <HumidityWidget interval={interval} />}
        {widgetState.pressure && <PressureWidget interval={interval} />}
      </div>
    </div>
  );
}
