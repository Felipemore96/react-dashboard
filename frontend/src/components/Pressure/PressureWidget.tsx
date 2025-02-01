import { useEffect, useState } from "react";
import { useSensorData } from "../../hooks/useSensorData";
import { Widget } from "../Widget/Widget";
import { useNotification } from "../../hooks/useNotification";

interface PressureWidgetProps {
  interval: number;
}

export function PressureWidget({ interval }: PressureWidgetProps) {
  const { data, error } = useSensorData(interval);
  const { addNotification } = useNotification();
  const [errorId, setErrorId] = useState<number | null>(null);

  // Get timestamp 5 minutes ago
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  // Get last 5 minutes of pressure data
  const pressureData = data
    .filter(
      (sensor) =>
        sensor.type === "pressure" &&
        new Date(sensor.timestamp) > fiveMinutesAgo
    )
    .map((sensor) => sensor.value); // Extract only the values

  // Calculate values
  const minPressure = pressureData.length ? Math.min(...pressureData) : "N/A";
  const maxPressure = pressureData.length ? Math.max(...pressureData) : "N/A";
  const avgPressure = pressureData.length
    ? (
        pressureData.reduce((sum, val) => sum + val, 0) / pressureData.length
      ).toFixed(2)
    : "N/A";

  useEffect(() => {
    if (error) {
      // Add notification and store its ID
      const id = Date.now();
      addNotification("Error retrieving pressure data");
      setErrorId(id);
    } else if (errorId !== null) {
      setErrorId(null);
    }
  }, [addNotification, error, errorId]);

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
