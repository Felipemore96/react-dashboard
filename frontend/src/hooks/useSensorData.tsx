import { useState, useEffect } from "react";
import { fetchSensorData, SensorData } from "../utils/mockApi";

export const useSensorData = (interval: number = 5000) => {
  // Create state variables to keep track across renders
  const [data, setData] = useState<SensorData[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Runs after initial render and every time interval changes
  useEffect(() => {
    let isMounted = true;

    // Async because fetch was made as a Promise to mock a real API
    const fetchData = async () => {
      try {
        const result = await fetchSensorData(); // Get new data batch
        if (isMounted) {
          setData((prevData) => [...prevData, ...result]); // Append new data
          setError(null);
        }
      } catch (err) {
        console.log(err);
        if (isMounted) setError("Error fetching data");
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, interval); // Continue fatching at intervals

    // Returns a cleanup function if component unmounts
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [interval]);

  return { data, error };
};
