import { useState, useEffect } from "react";
import { fetchSensorData, SensorData } from "../utils/mockApi";

export const useSensorData = (interval: number = 5000) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await fetchSensorData(); // Await the promise
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching sensor data:", err);
        if (isMounted) setError("Error fetching data");
      }
    };

    fetchData(); // Fetch immediately
    const intervalId = setInterval(fetchData, interval); // Fetch at intervals

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [interval]);

  return { data, error };
};
