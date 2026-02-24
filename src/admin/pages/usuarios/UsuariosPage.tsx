import { useCallback, useMemo, useState } from "react";
import { Pencil, UserPlus } from "lucide-react";
import { Link } from "react-router";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Searchbar } from "@/admin/components/Searchbar";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import type { UserRow } from "./types/usuarios-types";

const USUARIOS_DATA: UserRow[] = [
  {
    id: 1,
    nombre: "Juan Pérez",
    correo: "juan.perez@ltj.com",
    tipo: "admin",
    empresa: "LTJ El Salvador",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "María López",
    correo: "maria.lopez@ltj.com",
    tipo: "user",
    empresa: "LTJ Guatemala",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Carlos Díaz",
    correo: "carlos.diaz@ltj.com",
    tipo: "user",
    empresa: null,
    estado: "Inactivo",
  },
];

const formatTipo = (tipo: UserRow["tipo"]) => {
  switch (tipo) {
    case "admin":
      return "Administrador";
    case "user":
      return "Usuario";
    default:
      return tipo;
  }
};

export const UsuariosPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = useCallback((id: number) => {
    console.log("edit", id);
  }, []);

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return USUARIOS_DATA;
    }

    return USUARIOS_DATA.filter((user) => {
      const tipo = formatTipo(user.tipo).toLowerCase();

      return (
        user.id.toString().includes(query) ||
        user.nombre.toLowerCase().includes(query) ||
        user.correo.toLowerCase().includes(query) ||
        tipo.includes(query) ||
        (user.empresa ?? "").toLowerCase().includes(query) ||
        user.estado.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  const columns = useMemo<ColumnDefinition<UserRow>[]>(
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
        key: "correo",
        header: "CORREO",
        cell: (row) => row.correo,
      },
      {
        key: "tipo",
        header: "TIPO",
        className: "w-[160px]",
        cell: (row) => formatTipo(row.tipo),
      },
      {
        key: "empresa",
        header: "EMPRESA",
        className: "w-[180px]",
        cell: (row) => row.empresa ?? "-",
      },
      {
        key: "estado",
        header: "ESTADO",
        className: "w-[140px]",
        cell: (row) => row.estado,
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
              aria-label={`Editar usuario ${row.nombre}`}
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
      <div className="mb-2 flex items-center justify-between">
        <AdminTitle
          title="Usuarios"
          subtitle="Consulta y administra los usuarios disponibles."
        />

        <Button
          asChild
          size="sm"
          className="gap-2 border border-emerald-700/40 bg-emerald-600 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:ring-emerald-300"
        >
          <Link to="form">
            <UserPlus className="h-4 w-4" />
            Agregar usuario
          </Link>
        </Button>
      </div>
      <Searchbar
        value={searchTerm}
        onChange={setSearchTerm}
        inputId="buscar-usuarios"
        placeholder="Buscar usuarios..."
      />
      <DataTable
        data={filteredData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay usuarios registrados"
      />
      <CustomPagination totalPages={5} />
    </section>
  );
};
