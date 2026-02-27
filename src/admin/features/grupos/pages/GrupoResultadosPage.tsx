import { useMemo, useState } from "react";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ResultadoRow = {
  id: number;
  evaluacion: string;
  enlace: string;
  estado: "COMPLETADO" | "PENDIENTE";
  fechaGeneracion: string;
  fechaVencimiento: string;
};

const RESULTADOS_DATA: ResultadoRow[] = [
  {
    id: 1,
    evaluacion: "TCG",
    enlace: "#",
    estado: "COMPLETADO",
    fechaGeneracion: "2026-02-14 00:14:00",
    fechaVencimiento: "2027-02-14 00:14:00",
  },
  {
    id: 2,
    evaluacion: "CI - VERSION D",
    enlace: "#",
    estado: "COMPLETADO",
    fechaGeneracion: "2026-02-14 00:14:00",
    fechaVencimiento: "2027-02-14 00:14:00",
  },
  {
    id: 3,
    evaluacion: "CI - VERSION O",
    enlace: "#",
    estado: "COMPLETADO",
    fechaGeneracion: "2026-02-14 00:14:00",
    fechaVencimiento: "2027-02-14 00:14:00",
  },
  {
    id: 4,
    evaluacion: "AUTO",
    enlace: "#",
    estado: "PENDIENTE",
    fechaGeneracion: "2026-02-20 09:10:00",
    fechaVencimiento: "2027-02-20 09:10:00",
  },
  {
    id: 5,
    evaluacion: "TP1",
    enlace: "#",
    estado: "COMPLETADO",
    fechaGeneracion: "2026-02-14 00:14:00",
    fechaVencimiento: "2027-02-14 00:14:00",
  },
  {
    id: 6,
    evaluacion: "TP2",
    enlace: "#",
    estado: "COMPLETADO",
    fechaGeneracion: "2026-02-14 00:14:00",
    fechaVencimiento: "2027-02-14 00:14:00",
  },
];

const ALL_EVALUATIONS_VALUE = "ALL";

export const GrupoResultadosPage = () => {
  const [selectedEvaluation, setSelectedEvaluation] = useState(
    ALL_EVALUATIONS_VALUE,
  );
  const [appliedEvaluation, setAppliedEvaluation] = useState(
    ALL_EVALUATIONS_VALUE,
  );

  const evaluationOptions = useMemo(
    () =>
      [...new Set(RESULTADOS_DATA.map((row) => row.evaluacion))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [],
  );

  const filteredResults = useMemo(() => {
    if (appliedEvaluation === ALL_EVALUATIONS_VALUE) {
      return RESULTADOS_DATA;
    }

    return RESULTADOS_DATA.filter(
      (row) => row.evaluacion === appliedEvaluation,
    );
  }, [appliedEvaluation]);

  const columns = useMemo<ColumnDefinition<ResultadoRow>[]>(
    () => [
      {
        key: "evaluacion",
        header: "EVALUACIÓN",
        className: "w-[220px]",
        cell: (row) => row.evaluacion,
      },
      {
        key: "enlace",
        header: "ENLACE",
        className: "w-[180px]",
        cell: (row) => (
          <a
            href={row.enlace}
            className="text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700"
          >
            Abrir enlace
          </a>
        ),
      },

      {
        key: "fechaGeneracion",
        header: "FECHA DE GENERACIÓN",
        className: "w-[250px]",
        cell: (row) => row.fechaGeneracion,
      },
      {
        key: "fechaVencimiento",
        header: "FECHA DE VENCIMIENTO",
        className: "w-[250px]",
        cell: (row) => row.fechaVencimiento,
      },
    ],
    [],
  );

  return (
    <section>
      <div className="mb-4 rounded-xl border bg-white p-4">
        <AdminTitle
          title="Resultados"
          subtitle="Resumen de resultados del grupo seleccionado."
        />
      </div>

      <div className="mb-4 rounded-xl border border-corp-gray-200 bg-surface-card p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            value={selectedEvaluation}
            onValueChange={setSelectedEvaluation}
          >
            <SelectTrigger className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70 sm:flex-1">
              <SelectValue placeholder="Seleccione evaluación" />
            </SelectTrigger>
            <SelectContent className="border-corp-gray-200 bg-surface-card">
              <SelectGroup>
                <SelectItem
                  value={ALL_EVALUATIONS_VALUE}
                  className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                >
                  Todas las evaluaciones
                </SelectItem>
                {evaluationOptions.map((evaluation) => (
                  <SelectItem
                    key={evaluation}
                    value={evaluation}
                    className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                  >
                    {evaluation}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            type="button"
            onClick={() => setAppliedEvaluation(selectedEvaluation)}
            className="w-full border border-brand-700/40 bg-brand-700 text-white hover:bg-brand-800 sm:w-auto sm:min-w-24"
          >
            Buscar
          </Button>
        </div>
      </div>

      <DataTable
        data={filteredResults}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay resultados para la evaluación seleccionada"
      />
    </section>
  );
};
