import type { RouteObject } from "react-router";
import { EmpresasPage } from "./pages/EmpresasPage";

export const empresasRoutes: RouteObject[] = [
  {
    path: "empresas",
    children: [{ index: true, element: <EmpresasPage /> }],
  },
];
