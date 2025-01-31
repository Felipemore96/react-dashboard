import { createRoot } from "react-dom/client";
import App from "./App";
// @ts-expect-error missing type declarations for the font used
import "@fontsource/roboto";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
