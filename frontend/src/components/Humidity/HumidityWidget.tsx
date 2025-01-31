import { useSensorData } from "../../hooks/useSensorData";
import { Widget } from "../Widget/Widget";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface HumidityWidgetProps {
  interval: number;
}

export function HumidityWidget({ interval }: HumidityWidgetProps) {
  const { data, error } = useSensorData(interval);

  // Get timestamp 5 minutes ago
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  // Get last 5 minutes of humidity data
  const humidityData = data
    .filter(
      (sensor) =>
        sensor.type === "humidity" &&
        new Date(sensor.timestamp) > fiveMinutesAgo
    )
    .map((sensor) => ({
      time: new Date(sensor.timestamp).toLocaleTimeString(), // Format time for the X-axis
      value: sensor.value, // Humidity value
    }));

  return (
    <div className="widget">
      <Widget title="Humidity">
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <LineChart width={400} height={150} data={humidityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )}
      </Widget>
    </div>
  );
}
