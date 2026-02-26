import { useCallback, useMemo, useState } from "react";
import { ListPlus } from "lucide-react";
import { Link } from "react-router";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { ModalCancelar } from "@/admin/components/ModalCancelar";
import { TableToolbar } from "@/admin/components/TableToolbar";
import { TableRowActions } from "@/admin/components/TableRowActions";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";
import type { FactorRangoRow } from "../types/factor-rango.types";

const FACTOR_RANGO_DATA: FactorRangoRow[] = [
  {
    id: 1,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Capacidad Intelectual",
    percentil: "0 - 39",
    estado: "Inferior al Término Medio",
    descripcion:
      "Los resultados obtenidos en la evaluación, permiten inferir que el/la evaluado/a posee una Capacidad Intelectual Inferior al Término Medio.",
  },
  {
    id: 2,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Capacidad Intelectual",
    percentil: "40 - 59",
    estado: "Término Medio",
    descripcion:
      "Los resultados obtenidos en la evaluación, permiten inferir que el/la evaluado/a posee una Capacidad Intelectual Término Medio.",
  },
  {
    id: 3,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Capacidad Intelectual",
    percentil: "60 - 74",
    estado: "Término Medio Tendiente Alta",
    descripcion:
      "Los resultados obtenidos en la evaluación, permiten inferir que el/la evaluado/a posee una Capacidad Intelectual Término Medio Tendiente Alta.",
  },
  {
    id: 4,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Capacidad Intelectual",
    percentil: "75 - 94",
    estado: "Superior al Término Medio",
    descripcion:
      "Los resultados obtenidos en la evaluación, permiten inferir que el/la evaluado/a posee una Capacidad Intelectual Superior al Término Medio.",
  },
  {
    id: 5,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Capacidad Intelectual",
    percentil: "95 - 100",
    estado: "Muy Superior",
    descripcion:
      "Los resultados obtenidos en la evaluación, permiten inferir que el/la evaluado/a posee una Capacidad Intelectual Muy Superior.",
  },
  {
    id: 6,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Comprensión Verbal",
    percentil: "0 - 49",
    estado: "Inferior a Promedio",
    descripcion:
      "En desarrollo de las destrezas para comprender ideas expresadas en palabras;",
  },
  {
    id: 7,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Comprensión Verbal",
    percentil: "50 - 55",
    estado: "Término Medio",
    descripcion:
      "Adecuadas destreza para comprender ideas expresadas en palabras;",
  },
  {
    id: 8,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Comprensión Verbal",
    percentil: "56 - 69",
    estado: "Término Medio Tendiente Alta",
    descripcion:
      "Buenas destreza para comprender ideas expresadas en palabras;",
  },
  {
    id: 9,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Comprensión Verbal",
    percentil: "70 - 74",
    estado: "Superior al Término Medio",
    descripcion:
      "Muy buenas destrezas para comprender ideas expresadas en palabras;",
  },
  {
    id: 10,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Comprensión Verbal",
    percentil: "75 - 100",
    estado: "Muy Superior",
    descripcion:
      "Excelentes destrezas para comprender ideas expresadas en palabras;",
  },
  {
    id: 11,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Concepción Espacial",
    percentil: "0 - 49",
    estado: "Inferior a Promedio",
    descripcion:
      "En desarrollo de las habilidades para concebir e imaginar objetos en dos o tres dimensiones;",
  },
  {
    id: 12,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Concepción Espacial",
    percentil: "50 - 55",
    estado: "Término Medio",
    descripcion:
      "Adecuadas habilidades para concebir e imaginar objetos en dos o tres dimensiones;",
  },
  {
    id: 13,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Concepción Espacial",
    percentil: "56 - 69",
    estado: "Término Medio Tendiente Alta",
    descripcion:
      "Buenas habilidades para concebir e imaginar objetos en dos o tres dimensiones;",
  },
  {
    id: 14,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Concepción Espacial",
    percentil: "70 - 74",
    estado: "Superior al Término Medio",
    descripcion:
      "Muy buenas habilidades para concebir e imaginar objetos en dos o tres dimensiones;",
  },
  {
    id: 15,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Concepción Espacial",
    percentil: "75 - 100",
    estado: "Muy Superior",
    descripcion:
      "Excelentes habilidades para concebir e imaginar objetos en dos o tres dimensiones;",
  },
  {
    id: 16,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Razonamiento",
    percentil: "0 - 49",
    estado: "Inferior a Promedio",
    descripcion:
      "En desarrollo de la capacidad para resolver problemas lógicos, prever y planear;",
  },
  {
    id: 17,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Razonamiento",
    percentil: "50 - 55",
    estado: "Término Medio",
    descripcion:
      "Adecuada capacidad para resolver problemas lógicos, prever y planear;",
  },
  {
    id: 18,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Razonamiento",
    percentil: "56 - 69",
    estado: "Término Medio Tendiente Alta",
    descripcion:
      "Buena capacidad para resolver problemas lógicos, prever y planear;",
  },
  {
    id: 19,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Razonamiento",
    percentil: "70 - 74",
    estado: "Superior al Término Medio",
    descripcion:
      "Muy buena capacidad para resolver problemas lógicos, prever y planear;",
  },
  {
    id: 20,
    tipoDeEvaluacion: "CAPACIDAD INTELECTUAL",
    factor: "Razonamiento",
    percentil: "75 - 100",
    estado: "Muy Superior",
    descripcion:
      "Excelente capacidad para resolver problemas lógicos, prever y planear;",
  },
];

