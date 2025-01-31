import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@cloudscape-design/global-styles/index.css";
import { AppCloudscape } from "./AppCloudscape.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppCloudscape />
  </StrictMode>
);
