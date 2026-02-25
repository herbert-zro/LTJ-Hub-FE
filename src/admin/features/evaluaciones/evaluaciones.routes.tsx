import type { RouteObject } from "react-router";
import { EvaluacionesPage } from "./pages/EvaluacionesPage";
import { EvaluacionesFormPage } from "./pages/EvaluacionesFormPage";

export const evaluacionesRoutes: RouteObject[] = [
  {
    path: "evaluaciones",
    children: [
      { index: true, element: <EvaluacionesPage /> },
      { path: "form", element: <EvaluacionesFormPage /> },
    ],
  },
];
