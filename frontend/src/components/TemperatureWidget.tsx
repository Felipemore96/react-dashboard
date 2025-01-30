import { useSensorData } from "../hooks/useSensorData";
import { Widget } from "./Widget";

export function TemperatureWidget() {
  const { data, error } = useSensorData(5000);

  const latestTemperature =
    data.filter((sensor) => sensor.type === "temperature").slice(-1)[0]
      ?.value ?? "N/A";

  return (
    <Widget title="Temperature">
      {error ? <p>Error: {error}</p> : <p>{latestTemperature}°C</p>}
    </Widget>
  );
}
