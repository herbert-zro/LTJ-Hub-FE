import type { RouteObject } from "react-router";
import { CandidatosPages } from "./pages/CandidatosPages";

export const candidatosRoutes: RouteObject[] = [
  {
    path: "candidatos",
    children: [{ index: true, element: <CandidatosPages /> }],
  },
];
