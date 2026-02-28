import { Download, Mail, MessageCircle } from "lucide-react";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { CandidatoViewCommand } from "../components/CandidatoViewCommand";
import type { CandidatoRow } from "../types/candidatos-types";

type BuildCandidatosColumnsParams = {
  onViewCv: (row: CandidatoRow) => void;
};

export const buildCandidatosColumns = ({
  onViewCv,
}: BuildCandidatosColumnsParams): ColumnDefinition<CandidatoRow>[] => [
  {
    key: "nombre",
    header: "NOMBRE",
    className: "w-[220px]",
    cell: (row) => (
      <div className="inline-flex items-center gap-2">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            row.estado === "Activo" ? "bg-green-600" : "bg-red-600"
          }`}
        />
        <span>{row.nombre}</span>
      </div>
    ),
  },
  {
    key: "usuario",
    header: "USUARIO",
    className: "w-[140px]",
    cell: (row) => row.usuario,
  },

  {
    key: "correo",
    header: "CORREO",
    className: "w-[240px]",
    cell: (row) => row.correo,
  },

  {
    key: "documento",
    header: "DOCUMENTO",
    className: "w-[130px]",
    cell: (row) => row.documento,
  },
  {
    key: "telefono",
    header: "TELÉFONO",
    className: "w-[130px]",
    cell: (row) => row.telefono,
  },
  {
    key: "tipoRegistro",
    header: "TIPO DE REGISTRO",
    className: "w-[180px]",
    cell: (row) => {
      const isEmail = row.tipoRegistro === "email";

      return (
        <span
          className={`inline-flex items-center gap-2 font-medium ${
            isEmail ? "text-blue-500" : "text-green-500"
          }`}
        >
          {isEmail ? (
            <Mail className="h-4 w-4" />
          ) : (
            <MessageCircle className="h-4 w-4" />
          )}
          {isEmail ? "Email" : "WhatsApp"}
        </span>
      );
    },
  },
  {
    key: "empresa",
    header: "EMPRESA",
    className: "w-[180px]",
    cell: (row) => row.empresa,
  },
  {
    key: "estadoRegistro",
    header: "ESTADO DE REGISTRO",
    className: "w-[170px]",
    cell: (row) => (
      <span
        className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${
          row.estadoRegistro === "Completado"
            ? "border-green-200 bg-green-100 text-green-700"
            : "border-yellow-200 bg-yellow-100 text-yellow-700"
        }`}
      >
        <span
          className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
            row.estadoRegistro === "Completado"
              ? "bg-green-600"
              : "bg-yellow-600"
          }`}
        />
        {row.estadoRegistro}
      </span>
    ),
  },
  /* {
    key: "curriculum",
    header: "CURRICULUM",
    className: "w-[130px]",
    cell: (row) => (
      <a
        href={row.curriculumUrl}
        download
        className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700"
      >
        <Download className="h-4 w-4" />
        Descargar
      </a>
    ),
  }, */
  {
    key: "actions",
    header: "",
    className: "w-[90px] text-center",
    cell: (row) => (
      <div className="flex justify-center">
        <CandidatoViewCommand
          onView={() => onViewCv(row)}
          viewLabel={`Ver candidato ${row.nombre}`}
        />
      </div>
    ),
  },
];
