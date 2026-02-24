import { useCallback, useMemo, useState } from "react";
import { Pencil, UserPlus } from "lucide-react";
import { Link } from "react-router";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { Searchbar } from "@/admin/components/Searchbar";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";
import type { BitacoraRow } from "./types/bitacora-types";

const BITACORA_DATA: BitacoraRow[] = [
  {
    id: 1,
    usuario: "Juan Pérez",
    tabla: "usuarios",
    accion: "CREATE",
    registro: 2334,
    fechaDeGeneracion: "2026-02-20 09:30",
  },
  {
    id: 2,
    usuario: "María López",
    tabla: "evaluaciones",
    accion: "UPDATE",
    registro: 333,
    fechaDeGeneracion: "2026-02-20 11:15",
  },
  {
    id: 3,
    usuario: "Carlos Díaz",
    tabla: "correo_plantilla",
    accion: "DELETE",
    registro: 444,
    fechaDeGeneracion: "2026-02-21 14:05",
  },
];

export const BitacoraPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = useCallback((id: number) => {
    console.log("edit", id);
  }, []);

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return BITACORA_DATA;
    }

    return BITACORA_DATA.filter((row) => {
      return (
        row.id.toString().includes(query) ||
        row.usuario.toLowerCase().includes(query) ||
        row.tabla.toLowerCase().includes(query) ||
        row.accion.toLowerCase().includes(query) ||
        row.fechaDeGeneracion.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  const columns = useMemo<ColumnDefinition<BitacoraRow>[]>(
    () => [
      {
        key: "id",
        header: "ID",
        className: "w-[80px]",
        cell: (row) => row.id,
      },
      {
        key: "usuario",
        header: "USUARIO",
        className: "w-[180px]",
        cell: (row) => row.usuario,
      },
      {
        key: "tabla",
        header: "TABLA",
        className: "w-[160px]",
        cell: (row) => row.tabla,
      },
      {
        key: "accion",
        header: "ACCIÓN",
        className: "w-[120px]",
        cell: (row) => row.accion,
      },
      {
        key: "registro",
        header: "REGISTRO",
        cell: (row) => row.registro,
      },
      {
        key: "fechaDeGeneracion",
        header: "FECHA DE GENERACIÓN",
        className: "w-[180px]",
        cell: (row) => row.fechaDeGeneracion,
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
              aria-label={`Editar bitácora ${row.id}`}
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
          title="Bitácora"
          subtitle="Consulta y administra los registros de bitácora disponibles."
        />

        <Button
          asChild
          size="sm"
          className="gap-2 border border-emerald-700/40 bg-emerald-600 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:ring-emerald-300"
        >
          <Link to="form">
            <UserPlus className="h-4 w-4" />
            Agregar bitácora
          </Link>
        </Button>
      </div>
      <Searchbar
        value={searchTerm}
        onChange={setSearchTerm}
        inputId="buscar-bitacora"
        placeholder="Buscar en bitácora..."
      />
      <DataTable
        data={filteredData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay registros de bitácora"
      />
      <CustomPagination totalPages={5} />
    </section>
  );
};
