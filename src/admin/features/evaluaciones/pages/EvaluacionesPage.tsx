import { useCallback, useMemo, useState } from "react";
import { ClipboardPlus, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { ModalCancelar } from "@/admin/components/ModalCancelar";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";
import type { EvaluacionRow } from "./types/evaluationes-types";
import { TableToolbar } from "@/admin/components/TableToolbar";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";

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
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleEdit = useCallback((id: number) => {
    console.log("edit", id);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setDeleteTargetId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteTargetId === null) {
      return;
    }

    console.log("delete", deleteTargetId);
    setDeleteTargetId(null);
  }, [deleteTargetId]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteTargetId(null);
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
        className: "w-[96px]",
        cell: (row) => (
          <div className="flex justify-around">
            <Button
              variant="ghost"
              size="icon"
              className="text-corp-gray-500 hover:bg-brand-100 hover:text-brand-500"
              onClick={() => handleEdit(row.id)}
              aria-label={`Editar evaluación ${row.nombre}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-corp-gray-500 hover:bg-destructive/10 hover:text-destructive"
              onClick={() => handleDelete(row.id)}
              aria-label={`Eliminar evaluación ${row.nombre}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit],
  );

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-start sm:justify-between md:items-center">
        <AdminTitle
          title="Evaluaciones"
          subtitle="Consulta y administra las evaluaciones disponibles."
        />

        <Button
          asChild
          size="sm"
          className="w-full gap-2 border border-brand-600/40 bg-brand-500 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md focus-visible:ring-brand-100 sm:w-auto"
        >
          <Link to="form" className="flex items-center justify-center gap-2">
            <ClipboardPlus className="h-4 w-4" />
            Agregar evaluación
          </Link>
        </Button>
      </div>
      <TableToolbar />
      <DataTable
        data={EVALUACIONES_DATA}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay evaluaciones registradas"
      />
      <CustomPagination totalPages={3} />

      <ModalCancelar
        isOpen={deleteTargetId !== null}
        title="¿Eliminar evaluación?"
        description="Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </section>
  );
};
