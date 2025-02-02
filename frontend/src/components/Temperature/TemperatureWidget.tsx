import { Widget } from "../Widget/Widget";
import { useEffect, useState } from "react";
import styles from "./TemperatureWidget.module.css";
import { SensorData } from "../../utils/mockApi";

interface TemperatureWidgetProps {
  data: SensorData[];
}

export function TemperatureWidget({ data }: TemperatureWidgetProps) {
  const [lastValidTemperature, setLastValidTemperature] = useState<
    string | number
  >("N/A");

  useEffect(() => {
    const latestTemperature = data
      .filter((sensor) => sensor.type === "temperature")
      .slice(-1)[0]?.value;

    if (latestTemperature !== undefined) {
      setLastValidTemperature(latestTemperature);
    }
  }, [data]);

  return (
    <div className={styles.tempWidget}>
      <Widget title="Temperature">
        <p>{lastValidTemperature}°C</p>
      </Widget>
    </div>
  );
}
