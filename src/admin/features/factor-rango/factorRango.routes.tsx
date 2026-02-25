import type { RouteObject } from "react-router";
import { FactorRangoPage } from "./pages/FactorRangoPage";
import { FactorRangoFormPage } from "./pages/FactorRangoFormPage";
export const factorRango: RouteObject[] = [
  {
    path: "factor-rango",
    children: [
      { index: true, element: <FactorRangoPage /> },
      { path: "form", element: <FactorRangoFormPage /> },
    ],
  },
];
