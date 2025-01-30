import { useSensorData } from "../hooks/useSensorData";
import { Widget } from "./Widget";

interface TemperatureWidgetProps {
  interval: number;
}

export function TemperatureWidget({ interval }: TemperatureWidgetProps) {
  const { data, error } = useSensorData(interval);

  const latestTemperature =
    data.filter((sensor) => sensor.type === "temperature").slice(-1)[0]
      ?.value ?? "N/A";

  return (
    <Widget title="Temperature">
      {error ? <p>Error: {error}</p> : <p>{latestTemperature}°C</p>}
    </Widget>
  );
}
