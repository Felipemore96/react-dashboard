import { TemperatureWidget } from "../components/TemperatureWidget";
import { HumidityWidget } from "../components/HumidityWidget.tsx";
import { PressureWidget } from "../components/PressureWidget.tsx";

export function Dashboard() {
  return (
    <div>
      Dashboard:
      <TemperatureWidget />
      <HumidityWidget />
      <PressureWidget />
    </div>
  );
}
