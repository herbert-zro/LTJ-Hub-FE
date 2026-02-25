import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LTJHubApp } from "./app/providers/LTJHubApp.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LTJHubApp />
  </StrictMode>,
);
