import type { RouteObject } from "react-router";
import { BitacoraPage } from "./pages/BitacoraPage";
import { BitacoraFormPage } from "./pages/BitacoraFormPage";

export const bitacoraRoutes: RouteObject[] = [
  {
    path: "bitacora",
    children: [
      { index: true, element: <BitacoraPage /> },
      { path: "form", element: <BitacoraFormPage /> },
    ],
  },
];
