import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";

import {
  ComparativeChart,
  type ComparativeCandidate,
} from "../components/ComparativeChart";

type SelectedCandidate = {
  id: number;
  nombre: string;
};

type ComparativeRouteState = {
  selectedCandidates?: SelectedCandidate[];
};

const buildMockMetricsByCandidateId = (candidateId: number) => {
  const profileType = candidateId % 4;

  const baseByProfile = {
    0: 24,
    1: 42,
    2: 73,
    3: 91,
  } as const;

  const baseScore = baseByProfile[profileType as keyof typeof baseByProfile];
  const variance = (candidateId % 3) - 1;

  const normalize = (value: number) => Math.max(20, Math.min(99, value));

  return {
    Razonamiento: normalize(baseScore + 2 + variance),
    "Perfil DISC": normalize(baseScore - 3 + variance),
    "Ajuste Cultural": normalize(baseScore + 5 - variance),
    Competencias: normalize(baseScore - 6 + variance),
    Potencial: normalize(baseScore + 8),
  };
};

export const ComparativeChartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const selectedCandidates =
    (state as ComparativeRouteState | null)?.selectedCandidates ?? [];

  const chartCandidates = useMemo<ComparativeCandidate[]>(
    () =>
      selectedCandidates.map((candidate) => ({
        id: candidate.id,
        nombre: candidate.nombre,
        metrics: buildMockMetricsByCandidateId(candidate.id),
      })),
    [selectedCandidates],
  );

  const hasEnoughCandidates = chartCandidates.length >= 2;

  return (
    <section className="min-w-0 space-y-4">
      {!hasEnoughCandidates ? (
        <div className="rounded-xl border border-corp-gray-200 bg-surface-card p-6 text-center">
          <h2 className="mb-2 text-base font-semibold text-text-strong">
            Selecciona al menos 2 candidatos
          </h2>
          <p className="mb-4 text-sm text-corp-gray-600">
            Para generar la gráfica comparativa debes seleccionar dos o más
            registros desde la tabla de candidatos.
          </p>
          <Button
            type="button"
            className="cursor-pointer border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600"
            onClick={() => navigate(`/admin/grupos/${id}/candidatos`)}
          >
            Volver a candidatos
          </Button>
        </div>
      ) : (
        <ComparativeChart candidates={chartCandidates} />
      )}
    </section>
  );
};
