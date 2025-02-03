# **Real-Time Dashboard** by Felipe Moreira

### Overview

A React-based dashboard that visualizes real-time sensor data (temperature, humidity, and pressure) using a simulated API. Built with React, TypeScript, and Recharts, the dashboard is fully responsive and includes configurable widgets, error handling, and bonus features like a combined graph with toggleable data types.

### Features

- Real-Time Data: Displays live sensor data with dynamic updates.
- Configurable Widgets: Enable/disable widgets for temperature, humidity, and pressure.
- Side Panel: Adjust the real-time interval (1s to 9s) and toggle widgets.
- Error Handling: Simulates API errors and displays notifications.
- Bonus:
  - Configurable time range for graphs (1min, 5min, 10min).
  - Combined widget with toggleable temperature and humidity data.

### Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/Felipemore96/React-Dashboard
  cd React-Dashboard
  ```

2. Install dependencies:

  ```bash
  npm install
  # or
  yarn install
  ```

3. Run the app:
  ```bash
  npm run dev
  # or
  yarn dev
  ```

Open in your browser:

  ```bash
  http://localhost:5173
  ```

### Key Technologies

- React: For building the user interface.
- TypeScript: For type safety and better developer experience.
- Recharts: For creating responsive and interactive graphs.
- CSS Modules: For scoped and maintainable styling.

### Code Highlights

**Mock API**
Simulates real-time data with a 10% chance of errors:

  ```bash
  export const fetchSensorData = async (): Promise<SensorData[]> => {
    if (Math.random() < ERROR_CHANCE) {
      throw new Error("Failed to fetch sensor data");
    }
    return generateSensorData();
  };
  ```

**Custom Hook**
Fetches and manages sensor data:

  ```bash
  export const useSensorData = (interval: number = 5000) => {
    const [data, setData] = useState<SensorData[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const result = await fetchSensorData();
          setData((prevData) => [...prevData, ...result].slice(-100));
          setError(null);
        } catch (err) {
          setError("Failed to fetch sensor data. Please try again later.");
        }
      };
  
      fetchData();
      const intervalId = setInterval(fetchData, interval);
      return () => clearInterval(intervalId);
    }, [interval]);
  
    return { data, error };
  };
  ```

**Reusable Widget Component**
Supports small and large sizes:

  ```bash
  export function Widget({ title, children, size = "small" }: WidgetProps) {
    return (
      <div className={`${styles.widget} ${styles[size]}`}>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    );
  }
  ```

### Conclusion

This project showcases my ability to build a professional, responsive, and user-friendly dashboard using modern web technologies. It highlights my skills in React, TypeScript, and data visualization, as well as my attention to detail and commitment to clean, maintainable code.
