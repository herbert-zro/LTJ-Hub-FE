import { useCallback, useMemo } from "react";
import { Pencil } from "lucide-react";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";
import type { EvaluacionRow } from "./types/evaluationes-types";

const EVALUACIONES_DATA: EvaluacionRow[] = [
  { id: 1, nombre: "TCG", tipo: 1, indicador: null },
  { id: 2, nombre: "CI - VERSION D", tipo: 1, indicador: 1 },
  { id: 3, nombre: "TEST DE PERSONALIDAD", tipo: 2, indicador: 3 },
];

const formatTipo = (tipo: number) => {
  switch (tipo) {
    case 1:
      return "General";
    case 2:
      return "Especializada";
    default:
      return `Tipo ${tipo}`;
  }
};

export const EvaluacionesPage = () => {
  const handleEdit = useCallback((id: number) => {
    console.log("edit", id);
  }, []);

  const columns = useMemo<ColumnDefinition<EvaluacionRow>[]>(
    () => [
      {
        key: "id",
        header: "ID",
        className: "w-[80px]",
        cell: (row) => row.id,
      },
      {
        key: "nombre",
        header: "NOMBRE",
        cell: (row) => row.nombre,
      },
      {
        key: "tipo",
        header: "TIPO",
        className: "w-[180px]",
        cell: (row) => formatTipo(row.tipo),
      },
      {
        key: "indicador",
        header: "INDICADOR",
        className: "w-[140px]",
        cell: (row) => row.indicador ?? "-",
      },
      {
        key: "actions",
        header: "",
        className: "w-[120px] text-right",
        cell: (row) => (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleEdit(row.id)}
              aria-label={`Editar evaluación ${row.nombre}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [handleEdit],
  );

  return (
    <section>
      <AdminTitle
        title="Evaluaciones"
        subtitle="Consulta y administra las evaluaciones disponibles."
      />

      <DataTable
        data={EVALUACIONES_DATA}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay evaluaciones registradas"
      />
    </section>
  );
};
