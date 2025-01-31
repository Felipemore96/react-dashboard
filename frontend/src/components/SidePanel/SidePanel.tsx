// import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

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
    <aside className="sidepanel">
      <h3>Settings</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={widgetState.temperature}
            onChange={() => toggleWidget("temperature")}
          />
          Temperature Widget
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={widgetState.humidity}
            onChange={() => toggleWidget("humidity")}
          />
          Humidity Widget
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={widgetState.pressure}
            onChange={() => toggleWidget("pressure")}
          />
          Pressure Widget
        </label>
      </div>
      <div>
        <label>Update Interval (seconds): </label>
        <input
          type="number"
          min="1"
          max="5"
          value={interval / 1000} // Convert ms to seconds
          onChange={(e) => setInterval(Number(e.target.value) * 1000)} // Convert seconds to ms
        />
      </div>
    </aside>
  );
}
