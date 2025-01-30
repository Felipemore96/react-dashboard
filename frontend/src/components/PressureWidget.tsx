import { useSensorData } from "../hooks/useSensorData";
import { Widget } from "./Widget";

export function PressureWidget() {
  const { data, error } = useSensorData(1000);

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

  // Calculate statistics
  const minPressure = pressureData.length ? Math.min(...pressureData) : "N/A";
  const maxPressure = pressureData.length ? Math.max(...pressureData) : "N/A";
  const avgPressure = pressureData.length
    ? (
        pressureData.reduce((sum, val) => sum + val, 0) / pressureData.length
      ).toFixed(2)
    : "N/A";

  return (
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
  );
}
