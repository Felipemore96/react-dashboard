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
import { SensorData } from "../../utils/mockApi";
import { COLORS } from "../../utils/constants";

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
  const [visibleData, setVisibleData] = useState({
    temperature: true,
    humidity: true,
  });

  // get last 5 minutes of data
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
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

  // add humidity data to combinedData
  humidityData.forEach((entry) => {
    if (!combinedData[entry.time]) {
      combinedData[entry.time] = { time: entry.time };
    }
    combinedData[entry.time].humidity = entry.humidity;
  });

  // add temperature data to combinedData
  temperatureData.forEach((entry) => {
    if (!combinedData[entry.time]) {
      combinedData[entry.time] = { time: entry.time };
    }
    combinedData[entry.time].temperature = entry.temperature;
  });

  // convert combinedData back to an array
  const result = Object.values(combinedData);

  useEffect(() => {
    if (data.length > 0 && result.length === 0) {
      addNotification("Error retrieving combined data");
    }
  }, [data, addNotification, result.length]);

  return (
    <Widget title="Temperature & Humidity" size="large">
      <div className={styles.chartContainer}>
        <div className={styles.toggleContainer}>
          <span>Temperature</span>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={visibleData.temperature}
              onChange={() =>
                setVisibleData((prev) => ({
                  ...prev,
                  temperature: !prev.temperature,
                }))
              }
            />
            <span className={styles.slider}></span>
          </label>
          <span>Humidity</span>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={visibleData.humidity}
              onChange={() =>
                setVisibleData((prev) => ({
                  ...prev,
                  humidity: !prev.humidity,
                }))
              }
            />
            <span className={styles.slider}></span>
          </label>
        </div>
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
              {visibleData.humidity && (
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke={COLORS.opposite}
                  strokeWidth={1}
                  dot={{ fill: COLORS.opposite, r: 4 }}
                />
              )}
              {visibleData.temperature && (
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke={COLORS.bg}
                  strokeWidth={1}
                  dot={{ fill: COLORS.bg, r: 4 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Widget>
  );
}
