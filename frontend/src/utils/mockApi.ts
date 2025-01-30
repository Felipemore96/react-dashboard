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

  const ranges: Record<SensorType, [number, number]> = {
    temperature: [-10, 35], // Temperature range [°C]
    humidity: [30, 90], // Humidity range [%]
    pressure: [970, 1040], // Pressure range [hPa]
  };

  return types.map((type, index) => {
    const [min, max] = ranges[type];
    return {
      id: index + 1,
      type,
      value: parseFloat((Math.random() * (max - min) + min).toFixed(2)),
      timestamp: new Date().toISOString(),
    };
  });
};

// Simulates an API call with a 10% chance of failure.
// (Promise is unnecesary, just added to mock an actual api)
const errorChance = 0.1;
export const fetchSensorData = async (): Promise<SensorData[]> => {
  if (Math.random() < errorChance) {
    throw new Error("Failed to fetch sensor data");
  }
  return generateSensorData();
};
