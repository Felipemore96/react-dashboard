import { useState, useEffect } from "react";
import { fetchSensorData, SensorData } from "../utils/mockApi";

// Custom hook to fetch sensor data at a specified interval
// the interval (in milliseconds) at which to fetch data
// returns An object containing the fetched data and any error that occurred
export const useSensorData = (interval: number = 5000) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchSensorData();
        setData((prevData) => {
          const newData = [...prevData, ...result];
          return newData.slice(-100); // Keep only the last 100 data points
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        setError("Failed to fetch sensor data. Please try again later.");
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, interval);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  return { data, error };
};
