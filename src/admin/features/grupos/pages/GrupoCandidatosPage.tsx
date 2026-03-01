import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BarChart3, UserPlus } from "lucide-react";

import { AdminTitle } from "@/admin/components/AdminTitle";
import { TableToolbar } from "@/admin/components/TableToolbar";
import { CustomPagination } from "@/admin/components/custom/CustomPagination";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<number[]>(
    [],
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

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

  const handleCreateCandidate = useCallback(() => {
    setIsCreateModalOpen(true);
  }, []);

  const selectedCandidates = useMemo(
    () =>
      GRUPO_USUARIOS_DATA.filter((candidate) =>
        selectedCandidateIds.includes(candidate.id),
      ).map((candidate) => ({
        id: candidate.id,
        nombre: candidate.nombre,
      })),
    [selectedCandidateIds],
  );

  const canCompareCandidates = selectedCandidates.length >= 2;

  const handleGoToComparativeChart = useCallback(() => {
    if (!canCompareCandidates) {
      return;
    }

    navigate(`/admin/grupos/${id}/comparative-chart`, {
      state: {
        selectedCandidates,
      },
    });
  }, [canCompareCandidates, id, navigate, selectedCandidates]);

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

  const filteredData = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    if (!normalizedQuery) {
      return GRUPO_USUARIOS_DATA;
    }

    return GRUPO_USUARIOS_DATA.filter((candidate) => {
      return (
        candidate.id.toString().includes(normalizedQuery) ||
        candidate.nombre.toLowerCase().includes(normalizedQuery) ||
        candidate.correo.toLowerCase().includes(normalizedQuery) ||
        candidate.registrado.toLowerCase().includes(normalizedQuery) ||
        candidate.evaluaciones
          .join(", ")
          .toLowerCase()
          .includes(normalizedQuery) ||
        candidate.completado.toLowerCase().includes(normalizedQuery)
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

  const visibleCandidateIds = useMemo(
    () => paginatedData.map((candidate) => candidate.id),
    [paginatedData],
  );

  const allVisibleSelected = useMemo(() => {
    if (visibleCandidateIds.length === 0) {
      return false;
    }

    return visibleCandidateIds.every((candidateId) =>
      selectedCandidateIds.includes(candidateId),
    );
  }, [selectedCandidateIds, visibleCandidateIds]);

  const someVisibleSelected = useMemo(() => {
    if (visibleCandidateIds.length === 0) {
      return false;
    }

    const selectedVisibleCount = visibleCandidateIds.filter((candidateId) =>
      selectedCandidateIds.includes(candidateId),
    ).length;

    return (
      selectedVisibleCount > 0 &&
      selectedVisibleCount < visibleCandidateIds.length
    );
  }, [selectedCandidateIds, visibleCandidateIds]);

  useEffect(() => {
    if (!headerCheckboxRef.current) {
      return;
    }

    headerCheckboxRef.current.indeterminate = someVisibleSelected;
  }, [someVisibleSelected]);

  const handleToggleAllVisible = useCallback(() => {
    if (visibleCandidateIds.length === 0) {
      return;
    }

    setSelectedCandidateIds((previousSelected) => {
      if (allVisibleSelected) {
        return previousSelected.filter(
          (candidateId) => !visibleCandidateIds.includes(candidateId),
        );
      }

      const nextSelected = new Set(previousSelected);
      visibleCandidateIds.forEach((candidateId) => {
        nextSelected.add(candidateId);
      });

      return Array.from(nextSelected);
    });
  }, [allVisibleSelected, visibleCandidateIds]);

  const handleToggleCandidate = useCallback((candidateId: number) => {
    setSelectedCandidateIds((previousSelected) => {
      if (previousSelected.includes(candidateId)) {
        return previousSelected.filter((id) => id !== candidateId);
      }

      return [...previousSelected, candidateId];
    });
  }, []);

  const columns = useMemo<ColumnDefinition<GrupoUsuarioRow>[]>(
    () => [
      {
        key: "select",
        header: (
          <input
            ref={headerCheckboxRef}
            type="checkbox"
            checked={allVisibleSelected}
            onChange={handleToggleAllVisible}
            aria-label="Seleccionar todos los candidatos visibles"
            className="h-4 w-4 cursor-pointer rounded border-corp-gray-300 accent-brand-500 focus:ring-brand-200"
          />
        ),
        className: "w-[56px]",
        cell: (row) => (
          <input
            type="checkbox"
            checked={selectedCandidateIds.includes(row.id)}
            onChange={() => handleToggleCandidate(row.id)}
            aria-label={`Seleccionar candidato ${row.nombre}`}
            className="h-4 w-4 cursor-pointer rounded border-corp-gray-300 accent-brand-500 focus:ring-brand-200"
          />
        ),
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
    [
      allVisibleSelected,
      handleOperationalReport,
      handleToggleAllVisible,
      handleToggleCandidate,
      handleViewCandidateDetails,
      selectedCandidateIds,
    ],
  );

  return (
    <section>
      <div className="mb-4 rounded-xl border bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <AdminTitle
            title="Candidatos"
            subtitle="Listado de candidatos asociados al grupo seleccionado."
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoToComparativeChart}
              disabled={!canCompareCandidates}
              className="cursor-pointer border-brand-300 bg-surface-card text-brand-600 hover:bg-brand-100 hover:text-brand-700 disabled:cursor-not-allowed disabled:border-corp-gray-200 disabled:text-corp-gray-400 disabled:hover:bg-surface-card"
            >
              <BarChart3 className="h-4 w-4" />
              Gráfica comparativa
            </Button>

            <Button
              type="button"
              onClick={handleCreateCandidate}
              className="cursor-pointer border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600"
            >
              <UserPlus className="h-4 w-4" />
              Agregar candidato
            </Button>
          </div>
        </div>
      </div>

      <GrupoFileToolbar
        onPdfClick={() => console.log("export pdf")}
        onExcelClick={() => console.log("export excel")}
        onWordClick={() => console.log("export word")}
      />

      <TableToolbar
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        value={searchTerm}
        onChange={handleSearchChange}
        inputId="buscar-candidatos-grupo"
        placeholder="Buscar candidatos..."
      />

      {!canCompareCandidates && (
        <p className="mb-4 text-sm text-corp-gray-600">
          Selecciona al menos 2 candidatos para habilitar la gráfica
          comparativa.
        </p>
      )}

      <DataTable
        data={paginatedData}
        columns={columns}
        getRowId={(row) => row.id}
        emptyMessage="No hay usuarios en este grupo"
      />

      <CustomPagination
        totalPages={totalPages}
        currentPage={safeCurrentPage}
        onPageChange={handlePageChange}
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
