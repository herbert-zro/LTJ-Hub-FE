import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ListPlus } from "lucide-react";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
import { TableRowActions } from "@/admin/components/TableRowActions";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { TableToolbar } from "@/admin/components/TableToolbar";
import { Button } from "@/components/ui/button";

import type { EmpresaUsuarioRow } from "../types/empresa.usuarios-types";

const EMPRESA_USUARIOS_DATA: EmpresaUsuarioRow[] = [
  { id: 1, nombre: "Ana Martínez", rol: "Administrador" },
  { id: 2, nombre: "Carlos Pérez", rol: "Supervisor" },
  { id: 3, nombre: "Lucía Gómez", rol: "Operador" },
  { id: 4, nombre: "Jorge Ramírez", rol: "Consulta" },
  { id: 5, nombre: "Valeria Castro", rol: "Operador" },
];

export const EmpresaUsuariosDetails = () => {
  const navigate = useNavigate();
  const { id: empresaId } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleEdit = (id: number) => {
    navigate(`/admin/empresas/${empresaId}/usuarios/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    console.log("delete user", id);
  };

  const columns = useMemo<ColumnDefinition<EmpresaUsuarioRow>[]>(
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
        key: "rol",
        header: "ROL",
        className: "w-[220px]",
        cell: (row) => row.rol,
      },
      {
        key: "actions",
        header: "",
        className: "w-[96px]",
        cell: (row) => (
          <TableRowActions
            onEdit={() => handleEdit(row.id)}
            onDelete={() => handleDelete(row.id)}
            editLabel={`Editar usuario ${row.nombre}`}
            deleteLabel={`Eliminar usuario ${row.nombre}`}
          />
        ),
      },
    ],
    [],
  );

  const filteredData = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return EMPRESA_USUARIOS_DATA;
    }

    return EMPRESA_USUARIOS_DATA.filter((usuario) => {
      return (
        usuario.id.toString().includes(normalizedQuery) ||
        usuario.nombre.toLowerCase().includes(normalizedQuery) ||
        usuario.rol.toLowerCase().includes(normalizedQuery)
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

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-start sm:justify-between md:items-center">
        <AdminTitle
          title="Usuarios"
          subtitle="Consulta y administra los usuarios de la empresa."
        />

        <Button
          asChild
          size="sm"
          className="w-full gap-2 border border-brand-600/40 bg-brand-500 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md focus-visible:ring-brand-100 sm:w-auto"
        >
          <Link to={`/admin/empresas/${empresaId}/usuarios/form`}>
            <ListPlus className="h-4 w-4" />
            Ingresar usuario
          </Link>
        </Button>
      </div>

      <TableToolbar
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        value={searchTerm}
        onChange={handleSearchChange}
        inputId="buscar-usuarios-empresa"
        placeholder="Buscar usuarios..."
      />

      <DataTable
        data={paginatedData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay usuarios registrados para esta empresa"
      />

      <CustomPagination
        totalPages={totalPages}
        currentPage={safeCurrentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};
