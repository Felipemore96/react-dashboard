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
import { useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { SensorData } from "../../utils/mockApi";
import { COLORS } from "../../constants";

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
    <Widget title="Temperature & Humidity" size="large">
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={400} height={150} data={result}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.bg} />
            <XAxis dataKey="time" tick={{ fill: COLORS.bg }} />
            <YAxis domain={[0, 100]} tick={{ fill: COLORS.bg }} />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.bg,
                borderColor: COLORS.secondary,
                borderRadius: "8px",
                color: COLORS.primary,
              }}
            />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke={COLORS.opposite}
              strokeWidth={1}
              dot={{ fill: COLORS.opposite, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke={COLORS.bg}
              strokeWidth={1}
              dot={{ fill: COLORS.bg, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Widget>
  );
}
