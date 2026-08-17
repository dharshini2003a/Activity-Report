// ============================================================
//  main.jsx  —  Entry Point
//  This is the file that React uses to START the whole app.
//  It mounts App.jsx into the <div id="root"> in index.html
// ============================================================

import { StrictMode } from "react";
import { createRoot }  from "react-dom/client";
import App             from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
