import { Widget } from "../Widget/Widget";
import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { SensorData } from "../../utils/mockApi";
import styles from "./PressureWidget.module.css";

interface PressureWidgetProps {
  data: SensorData[];
}

export function PressureWidget({ data }: PressureWidgetProps) {
  const { addNotification } = useNotification();

  // Get timestamp 5 minutes ago
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  // Get last 5 minutes of pressure data
  const pressureData = data
    .filter(
      (sensor) =>
        sensor.type === "pressure" &&
        new Date(sensor.timestamp) > fiveMinutesAgo
    )
    .map((sensor) => sensor.value);

  // Calculate values
  const minPressure = pressureData.length ? Math.min(...pressureData) : "N/A";
  const maxPressure = pressureData.length ? Math.max(...pressureData) : "N/A";
  const avgPressure = pressureData.length
    ? (
        pressureData.reduce((sum, val) => sum + val, 0) / pressureData.length
      ).toFixed(0)
    : "N/A";

  // Show error notification if no pressure data is available
  useEffect(() => {
    if (data.length > 0 && pressureData.length === 0) {
      addNotification("Error retrieving pressure data");
    }
  }, [data, pressureData, addNotification]);

  const renderPressureLine = (label: string, value: string | number) => (
    <div className={styles.presLine}>
      <p>{label}&nbsp;</p>
      <div className={styles.presValue}>
        <div className={styles.presText}>{value}</div>
        <p>&nbsp;hPa</p>
      </div>
    </div>
  );

  return (
    <Widget title="Pressure" size="small">
      <div className={styles.presContainer}>
        {renderPressureLine("Minimum", minPressure)}
        {renderPressureLine("Maximum", maxPressure)}
        {renderPressureLine("Average", avgPressure)}
      </div>
    </Widget>
  );
}
