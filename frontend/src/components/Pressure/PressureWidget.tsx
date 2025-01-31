import { useSensorData } from "../../hooks/useSensorData";
import { Widget } from "../Widget/Widget";

interface PressureWidgetProps {
  interval: number;
}

export function PressureWidget({ interval }: PressureWidgetProps) {
  const { data, error } = useSensorData(interval);

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

  return (
    <div className="widget">
      <Widget title="Pressure">
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <p>Min: {minPressure} hPa</p>
            <p>Max: {maxPressure} hPa</p>
            <p>Avg: {avgPressure} hPa</p>
          </div>
        )}
      </Widget>
    </div>
  );
}
