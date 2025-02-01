import { useSensorData } from "../../hooks/useSensorData";
import { Widget } from "../Widget/Widget";
import { useState, useEffect } from "react";
import { useNotification } from "../../context/NotificationContext";
import styles from "./TemperatureWidget.module.css";

interface TemperatureWidgetProps {
  interval: number;
}

export function TemperatureWidget({ interval }: TemperatureWidgetProps) {
  const { data, error } = useSensorData(interval);
  const { addNotification } = useNotification();
  const [lastValidTemperature, setLastValidTemperature] = useState<
    string | number
  >("N/A");
  const [errorId, setErrorId] = useState<number | null>(null);

  useEffect(() => {
    const latestTemperature = data
      .filter((sensor) => sensor.type === "temperature")
      .slice(-1)[0]?.value;

    if (latestTemperature !== undefined) {
      setLastValidTemperature(latestTemperature);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      // Add notification and store its ID
      const id = Date.now();
      addNotification("Error retrieving temperature data");
      setErrorId(id);
    } else if (errorId !== null) {
      setErrorId(null);
    }
  }, [addNotification, error, errorId]);

  return (
    <div className={styles.tempWidget}>
      <Widget title="Temperature">
        <p>{lastValidTemperature}°C</p>
      </Widget>
    </div>
  );
}
