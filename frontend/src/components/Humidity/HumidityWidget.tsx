import { Widget } from "../Widget/Widget";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "./HumidityWidget.module.css";
import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { SensorData } from "../../utils/mockApi";

interface HumidityWidgetProps {
  data: SensorData[];
}

export function HumidityWidget({ data }: HumidityWidgetProps) {
  const { addNotification } = useNotification();

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
      time: new Date(sensor.timestamp).toLocaleTimeString(),
      value: sensor.value,
    }));

  useEffect(() => {
    if (data.length > 0 && humidityData.length === 0) {
      addNotification("Error retrieving humidity data");
    }
  }, [data, addNotification, humidityData.length]);

  return (
    <div className={styles.humidWidget}>
      <Widget title="Humidity">
        <LineChart width={400} height={150} data={humidityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </Widget>
    </div>
  );
}
