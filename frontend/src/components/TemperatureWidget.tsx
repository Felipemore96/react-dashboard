import { useSensorData } from "../hooks/useSensorData";
import { Widget } from "./Widget";

export function TemperatureWidget() {
  const { data, error } = useSensorData(5000);

  const latestTemperature =
    data.filter((sensor) => sensor.type === "temperature").slice(-1)[0]
      ?.value ?? "N/A";

  return (
    <Widget title="Temperature">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <p className="text-xl font-bold">{latestTemperature}°C</p>
      )}
    </Widget>
  );
}
