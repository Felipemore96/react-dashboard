import { Widget } from "../Widget/Widget";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import styles from "./CombinedWidget.module.css";
import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { SensorData } from "../../utils/mockApi";

interface CombinedData {
  time: string;
  humidity?: number;
  temperature?: number;
}

interface CombinedWidgetProps {
  data: SensorData[];
}

export function CombinedWidget({ data }: CombinedWidgetProps) {
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
      humidity: sensor.value,
    }));

  const temperatureData = data
    .filter(
      (sensor) =>
        sensor.type === "temperature" &&
        new Date(sensor.timestamp) > fiveMinutesAgo
    )
    .map((sensor) => ({
      time: new Date(sensor.timestamp).toLocaleTimeString(),
      temperature: sensor.value,
    }));

  const combinedData: Record<string, CombinedData> = {};

  // Add humidity data to the combinedData object
  humidityData.forEach((entry) => {
    if (!combinedData[entry.time]) {
      combinedData[entry.time] = { time: entry.time };
    }
    combinedData[entry.time].humidity = entry.humidity;
  });

  // Add temperature data to the combinedData object
  temperatureData.forEach((entry) => {
    if (!combinedData[entry.time]) {
      combinedData[entry.time] = { time: entry.time };
    }
    combinedData[entry.time].temperature = entry.temperature;
  });

  // Convert the combinedData object back to an array
  const result = Object.values(combinedData);

  useEffect(() => {
    if (data.length > 0 && result.length === 0) {
      addNotification("Error retrieving combined data");
    }
  }, [data, addNotification, result.length]);

  return (
    <div className={styles.humidWidget}>
      <Widget title="Temperature & Humidity">
        <LineChart width={400} height={150} data={result}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
          <Line type="monotone" dataKey="temperature" stroke="#0075ff" />
        </LineChart>
      </Widget>
    </div>
  );
}
