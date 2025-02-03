export type SensorType = "temperature" | "humidity" | "pressure";

export interface SensorData {
  id: number;
  type: SensorType;
  value: number;
  timestamp: string;
}

// Define ranges for each sensor type
const SENSOR_RANGES: Record<SensorType, [number, number]> = {
  temperature: [-10, 35], // Temperature range [°C]
  humidity: [30, 90], // Humidity range [%]
  pressure: [970, 1040], // Pressure range [hPa]
};

// Generates a single sensor data point
const generateSensorDataPoint = (type: SensorType, id: number): SensorData => {
  const [min, max] = SENSOR_RANGES[type];
  return {
    id,
    type,
    value: parseFloat((Math.random() * (max - min) + min).toFixed(0)),
    timestamp: new Date().toISOString(),
  };
};

// Generates an array of sensor data for all types
const generateSensorData = (): SensorData[] => {
  const types: SensorType[] = ["temperature", "humidity", "pressure"];
  return types.map((type, index) => generateSensorDataPoint(type, index + 1));
};

// Simulates an API call with a 10% chance of failure
const ERROR_CHANCE = 0.1;
export const fetchSensorData = async (): Promise<SensorData[]> => {
  if (Math.random() < ERROR_CHANCE) {
    throw new Error("Failed to fetch sensor data");
  }
  const data = generateSensorData();
  return data;
};
