import type { RouteObject } from "react-router";
import { GrupoFormPage } from "./pages/GrupoFormPage";
import { GrupoLayout } from "./layout/GrupoLayout";
import { GrupoCandidatosPage } from "./pages/GrupoCandidatosPage";
import { GrupoInformeOperativoPage } from "./pages/GrupoInformeOperativoPage";
import { GrupoPage } from "./pages/GrupoPage";
import { GrupoResultadosPage } from "./pages/GrupoResultadosPage";
import { GroupsCandidatosFormPage } from "./pages/GroupsCandidatosFormPage";
import { ComparativeChartPage } from "./pages/ComparativeChartPage";

export const gruposRoutes: RouteObject[] = [
  {
    path: "grupos",
    children: [
      { index: true, element: <GrupoPage /> },
      { path: "form", element: <GrupoFormPage /> },
      { path: ":groupId/edit", element: <GrupoFormPage /> },
      {
        path: ":id",
        element: <GrupoLayout />,
        children: [
          { index: true, element: <GrupoCandidatosPage /> },
          { path: "candidatos", element: <GrupoCandidatosPage /> },
          { path: "candidatos/form", element: <GroupsCandidatosFormPage /> },

          {
            path: "informe-operativo/:userId",
            element: <GrupoInformeOperativoPage />,
          },
          { path: "comparative-chart", element: <ComparativeChartPage /> },
          { path: "resultados", element: <GrupoResultadosPage /> },
        ],
      },
    ],
  },
];
