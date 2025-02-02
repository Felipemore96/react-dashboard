import { Widget } from "../Widget/Widget";
import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { SensorData } from "../../utils/mockApi";
// import styles from "./PressureWidget.module.css";

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
      ).toFixed(2)
    : "N/A";

  useEffect(() => {
    if (data.length === 0) {
      addNotification("Error retrieving pressure data");
    }
  }, [data, addNotification]);

  return (
    <div className="widget">
      <Widget title="Pressure">
        <div>
          <p>Min: {minPressure} hPa</p>
          <p>Max: {maxPressure} hPa</p>
          <p>Avg: {avgPressure} hPa</p>
        </div>
      </Widget>
    </div>
  );
}
