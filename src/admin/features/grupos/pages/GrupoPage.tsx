import { useCallback, useMemo, useState } from "react";
import { UsersRound } from "lucide-react";
import { Link, useNavigate } from "react-router";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { ModalCancelar } from "@/admin/components/ModalCancelar";
import { TableRowActions } from "@/admin/components/TableRowActions";
import { TableToolbar } from "@/admin/components/TableToolbar";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";

import type { GruposRow } from "../types/grupos-types";

const GRUPOS_DATA: GruposRow[] = [
  { id: 1, nombre: "Grupo Operativo A", empresa: "LTJ El Salvador" },
  { id: 2, nombre: "Grupo Operativo B", empresa: "LTJ Guatemala" },
  { id: 3, nombre: "Grupo Comercial", empresa: "LTJ Honduras" },
  { id: 4, nombre: "Grupo Talento", empresa: "LTJ El Salvador" },
  { id: 5, nombre: "Grupo Soporte", empresa: "LTJ Panamá" },
  { id: 6, nombre: "Grupo Reclutamiento", empresa: "LTJ Costa Rica" },
  { id: 7, nombre: "Grupo Evaluación", empresa: "LTJ Nicaragua" },
  { id: 8, nombre: "Grupo Analítica", empresa: "LTJ Guatemala" },
  { id: 9, nombre: "Grupo Innovación", empresa: "LTJ El Salvador" },
  { id: 10, nombre: "Grupo Regional", empresa: "LTJ Honduras" },
];

export const GrupoPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleRowsPerPageChange = useCallback((value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  const handleEdit = useCallback(
    (id: number) => {
      navigate(`/admin/grupos/${id}/edit`);
    },
    [navigate],
  );

  const handleViewDetails = useCallback(
    (id: number) => {
      navigate(`/admin/grupos/${id}`);
    },
    [navigate],
  );

  const handleDelete = useCallback((id: number) => {
    setDeleteTargetId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteTargetId === null) {
      return;
    }

    console.log("delete group", deleteTargetId);
    setDeleteTargetId(null);
  }, [deleteTargetId]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteTargetId(null);
  }, []);

  const filteredData = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return GRUPOS_DATA;
    }

    return GRUPOS_DATA.filter((group) => {
      return (
        group.id.toString().includes(normalizedQuery) ||
        group.nombre.toLowerCase().includes(normalizedQuery) ||
        group.empresa.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [searchTerm]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filteredData.length / rowsPerPage)),
    [filteredData.length, rowsPerPage],
  );

  const safeCurrentPage = useMemo(
    () => Math.min(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const paginatedData = useMemo(() => {
    const start = (safeCurrentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, rowsPerPage, safeCurrentPage]);

  const columns = useMemo<ColumnDefinition<GruposRow>[]>(
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
        className: "w-[220px]",
        cell: (row) => row.nombre,
      },
      {
        key: "empresa",
        header: "EMPRESA",
        cell: (row) => row.empresa,
      },
      {
        key: "actions",
        header: "",
        className: "w-[96px]",
        cell: (row) => (
          <TableRowActions
            onViewDetails={() => handleViewDetails(row.id)}
            viewDetailsLabel={`Ver detalle de grupo ${row.nombre}`}
            onEdit={() => handleEdit(row.id)}
            onDelete={() => handleDelete(row.id)}
            editLabel={`Editar grupo ${row.nombre}`}
            deleteLabel={`Eliminar grupo ${row.nombre}`}
          />
        ),
      },
    ],
    [handleDelete, handleEdit, handleViewDetails],
  );

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-start sm:justify-between md:items-center">
        <AdminTitle
          title="Grupos"
          subtitle="Consulta y administra los grupos disponibles."
        />

        <Button
          asChild
          size="sm"
          className="w-full gap-2 border border-brand-600/40 bg-brand-500 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md focus-visible:ring-brand-100 sm:w-auto"
        >
          <Link to="form" className="flex items-center justify-center gap-2">
            <UsersRound className="h-4 w-4" />
            Agregar grupo
          </Link>
        </Button>
      </div>

      <TableToolbar
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        value={searchTerm}
        onChange={handleSearchChange}
        inputId="buscar-grupos"
        placeholder="Buscar grupos..."
      />

      <DataTable
        data={paginatedData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay grupos registrados"
      />

      <CustomPagination
        totalPages={totalPages}
        currentPage={safeCurrentPage}
        onPageChange={handlePageChange}
      />

      <ModalCancelar
        isOpen={deleteTargetId !== null}
        title="¿Eliminar grupo?"
        description="Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </section>
  );
};
