import { useMemo } from "react";
import { UserPlus } from "lucide-react";
import { Link } from "react-router";
import { AdminTitle } from "@/admin/components/AdminTitle";
import { ModalCancelar } from "@/admin/components/ModalCancelar";
import { DataTable } from "@/admin/components/data-table/DataTable";
import { TableToolbar } from "@/admin/components/TableToolbar";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { useUsuariosPage } from "../hooks/useUsuarios";
import { buildUserColumns } from "../table/users.columns";

export const UsuariosPage = () => {
  const {
    searchTerm,
    rowsPerPage,
    currentPage,
    deleteTargetId,
    filteredData,
    handleSearchChange,
    handleRowsPerPageChange,
    handlePageChange,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCloseDeleteModal,
  } = useUsuariosPage();

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

  const columns = useMemo(
    () => buildUserColumns({ onEdit: handleEdit, onDelete: handleDelete }),
    [handleDelete, handleEdit],
  );

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-start sm:justify-between md:items-center">
        <AdminTitle
          title="Usuarios"
          subtitle="Consulta y administra los usuarios disponibles."
        />

        <Button
          asChild
          size="sm"
          className="w-full gap-2 border border-brand-600/40 bg-brand-500 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md focus-visible:ring-brand-100 sm:w-auto"
        >
          <Link to="form" className="flex items-center justify-center gap-2">
            <UserPlus className="h-4 w-4" />
            Agregar usuario
          </Link>
        </Button>
      </div>
      <TableToolbar
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        value={searchTerm}
        onChange={handleSearchChange}
        inputId="buscar-usuarios"
        placeholder="Buscar usuarios..."
      />
      <DataTable
        data={paginatedData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay usuarios registrados"
      />
      <CustomPagination
        totalPages={totalPages}
        currentPage={safeCurrentPage}
        onPageChange={handlePageChange}
      />

      <ModalCancelar
        isOpen={deleteTargetId !== null}
        title="¿Eliminar usuario?"
        description="Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </section>
  );
};
