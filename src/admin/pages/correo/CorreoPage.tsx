import { useCallback, useMemo, useState } from "react";
import { Pencil, UserPlus } from "lucide-react";
import { Link } from "react-router";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { Searchbar } from "@/admin/components/Searchbar";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";
import type { CorreoRow } from "./types/correo-platilla.types";

const CORREO_DATA: CorreoRow[] = [
  {
    id: 1,
    tipo: "Bienvenida",
    asunto: "Bienvenido a LTJ Hub",
    empresa: "LTJ El Salvador",
  },
  {
    id: 2,
    tipo: "Recuperación",
    asunto: "Restablece tu contraseña",
    empresa: "LTJ Guatemala",
  },
  {
    id: 3,
    tipo: "Notificación",
    asunto: "Resultado de evaluación disponible",
    empresa: "LTJ Honduras",
  },
];

export const CorreoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = useCallback((id: number) => {
    console.log("edit", id);
  }, []);

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return CORREO_DATA;
    }

    return CORREO_DATA.filter((correo) => {
      return (
        correo.id.toString().includes(query) ||
        correo.tipo.toLowerCase().includes(query) ||
        correo.asunto.toLowerCase().includes(query) ||
        correo.empresa.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  const columns = useMemo<ColumnDefinition<CorreoRow>[]>(
    () => [
      {
        key: "id",
        header: "ID",
        className: "w-[80px]",
        cell: (row) => row.id,
      },
      {
        key: "tipo",
        header: "TIPO",
        className: "w-[180px]",
        cell: (row) => row.tipo,
      },
      {
        key: "asunto",
        header: "ASUNTO",
        cell: (row) => row.asunto,
      },
      {
        key: "empresa",
        header: "EMPRESA",
        className: "w-[200px]",
        cell: (row) => row.empresa,
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
              aria-label={`Editar plantilla ${row.asunto}`}
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
          title="Correo"
          subtitle="Consulta y administra las plantillas de correo disponibles."
        />

        <Button
          asChild
          size="sm"
          className="gap-2 border border-emerald-700/40 bg-emerald-600 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md focus-visible:ring-emerald-300"
        >
          <Link to="form">
            <UserPlus className="h-4 w-4" />
            Agregar correo
          </Link>
        </Button>
      </div>
      <Searchbar
        value={searchTerm}
        onChange={setSearchTerm}
        inputId="buscar-correo"
        placeholder="Buscar plantillas de correo..."
      />
      <DataTable
        data={filteredData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay plantillas de correo registradas"
      />
      <CustomPagination totalPages={5} />
    </section>
  );
};
