import { Widget } from "../Widget/Widget";
import { useEffect, useState } from "react";
import styles from "./TemperatureWidget.module.css";
import { SensorData } from "../../utils/mockApi";
import { useNotification } from "../../hooks/useNotification";

interface TemperatureWidgetProps {
  data: SensorData[];
}

export function TemperatureWidget({ data }: TemperatureWidgetProps) {
  const [lastValidTemperature, setLastValidTemperature] = useState<
    string | number
  >("N/A");
  const { addNotification } = useNotification();

  useEffect(() => {
    const latestTemperature = data
      .filter((sensor) => sensor.type === "temperature")
      .slice(-1)[0]?.value;

    if (latestTemperature !== undefined) {
      setLastValidTemperature(latestTemperature);
    } else if (data.length > 0) {
      // error if data exists but no temperature data is found
      // mainly there for initial load
      addNotification("No temperature data available");
    }
  }, [data, addNotification]);

  return (
    <Widget title="Temperature" size="small">
      <div className={styles.tempContainer}>
        <p className={styles.tempText}>{lastValidTemperature}</p>
        <p className={styles.tempDegrees}>&nbsp;°C</p>
      </div>
    </Widget>
  );
}
