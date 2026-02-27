import { useMemo } from "react";
import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
import { DataTable } from "@/admin/components/data-table/DataTable";
import { TableToolbar } from "@/admin/components/TableToolbar";
import { useCandidatosPage } from "../hooks/useCandidatos";
import { buildCandidatosColumns } from "../table/candidatos.columns";

export const CandidatosPages = () => {
  const {
    searchTerm,
    rowsPerPage,
    currentPage,
    filteredData,
    handleSearchChange,
    handleRowsPerPageChange,
    handlePageChange,
  } = useCandidatosPage();

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

  const columns = useMemo(() => buildCandidatosColumns(), []);

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-start sm:justify-between md:items-center">
        <AdminTitle
          title="Candidatos"
          subtitle="Consulta y administra los candidatos disponibles."
        />
      </div>

      <TableToolbar
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        value={searchTerm}
        onChange={handleSearchChange}
        inputId="buscar-candidatos"
        placeholder="Buscar candidatos..."
      />

      <DataTable
        data={paginatedData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay candidatos registrados"
      />

      <CustomPagination
        totalPages={totalPages}
        currentPage={safeCurrentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};
