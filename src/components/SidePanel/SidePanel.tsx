import { Dispatch, SetStateAction } from "react";
import styles from "./SidePanel.module.css";

interface SidePanelProps {
  widgetState: {
    temperature: boolean;
    humidity: boolean;
    pressure: boolean;
    combined: boolean;
  };
  setWidgetState: Dispatch<
    SetStateAction<{
      temperature: boolean;
      humidity: boolean;
      pressure: boolean;
      combined: boolean;
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
      <h2 className={styles.title}>Settings</h2>
      <div className={styles.settingsLine}>
        <label>Temperature</label>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={widgetState.temperature}
            onChange={() => toggleWidget("temperature")}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.settingsLine}>
        <label>Humidity</label>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={widgetState.humidity}
            onChange={() => toggleWidget("humidity")}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.settingsLine}>
        <label>Pressure</label>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={widgetState.pressure}
            onChange={() => toggleWidget("pressure")}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.settingsLine}>
        <label>Combined</label>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={widgetState.combined}
            onChange={() => toggleWidget("combined")}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
      <div className={styles.intervalLine}>
        <label>Real-Time Interval: {interval / 1000} s</label>
        <div className="flex justify-between">
          1
          <input
            type="range"
            min="1"
            max="9"
            value={interval / 1000}
            onChange={(e) => setInterval(Number(e.target.value) * 1000)}
          />
          9
        </div>
      </div>
    </aside>
  );
}
