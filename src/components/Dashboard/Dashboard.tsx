import { TemperatureWidget } from "../Temperature/TemperatureWidget.tsx";
import { HumidityWidget } from "../Humidity/HumidityWidget.tsx";
import { PressureWidget } from "../Pressure/PressureWidget.tsx";
import { CombinedWidget } from "../Combined/CombinedWidget.tsx";
import { SidePanel } from "../SidePanel/SidePanel.tsx";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks/useNotification";
import { useSensorData } from "../../hooks/useSensorData.tsx";
import styles from "./Dashboard.module.css";

type WidgetState = {
  temperature: boolean;
  humidity: boolean;
  pressure: boolean;
  combined: boolean;
};

export function Dashboard() {
  const [widgetState, setWidgetState] = useState<WidgetState>({
    temperature: true,
    humidity: true,
    pressure: true,
    combined: true,
  });
  const [interval, setInterval] = useState(5000);

  const { data, error } = useSensorData(interval);
  const { addNotification } = useNotification();

  useEffect(() => {
    if (error) {
      addNotification("Error retrieving sensor data");
    }
  }, [error, addNotification]);

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
        {widgetState.temperature && <TemperatureWidget data={data} />}
        {widgetState.humidity && (
          <div className={styles.doubleContainer}>
            <HumidityWidget data={data} />
          </div>
        )}
        {widgetState.pressure && <PressureWidget data={data} />}
        {widgetState.combined && (
          <div className={styles.doubleContainer}>
            <CombinedWidget data={data} />
          </div>
        )}
      </div>
    </div>
  );
}