export const FactorRangoPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleEdit = useCallback((id: number) => {
    console.log("edit", id);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setDeleteTargetId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (deleteTargetId === null) {
      return;
    }

    console.log("delete", deleteTargetId);
    setDeleteTargetId(null);
  }, [deleteTargetId]);

  const handleCloseDeleteModal = useCallback(() => {
    setDeleteTargetId(null);
  }, []);

  const filteredData = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return FACTOR_RANGO_DATA;
    }

    return FACTOR_RANGO_DATA.filter((row) => {
      return row.tipoDeEvaluacion.toLowerCase().includes(query);
    });
  }, [searchTerm]);

  const columns = useMemo<ColumnDefinition<FactorRangoRow>[]>(
    () => [
      {
        key: "tipoDeEvaluacion",
        header: "TIPO DE EVALUACIÓN",
        className: "w-[170px] whitespace-normal leading-snug",
        cell: (row) => row.tipoDeEvaluacion,
      },
      {
        key: "factor",
        header: "FACTOR",
        className: "w-[150px] whitespace-normal leading-snug",
        cell: (row) => row.factor,
      },
      {
        key: "percentil",
        header: "PERCENTIL",
        className: "w-[90px]",
        cell: (row) => row.percentil,
      },
      {
        key: "estado",
        header: "ESTADO",
        className: "w-[180px] whitespace-normal leading-snug",
        cell: (row) => row.estado,
      },
      {
        key: "descripcion",
        header: "DESCRIPCIÓN",
        className: "w-[300px] whitespace-normal leading-snug",
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
            editLabel={`Editar factor rango ${row.factor}`}
            deleteLabel={`Eliminar factor rango ${row.factor}`}
          />
        ),
      },
    ],
    [handleDelete, handleEdit],
  );

  return (
    <section>
      <div className="mb-4 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-start sm:justify-between md:items-center">
        <AdminTitle
          title="Factor Rango"
          subtitle="Consulta y administra los factores de rango disponibles."
        />

        <Button
          asChild
          size="sm"
          className="w-full gap-2 border border-brand-600/40 bg-brand-500 px-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md focus-visible:ring-brand-100 sm:w-auto"
        >
          <Link to="form" className="flex items-center justify-center gap-2">
            <ListPlus className="h-4 w-4" />
            Agregar factor rango
          </Link>
        </Button>
      </div>
      <TableToolbar
        value={searchTerm}
        onChange={setSearchTerm}
        inputId="buscar-factor-rango"
        placeholder="Buscar por tipo de evaluación..."
      />
      <DataTable
        data={filteredData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay factores de rango registrados"
      />
      <CustomPagination totalPages={3} />

      <ModalCancelar
        isOpen={deleteTargetId !== null}
        title="¿Eliminar factor de rango?"
        description="Esta acción no se puede deshacer."
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onClose={handleCloseDeleteModal}
      />
    </section>
  );
};
