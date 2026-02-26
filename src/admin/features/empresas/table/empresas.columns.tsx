import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { TableRowActions } from "@/admin/components/TableRowActions";
import type { EmpresaRow } from "../types/empresas-types";

type BuildEmpresaColumnsParams = {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
};

export const buildEmpresaColumns = ({
  onEdit,
  onDelete,
  onViewDetails,
}: BuildEmpresaColumnsParams): ColumnDefinition<EmpresaRow>[] => [
  {
    key: "id",
    header: "ID",
    className: "w-[80px]",
    cell: (row) => row.id,
  },
  {
    key: "nombre",
    header: "NOMBRE",
    className: "w-[200px]",
    cell: (row) => row.nombre,
  },
  {
    key: "url",
    header: "URL",
    className: "w-[220px]",
    cell: (row) => row.url,
  },
  {
    key: "direccion",
    header: "DIRECCIÓN",
    className: "w-[220px]",
    cell: (row) => row.direccion,
  },
  {
    key: "telefono",
    header: "TELÉFONO",
    className: "w-[150px]",
    cell: (row) => row.telefono,
  },
  {
    key: "correo",
    header: "CORREO",
    className: "w-[220px]",
    cell: (row) => row.correo,
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
    className: "w-[140px]",
    cell: (row) => (
      <TableRowActions
        onViewDetails={() => onViewDetails(row.id)}
        viewDetailsLabel={`Ver detalle de empresa ${row.nombre}`}
        onEdit={() => onEdit(row.id)}
        onDelete={() => onDelete(row.id)}
        editLabel={`Editar empresa ${row.nombre}`}
        deleteLabel={`Eliminar empresa ${row.nombre}`}
      />
    ),
  },
];
