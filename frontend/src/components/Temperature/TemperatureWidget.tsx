import { useSensorData } from "../../hooks/useSensorData";
import { Widget } from "../Widget/Widget";
import { useState, useEffect } from "react";

interface TemperatureWidgetProps {
  interval: number;
}

export function TemperatureWidget({ interval }: TemperatureWidgetProps) {
  const { data, error } = useSensorData(interval);
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
    <div className="widget">
      <Widget title="Temperature">
        <p>{lastValidTemperature}°C</p>
        {error && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Error retrieving temperature data
          </p>
        )}
      </Widget>
    </div>
  );
}
