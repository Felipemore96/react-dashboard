import { useSensorData } from "../../hooks/useSensorData";
import { Widget } from "../Widget/Widget";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import styles from "./CombinedWidget.module.css";
import { useEffect, useState } from "react";
import { useNotification } from "../../hooks/useNotification";

interface CombinedWidgetProps {
  interval: number;
}

interface CombinedData {
  time: string;
  humidity?: number;
  temperature?: number;
}

export function CombinedWidget({ interval }: CombinedWidgetProps) {
  const { data, error } = useSensorData(interval);
  const { addNotification } = useNotification();
  const [errorId, setErrorId] = useState<number | null>(null);

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
    if (error) {
      // Add notification and store its ID
      const id = Date.now();
      addNotification("Error retrieving humidity data");
      setErrorId(id);
    } else if (errorId !== null) {
      setErrorId(null);
    }
  }, [addNotification, error, errorId]);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className={styles.humidWidget}
    >
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
    </ResponsiveContainer>
  );
}
