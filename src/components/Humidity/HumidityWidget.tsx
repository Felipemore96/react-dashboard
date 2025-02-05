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
import styles from "./HumidityWidget.module.css";
import { useState, useEffect } from "react";
import { useNotification } from "../../hooks/useNotification";
import { SensorData } from "../../utils/mockApi";
import { COLORS } from "../../utils/constants";

interface HumidityWidgetProps {
  data: SensorData[];
}

export function HumidityWidget({ data }: HumidityWidgetProps) {
  const { addNotification } = useNotification();
  const [timeRange, setTimeRange] = useState(5);

  // get last X minutes of humidity data
  const timeThreshold = new Date(Date.now() - timeRange * 60 * 1000);

  const humidityData = data
    .filter(
      (sensor) =>
        sensor.type === "humidity" && new Date(sensor.timestamp) > timeThreshold
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
    <Widget title="Humidity" size="large">
      <div className={styles.chartContainer}>
        <div className={styles.rangeSelector}>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(Number(e.target.value))}
          >
            <option value={1}>Last 1 min</option>
            <option value={5}>Last 5 min</option>
            <option value={10}>Last 10 min</option>
          </select>
        </div>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={humidityData}>
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
                dataKey="value"
                stroke={COLORS.opposite}
                strokeWidth={2}
                dot={{ fill: COLORS.opposite, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Widget>
  );
}
