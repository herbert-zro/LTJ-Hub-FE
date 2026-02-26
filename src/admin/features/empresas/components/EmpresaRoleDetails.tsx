import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ListPlus } from "lucide-react";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { TableRowActions } from "@/admin/components/TableRowActions";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";

import type { EmpresaRoleRow } from "../types/empresa.roles-types";

const EMPRESA_ROLES_DATA: EmpresaRoleRow[] = [
  {
    id: 1,
    nombre: "Administrador",
    descripcion: "Gestiona configuración general y usuarios de la empresa.",
  },
  {
    id: 2,
    nombre: "Supervisor",
    descripcion: "Supervisa procesos y revisa indicadores operativos.",
  },
  {
    id: 3,
    nombre: "Operador",
    descripcion: "Ejecuta tareas operativas y registra información diaria.",
  },
  {
    id: 4,
    nombre: "Consulta",
    descripcion: "Acceso de solo lectura a módulos habilitados.",
  },
];

export const EmpresaRoleDetails = () => {
  const navigate = useNavigate();
  const { id: empresaId } = useParams();

  const handleEdit = (roleId: number) => {
    navigate(`/admin/empresas/${empresaId}/roles/${roleId}/edit`);
  };

  const handleDelete = (id: number) => {
    console.log("delete role", id);
  };

  const columns = useMemo<ColumnDefinition<EmpresaRoleRow>[]>(
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
        key: "descripcion",
        header: "DESCRIPCIÓN",
        cell: (row) => row.descripcion,
      },
      {
        key: "actions",
        header: "",
        className: "w-[96px]",
        cell: (row) => (
          <TableRowActions
            onEdit={() => handleEdit(row.id)}
            onDelete={() => handleDelete(row.id)}
            editLabel={`Editar rol ${row.nombre}`}
            deleteLabel={`Eliminar rol ${row.nombre}`}
          />
        ),
      },
    ],
    [],
  );

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-start sm:justify-between md:items-center">
        <AdminTitle
          title="Roles"
          subtitle="Consulta y administra los roles de la empresa."
        />

        <Button
          asChild
          size="sm"
          className="w-full gap-2 border border-brand-600/40 bg-brand-500 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md focus-visible:ring-brand-100 sm:w-auto"
        >
          <Link to={`/admin/empresas/${empresaId}/roles/form`}>
            <ListPlus className="h-4 w-4" />
            Ingresar rol
          </Link>
        </Button>
      </div>

      <DataTable
        data={EMPRESA_ROLES_DATA}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay roles registrados para esta empresa"
      />
    </section>
  );
};
