// import { useEffect, useState } from "react";
// import { fetchSensorData, SensorData } from "./utils/mockApi";

function App() {
  // const [sensorData, setSensorData] = useState<SensorData[]>([]);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = () => {
  //     fetchSensorData()
  //       .then((data) => {
  //         setSensorData(data);
  //         setError(null); // Clear previous errors
  //       })
  //       .catch((err) => setError(err.message));
  //   };

  //   fetchData(); // Fetch data initially

  //   const interval = setInterval(fetchData, 2000); // Fetch new data every 2 seconds

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, []);

  return (
    <div>
      {/* <h1>Real-Time Sensor Dashboard</h1>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <ul>
        {sensorData.map((sensor) => (
          <li key={sensor.id}>
            <strong>{sensor.type}:</strong> {sensor.value} ({sensor.timestamp})
          </li>
        ))}
      </ul> */}
    </div>
  );
}

export default App;
