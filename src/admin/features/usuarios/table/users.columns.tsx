import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { TableRowActions } from "@/admin/components/TableRowActions";
import { formatTipo } from "../formatters/user.format";
import type { UserRow } from "../types/usuarios-types";

type BuildUserColumnsParams = {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const buildUserColumns = ({
  onEdit,
  onDelete,
}: BuildUserColumnsParams): ColumnDefinition<UserRow>[] => [
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
    cell: (row) => (
      <span
        className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${
          row.estado === "Activo"
            ? "border-green-200 bg-green-100 text-green-700"
            : "border-red-200 bg-red-100 text-red-700"
        }`}
      >
        <span
          className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
            row.estado === "Activo" ? "bg-green-600" : "bg-red-600"
          }`}
        />
        {row.estado}
      </span>
    ),
  },
  {
    key: "actions",
    header: "",
    className: "w-[96px]",
    cell: (row) => (
      <TableRowActions
        onEdit={() => onEdit(row.id)}
        onDelete={() => onDelete(row.id)}
        editLabel={`Editar usuario ${row.nombre}`}
        deleteLabel={`Eliminar usuario ${row.nombre}`}
      />
    ),
  },
];
