import type { RouteObject } from "react-router";
import { EmpresaFormPage } from "./pages/EmpresaFormPage";
import { EmpresasPage } from "./pages/EmpresasPage";

export const empresasRoutes: RouteObject[] = [
  {
    path: "empresas",
    children: [
      { index: true, element: <EmpresasPage /> },
      { path: "form", element: <EmpresaFormPage /> },
    ],
  },
];
