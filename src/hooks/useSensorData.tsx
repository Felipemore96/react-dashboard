import { useState, useEffect } from "react";
import { fetchSensorData, SensorData } from "../utils/mockApi";

// Custom hook to fetch sensor data at a specified interval
// interval (in milliseconds) at which to fetch data
// returns An object containing the fetched data and errors
export const useSensorData = (interval: number = 5000) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSensorData();
        setData((prevData) => {
          const newData = [...prevData, ...result];
          return newData.slice(-500); // Keep only the last 500 data points
        });
        setError(null);
      } catch (err) {
        console.error("Intentional Simulated Error:", err);
        setError("Failed to fetch sensor data.");
      }
    };

    fetchData(); // initial fetch
    const intervalId = setInterval(fetchData, interval);

    // cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  return { data, error };
};
