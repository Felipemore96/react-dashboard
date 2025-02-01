import { TemperatureWidget } from "../Temperature/TemperatureWidget.tsx";
import { HumidityWidget } from "../Humidity/HumidityWidget.tsx";
import { PressureWidget } from "../Pressure/PressureWidget.tsx";
import { CombinedWidget } from "../Combined/CombinedWidget.tsx";
import { SidePanel } from "../SidePanel/SidePanel.tsx";
import { useState } from "react";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const [widgetState, setWidgetState] = useState({
    temperature: true,
    humidity: true,
    pressure: true,
    combined: true,
  });
  const [interval, setInterval] = useState(5000);

  return (
    <div className={styles.app}>
      <div className={styles.sidePanel}>
        <SidePanel
          widgetState={widgetState}
          setWidgetState={setWidgetState}
          interval={interval}
          setInterval={setInterval}
        />
      </div>
      <div className={styles.widgetGrid}>
        {widgetState.temperature && <TemperatureWidget interval={interval} />}
        <div className="col-span-2">
          {widgetState.humidity && <HumidityWidget interval={interval} />}
        </div>
        {widgetState.pressure && <PressureWidget interval={interval} />}
        <div className="col-span-2">
          {widgetState.combined && <CombinedWidget interval={interval} />}
        </div>
      </div>
    </div>
  );
}
