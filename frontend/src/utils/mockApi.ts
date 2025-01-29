export type SensorType = "temperature" | "humidity" | "pressure";

export interface SensorData {
  id: number;
  type: SensorType;
  value: number;
  timestamp: string;
}
