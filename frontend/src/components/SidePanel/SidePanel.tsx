import { Dispatch, SetStateAction } from "react";
import styles from "./SidePanel.module.css";

interface SidePanelProps {
  widgetState: { temperature: boolean; humidity: boolean; pressure: boolean };
  setWidgetState: Dispatch<
    SetStateAction<{
      temperature: boolean;
      humidity: boolean;
      pressure: boolean;
    }>
  >;
  interval: number;
  setInterval: Dispatch<SetStateAction<number>>;
}

export function SidePanel({
  widgetState,
  setWidgetState,
  interval,
  setInterval,
}: SidePanelProps) {
  const toggleWidget = (widget: keyof typeof widgetState) => {
    setWidgetState((prevState) => ({
      ...prevState,
      [widget]: !prevState[widget],
    }));
  };

  return (
    <aside className={styles.sidepanel}>
      <h2 className="mb-10">Settings</h2>
      <div className={styles.settingsLine}>
        <label>Temperature Widget</label>
        <input
          type="checkbox"
          checked={widgetState.temperature}
          onChange={() => toggleWidget("temperature")}
        />
      </div>
      <div className={styles.settingsLine}>
        <label>Humidity Widget</label>
        <input
          type="checkbox"
          checked={widgetState.humidity}
          onChange={() => toggleWidget("humidity")}
        />
      </div>
      <div className={styles.settingsLine}>
        <label>Pressure Widget</label>
        <input
          type="checkbox"
          checked={widgetState.pressure}
          onChange={() => toggleWidget("pressure")}
        />
      </div>
      <div className={styles.intervalLine}>
        <label>Real-Time Interval: </label>
        <div className="flex justify-between">
          1
          <input
            type="range"
            min="1"
            max="5"
            value={interval / 1000}
            onChange={(e) => setInterval(Number(e.target.value) * 1000)}
          />
          5
        </div>
      </div>
    </aside>
  );
}
