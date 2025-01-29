export type SensorType = "temperature" | "humidity" | "pressure";

export interface SensorData {
  id: number;
  type: SensorType;
  value: number;
  timestamp: string;
}

// Generates random sensor data

const generateSensorData = (): SensorData[] => {
  const types: SensorType[] = ["temperature", "humidity", "pressure"];

  return types.map((type, index) => ({
    id: index + 1,
    type,
    value: parseFloat(
      (Math.random() * (type === "temperature" ? 40 : 100)).toFixed(2)
    ),
    timestamp: new Date().toISOString(),
  }));
};

// Simulates an API call with a 10% chance of failure.

const errorChance: number = 0.1;
export const fetchSensorData = (): Promise<SensorData[]> => {
  return new Promise((resolve, reject) => {
    if (Math.random() < errorChance) {
      reject(new Error("Failed to fetch sensor data"));
    } else {
      resolve(generateSensorData());
    }
  });
};
