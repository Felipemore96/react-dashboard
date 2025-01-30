import { TemperatureWidget } from "../components/TemperatureWidget";
import { HumidityWidget } from "../components/HumidityWidget.tsx";

export function Dashboard() {
  return (
    <div>
      Dashboard:
      <TemperatureWidget />
      <HumidityWidget />
    </div>
  );
}
