import { TemperatureWidget } from "../Temperature/TemperatureWidget.tsx";
import { HumidityWidget } from "../Humidity/HumidityWidget.tsx";
import { PressureWidget } from "../Pressure/PressureWidget.tsx";
import { SidePanel } from "../SidePanel/SidePanel.tsx";
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
      <div className="widgetGrid">
        {widgetState.temperature && <TemperatureWidget interval={interval} />}
        <div className="col-span-2">
          {widgetState.humidity && <HumidityWidget interval={interval} />}
        </div>
        {widgetState.pressure && <PressureWidget interval={interval} />}
        <div className="col-span-2">
          {widgetState.humidity && <HumidityWidget interval={interval} />}
        </div>
      </div>
    </div>
  );
}
