import { useCallback, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UserPlus } from "lucide-react";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { DataTable } from "@/admin/components/data-table/DataTable";
import type { ColumnDefinition } from "@/admin/components/data-table/types/column-types";
import { Button } from "@/components/ui/button";

import { CanditadosForm } from "../components/CanditadosForm";
import { GrupoFileToolbar } from "../components/GrupoFileToolbar";
import { GroupTableRowAction } from "../components/GroupTableRowAction";

type GrupoUsuarioRow = {
  id: number;
  nombre: string;
  correo: string;
  registrado: "Sí" | "No";
  evaluaciones: string[];
  completado: string;
};

const GRUPO_USUARIOS_DATA: GrupoUsuarioRow[] = [
  {
    id: 1,
    nombre: "Ana Martínez",
    correo: "ana.martinez@correo.com",
    registrado: "Sí",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1", "TP2"],
    completado: "4/6",
  },
  {
    id: 2,
    nombre: "Carlos Pérez",
    correo: "carlos.perez@correo.com",
    registrado: "Sí",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1"],
    completado: "3/6",
  },
  {
    id: 3,
    nombre: "Lucía Gómez",
    correo: "lucia.gomez@correo.com",
    registrado: "No",
    evaluaciones: ["TCG"],
    completado: "1/6",
  },
  {
    id: 4,
    nombre: "Jorge Ramírez",
    correo: "jorge.ramirez@correo.com",
    registrado: "Sí",
    evaluaciones: ["TCG", "TP1", "TP2"],
    completado: "3/6",
  },
  {
    id: 5,
    nombre: "Valeria Castro",
    correo: "valeria.castro@correo.com",
    registrado: "Sí",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1", "TP2"],
    completado: "4/6",
  },
  {
    id: 6,
    nombre: "Diego Torres",
    correo: "diego.torres@correo.com",
    registrado: "No",
    evaluaciones: ["CI - VERSION D", "TP2"],
    completado: "2/6",
  },
  {
    id: 7,
    nombre: "Fernanda Ruiz",
    correo: "fernanda.ruiz@correo.com",
    registrado: "Sí",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1", "TP2"],
    completado: "4/6",
  },
  {
    id: 8,
    nombre: "Miguel Herrera",
    correo: "miguel.herrera@correo.com",
    registrado: "Sí",
    evaluaciones: ["TCG", "TP1"],
    completado: "2/6",
  },
];

export const GrupoCandidatosPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateCandidate = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);

  const handleOperationalReport = useCallback(
    (userId: number) => {
      navigate(`/admin/grupos/${id}/informe-operativo/${userId}`);
    },
    [id, navigate],
  );

  const handleViewCandidateDetails = useCallback(
    (userId: number) => {
      navigate(`/admin/grupos/${id}/candidatos/${userId}`);
    },
    [id, navigate],
  );

  const columns = useMemo<ColumnDefinition<GrupoUsuarioRow>[]>(
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
        key: "correo",
        header: "CORREO",
        className: "w-[240px]",
        cell: (row) => row.correo,
      },
      {
        key: "registrado",
        header: "REGISTRADO",
        className: "w-[120px]",
        cell: (row) => row.registrado,
      },
      {
        key: "evaluaciones",
        header: "EVALUACIONES",
        className: "w-[320px] whitespace-normal leading-snug",
        cell: (row) => row.evaluaciones.join(", "),
      },
      {
        key: "completado",
        header: "COMPLETADO",
        className: "w-[120px]",
        cell: (row) => row.completado,
      },
      {
        key: "actions",
        header: "",
        className: "w-[180px]",
        cell: (row) => (
          <GroupTableRowAction
            onView={() => handleViewCandidateDetails(row.id)}
            onOperationalReport={() => handleOperationalReport(row.id)}
            onDiscResult={() => console.log("disc result", row.id)}
            onEmail={() => console.log("send email", row.id)}
            viewLabel={`Ver candidato ${row.nombre}`}
            operationalReportLabel={`Ver informe operativo de ${row.nombre}`}
            discResultLabel={`Ver resultado DISC de ${row.nombre}`}
            emailLabel={`Enviar email a ${row.nombre}`}
          />
        ),
      },
    ],
    [handleOperationalReport, handleViewCandidateDetails],
  );

  return (
    <section>
      <div className="mb-4 rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AdminTitle
            title="Candidatos"
            subtitle="Listado de candidatos asociados al grupo seleccionado."
          />
          <Button
            type="button"
            onClick={handleCreateCandidate}
            className="border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600"
          >
            <UserPlus className="h-4 w-4" />
            Agregar candidato
          </Button>
        </div>
      </div>

      <GrupoFileToolbar
        onPdfClick={() => console.log("export pdf")}
        onExcelClick={() => console.log("export excel")}
        onWordClick={() => console.log("export word")}
      />

      <DataTable
        data={GRUPO_USUARIOS_DATA}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay usuarios en este grupo"
      />

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Agregar candidato"
            className="max-h-[88vh] w-full max-w-3xl"
          >
            <CanditadosForm onRequestClose={handleCloseCreateModal} />
          </div>
        </div>
      )}
    </section>
  );
};
