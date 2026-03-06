import { AdminTitle } from "@/admin/components/AdminTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FileText, FileType, Link2, Plus } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { AgregarPruebaModalForm } from "./AgregarPruebaModalForm";
import { CapacidadIntelectual } from "./CapacidadIntelectual";
import { ComportamientoEnTrabajo } from "./ComportamientoEnTrabajo";
import { HabilidadesMentales } from "./HabilidadesMentales";
import { Personalidad } from "./Personalidad";

export type ReportFactor = {
  factor: string;
  seleccion: string;
};

export type ReportSection = {
  title: string;
  factors: ReportFactor[];
};

export type ReportUser = {
  id: number;
  nombre: string;
  correo: string;
  plaza: string;
  evaluaciones: string[];
  completado: string;
  sections: ReportSection[];
};

export type ReportEvaluationAttempt = {
  id: number;
  candidateId: number;
  evaluationType: string;
  score: number;
  createdAt: string;
};

export type EvaluationAttemptSortBy = "createdAt" | "finishedAt";

type EvaluationAttemptQueryOptions = {
  evaluationType?: string;
  generationDate?: string;
  minScore?: number;
  sortBy?: EvaluationAttemptSortBy;
};

export const REPORT_EVALUATION_ATTEMPTS: ReportEvaluationAttempt[] = [
  {
    id: 1,
    candidateId: 1,
    evaluationType: "TCG",
    score: 82,
    createdAt: "2026-02-10 09:00:00",
  },
  {
    id: 2,
    candidateId: 1,
    evaluationType: "CI-VERSION B",
    score: 88,
    createdAt: "2026-02-12 11:20:00",
  },
  {
    id: 3,
    candidateId: 1,
    evaluationType: "CI-VERSION D",
    score: 76,
    createdAt: "2026-02-13 10:10:00",
  },
  {
    id: 4,
    candidateId: 1,
    evaluationType: "AUTO",
    score: 64,
    createdAt: "2026-02-14 00:14:00",
  },
  {
    id: 5,
    candidateId: 1,
    evaluationType: "TP1",
    score: 72,
    createdAt: "2026-02-16 08:30:00",
  },
  {
    id: 6,
    candidateId: 1,
    evaluationType: "TP2",
    score: 79,
    createdAt: "2026-02-17 15:45:00",
  },
  {
    id: 7,
    candidateId: 2,
    evaluationType: "TCG",
    score: 70,
    createdAt: "2026-02-10 10:00:00",
  },
  {
    id: 8,
    candidateId: 2,
    evaluationType: "CI-VERSION O",
    score: 73,
    createdAt: "2026-02-11 10:00:00",
  },
  {
    id: 9,
    candidateId: 2,
    evaluationType: "TP1",
    score: 68,
    createdAt: "2026-02-12 10:00:00",
  },
  {
    id: 10,
    candidateId: 3,
    evaluationType: "TCG",
    score: 55,
    createdAt: "2026-02-09 09:30:00",
  },
  {
    id: 11,
    candidateId: 4,
    evaluationType: "TCG",
    score: 74,
    createdAt: "2026-02-10 14:00:00",
  },
  {
    id: 12,
    candidateId: 4,
    evaluationType: "TP1",
    score: 77,
    createdAt: "2026-02-11 14:00:00",
  },
  {
    id: 13,
    candidateId: 4,
    evaluationType: "TP2",
    score: 80,
    createdAt: "2026-02-12 14:00:00",
  },
  {
    id: 26,
    candidateId: 2,
    evaluationType: "AUTO",
    score: 71,
    createdAt: "2026-02-13 09:05:00",
  },
  {
    id: 27,
    candidateId: 2,
    evaluationType: "CI-VERSION B",
    score: 69,
    createdAt: "2026-02-14 09:10:00",
  },
  {
    id: 28,
    candidateId: 2,
    evaluationType: "TP2",
    score: 74,
    createdAt: "2026-02-15 09:20:00",
  },
  {
    id: 29,
    candidateId: 3,
    evaluationType: "AUTO",
    score: 58,
    createdAt: "2026-02-10 08:15:00",
  },
  {
    id: 30,
    candidateId: 3,
    evaluationType: "CI-VERSION D",
    score: 60,
    createdAt: "2026-02-11 08:20:00",
  },
  {
    id: 31,
    candidateId: 3,
    evaluationType: "CI-VERSION O",
    score: 57,
    createdAt: "2026-02-12 08:30:00",
  },
  {
    id: 32,
    candidateId: 3,
    evaluationType: "TP1",
    score: 62,
    createdAt: "2026-02-13 08:40:00",
  },
  {
    id: 33,
    candidateId: 3,
    evaluationType: "TP2",
    score: 64,
    createdAt: "2026-02-14 08:50:00",
  },
  {
    id: 34,
    candidateId: 4,
    evaluationType: "AUTO",
    score: 78,
    createdAt: "2026-02-13 14:10:00",
  },
  {
    id: 35,
    candidateId: 4,
    evaluationType: "CI-VERSION D",
    score: 75,
    createdAt: "2026-02-14 14:15:00",
  },
  {
    id: 36,
    candidateId: 4,
    evaluationType: "CI-VERSION O",
    score: 79,
    createdAt: "2026-02-15 14:25:00",
  },
  {
    id: 37,
    candidateId: 1,
    evaluationType: "TCG",
    score: 85,
    createdAt: "2026-02-18 09:10:00",
  },
  {
    id: 38,
    candidateId: 1,
    evaluationType: "AUTO",
    score: 67,
    createdAt: "2026-02-18 10:15:00",
  },
  {
    id: 39,
    candidateId: 1,
    evaluationType: "TP1",
    score: 75,
    createdAt: "2026-02-18 11:20:00",
  },
  {
    id: 14,
    candidateId: 5,
    evaluationType: "TCG",
    score: 90,
    createdAt: "2026-02-13 12:00:00",
  },
  {
    id: 15,
    candidateId: 5,
    evaluationType: "CI - VERSION D",
    score: 86,
    createdAt: "2026-02-14 12:00:00",
  },
  {
    id: 16,
    candidateId: 5,
    evaluationType: "TP1",
    score: 81,
    createdAt: "2026-02-15 12:00:00",
  },
  {
    id: 17,
    candidateId: 5,
    evaluationType: "TP2",
    score: 84,
    createdAt: "2026-02-16 12:00:00",
  },
  {
    id: 18,
    candidateId: 6,
    evaluationType: "CI - VERSION D",
    score: 62,
    createdAt: "2026-02-18 09:00:00",
  },
  {
    id: 19,
    candidateId: 6,
    evaluationType: "TP2",
    score: 65,
    createdAt: "2026-02-19 09:00:00",
  },
  {
    id: 20,
    candidateId: 7,
    evaluationType: "TCG",
    score: 89,
    createdAt: "2026-02-20 11:00:00",
  },
  {
    id: 21,
    candidateId: 7,
    evaluationType: "CI - VERSION D",
    score: 84,
    createdAt: "2026-02-21 11:00:00",
  },
  {
    id: 22,
    candidateId: 7,
    evaluationType: "TP1",
    score: 83,
    createdAt: "2026-02-22 11:00:00",
  },
  {
    id: 23,
    candidateId: 7,
    evaluationType: "TP2",
    score: 85,
    createdAt: "2026-02-23 11:00:00",
  },
  {
    id: 24,
    candidateId: 8,
    evaluationType: "TCG",
    score: 67,
    createdAt: "2026-02-24 10:30:00",
  },
  {
    id: 25,
    candidateId: 8,
    evaluationType: "TP1",
    score: 69,
    createdAt: "2026-02-25 10:30:00",
  },
];

const parseDateTime = (value: string) =>
  new Date(value.replace(" ", "T")).getTime();

const formatDateTime = (timestamp: number) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const seconds = `${date.getSeconds()}`.padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const getAttemptDurationInMinutes = (attempt: ReportEvaluationAttempt) => {
  return 20 + (attempt.id % 6) * 7;
};

const getAttemptFinishedAt = (attempt: ReportEvaluationAttempt) => {
  const startedAt = parseDateTime(attempt.createdAt);
  const durationInMinutes = getAttemptDurationInMinutes(attempt);

  return formatDateTime(startedAt + durationInMinutes * 60 * 1000);
};

const getAttemptFinishedTimestamp = (attempt: ReportEvaluationAttempt) => {
  const startedAt = parseDateTime(attempt.createdAt);
  const durationInMinutes = getAttemptDurationInMinutes(attempt);

  return startedAt + durationInMinutes * 60 * 1000;
};

const formatDurationLabel = (minutes: number) => {
  const hoursPart = Math.floor(minutes / 60);
  const minutesPart = minutes % 60;

  if (hoursPart === 0) {
    return `${minutesPart} min`;
  }

  return `${hoursPart} h ${minutesPart.toString().padStart(2, "0")} min`;
};

const sortEvaluationAttempts = (
  left: ReportEvaluationAttempt,
  right: ReportEvaluationAttempt,
  sortBy: EvaluationAttemptSortBy,
) => {
  if (sortBy === "finishedAt") {
    const finishedDiff =
      getAttemptFinishedTimestamp(right) - getAttemptFinishedTimestamp(left);

    if (finishedDiff !== 0) {
      return finishedDiff;
    }

    return parseDateTime(right.createdAt) - parseDateTime(left.createdAt);
  }

  const dateDiff =
    parseDateTime(right.createdAt) - parseDateTime(left.createdAt);

  if (dateDiff !== 0) {
    return dateDiff;
  }

  return getAttemptFinishedTimestamp(right) - getAttemptFinishedTimestamp(left);
};

export const appendEvaluationAttempt = (
  attempts: ReportEvaluationAttempt[],
  nextAttempt: ReportEvaluationAttempt,
) => {
  return [...attempts, nextAttempt];
};

export const getCandidateEvaluationAttempts = (
  candidateId: number,
  evaluationType: string,
  options?: Omit<EvaluationAttemptQueryOptions, "evaluationType">,
) => {
  const queryOptions: EvaluationAttemptQueryOptions = {
    ...options,
    evaluationType,
  };

  return REPORT_EVALUATION_ATTEMPTS.filter((attempt) => {
    if (attempt.candidateId !== candidateId) {
      return false;
    }

    if (
      queryOptions.evaluationType &&
      attempt.evaluationType !== queryOptions.evaluationType
    ) {
      return false;
    }

    if (
      queryOptions.generationDate &&
      !attempt.createdAt.startsWith(queryOptions.generationDate)
    ) {
      return false;
    }

    if (
      queryOptions.minScore !== undefined &&
      attempt.score < queryOptions.minScore
    ) {
      return false;
    }

    return true;
  }).sort((a, b) =>
    sortEvaluationAttempts(a, b, queryOptions.sortBy ?? "createdAt"),
  );
};

const PERSONALIDAD_FACTORS = [
  "Ascendencia",
  "Estabilidad Emocional",
  "Autoestima",
  "Vitalidad",
  "Responsabilidad",
  "Resultados",
  "Reconocimiento",
  "Independencia",
  "Variedad",
  "Benevolencia",
  "Cautela",
  "Originalidad",
  "Practicidad",
  "Decision",
  "Orden",
  "Metas",
  "Sociabilidad",
  "Comprension",
  "Estimulo",
  "Conformidad",
  "Liderazgo",
];

const addDaysToDate = (date: string, daysToAdd: number) => {
  const [dayPart, monthPart, yearPart] = date.split("-").map(Number);

  if (!dayPart || !monthPart || !yearPart) {
    return date;
  }

  const nextDate = new Date(yearPart, monthPart - 1, dayPart + daysToAdd);
  const day = `${nextDate.getDate()}`.padStart(2, "0");
  const month = `${nextDate.getMonth() + 1}`.padStart(2, "0");
  const year = `${nextDate.getFullYear()}`;

  return `${day}-${month}-${year}`;
};

const createPersonalidadSection = (date: string, basePercentile: number) => ({
  title: "Personalidad",
  factors: PERSONALIDAD_FACTORS.map((factor, index) => {
    const percentile = Math.min(
      99,
      Math.max(1, basePercentile + ((index * 7) % 31) - 15),
    );
    const factorDate = addDaysToDate(date, index % 6);

    return {
      factor,
      seleccion: `${percentile} | ${factorDate}`,
    };
  }),
});

const getSelectionScore = (selection: string) =>
  selection.split("|")[0]?.trim();

const distributeSectionDates = (users: ReportUser[]) => {
  const sectionTitles = new Set([
    "Capacidad Intelectual",
    "Comportamiento en el Trabajo",
  ]);

  users.forEach((user) => {
    user.sections.forEach((section) => {
      if (!sectionTitles.has(section.title)) {
        return;
      }

      const baseDate = section.factors
        .map((factor) => factor.seleccion.split("|")[1]?.trim())
        .find((dateValue) => dateValue && dateValue.length > 0);

      if (!baseDate) {
        return;
      }

      section.factors = section.factors.map((factor, index) => {
        const scorePart = getSelectionScore(factor.seleccion) ?? "";
        const distributedDate = addDaysToDate(baseDate, index % 5);

        return {
          ...factor,
          seleccion: `${scorePart} | ${distributedDate}`,
        };
      });
    });
  });
};

export const REPORT_USERS: ReportUser[] = [
  {
    id: 1,
    nombre: "Ana Martínez",
    correo: "ana.martinez@correo.com",
    plaza: "Atención al Usuario",
    evaluaciones: ["TCG", "AUTO", "CI-VERSION D", "CI-VERSION B", "TP1", "TP2"],
    completado: "4/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "32 | 15-02-2026" },
          { factor: "Concepción Espacial", seleccion: "20 | 15-02-2026" },
          { factor: "Razonamiento", seleccion: "63 | 15-02-2026" },
          { factor: "Habilidad Numérica", seleccion: "91 | 15-02-2026" },
          { factor: "Fluidez Verbal", seleccion: "74 | 15-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "57 | 15-02-2026" },
          { factor: "Influencia", seleccion: "70 | 15-02-2026" },
          { factor: "Estabilidad", seleccion: "35 | 15-02-2026" },
          { factor: "Cumplimiento", seleccion: "83 | 15-02-2026" },
        ],
      },
      createPersonalidadSection("15-02-2026", 66),
    ],
  },
  {
    id: 2,
    nombre: "Carlos Pérez",
    correo: "carlos.perez@correo.com",
    plaza: "Analista de Operaciones",
    evaluaciones: ["TCG", "AUTO", "CI-VERSION O", "CI-VERSION B", "TP1", "TP2"],
    completado: "3/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "44 | 16-02-2026" },
          { factor: "Concepción Espacial", seleccion: "57 | 16-02-2026" },
          { factor: "Razonamiento", seleccion: "61 | 16-02-2026" },
          { factor: "Fluidez Verbal", seleccion: "49 | 16-02-2026" },
        ],
      },
      createPersonalidadSection("16-02-2026", 59),
    ],
  },
  {
    id: 3,
    nombre: "Lucía Gómez",
    correo: "lucia.gomez@correo.com",
    plaza: "Asistente de Gestión",
    evaluaciones: ["TCG", "AUTO", "CI-VERSION D", "CI-VERSION O", "TP1", "TP2"],
    completado: "1/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "25 | 12-02-2026" },
          { factor: "Fluidez Verbal", seleccion: "33 | 12-02-2026" },
        ],
      },
      createPersonalidadSection("12-02-2026", 46),
    ],
  },
  {
    id: 4,
    nombre: "Jorge Ramírez",
    correo: "jorge.ramirez@correo.com",
    plaza: "Supervisor Comercial",
    evaluaciones: ["TCG", "AUTO", "CI-VERSION D", "CI-VERSION O", "TP1", "TP2"],
    completado: "3/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "39 | 18-02-2026" },
          { factor: "Concepción Espacial", seleccion: "48 | 18-02-2026" },
          { factor: "Razonamiento", seleccion: "52 | 18-02-2026" },
          { factor: "Fluidez Verbal", seleccion: "57 | 18-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "62 | 18-02-2026" },
          { factor: "Influencia", seleccion: "74 | 18-02-2026" },
          { factor: "Estabilidad", seleccion: "46 | 18-02-2026" },
          { factor: "Cumplimiento", seleccion: "69 | 18-02-2026" },
        ],
      },
      createPersonalidadSection("18-02-2026", 63),
    ],
  },
  {
    id: 5,
    nombre: "Valeria Castro",
    correo: "valeria.castro@correo.com",
    plaza: "Coordinadora de Talento",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1", "TP2"],
    completado: "4/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "58 | 19-02-2026" },
          { factor: "Concepción Espacial", seleccion: "63 | 19-02-2026" },
          { factor: "Razonamiento", seleccion: "71 | 19-02-2026" },
          { factor: "Habilidad Numérica", seleccion: "76 | 19-02-2026" },
          { factor: "Fluidez Verbal", seleccion: "68 | 19-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "68 | 19-02-2026" },
          { factor: "Influencia", seleccion: "81 | 19-02-2026" },
          { factor: "Estabilidad", seleccion: "55 | 19-02-2026" },
          { factor: "Cumplimiento", seleccion: "77 | 19-02-2026" },
        ],
      },
      createPersonalidadSection("19-02-2026", 72),
    ],
  },
  {
    id: 6,
    nombre: "Diego Torres",
    correo: "diego.torres@correo.com",
    plaza: "Asistente Operativo",
    evaluaciones: ["CI - VERSION D", "TP2"],
    completado: "2/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "31 | 20-02-2026" },
          { factor: "Concepción Espacial", seleccion: "42 | 20-02-2026" },
          { factor: "Razonamiento", seleccion: "47 | 20-02-2026" },
          { factor: "Fluidez Verbal", seleccion: "45 | 20-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "44 | 20-02-2026" },
          { factor: "Influencia", seleccion: "39 | 20-02-2026" },
          { factor: "Estabilidad", seleccion: "58 | 20-02-2026" },
          { factor: "Cumplimiento", seleccion: "63 | 20-02-2026" },
        ],
      },
      createPersonalidadSection("20-02-2026", 54),
    ],
  },
  {
    id: 7,
    nombre: "Fernanda Ruiz",
    correo: "fernanda.ruiz@correo.com",
    plaza: "Especialista de Servicio",
    evaluaciones: ["TCG", "CI - VERSION D", "TP1", "TP2"],
    completado: "4/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "61 | 21-02-2026" },
          { factor: "Concepción Espacial", seleccion: "54 | 21-02-2026" },
          { factor: "Razonamiento", seleccion: "73 | 21-02-2026" },
          { factor: "Habilidad Numérica", seleccion: "79 | 21-02-2026" },
          { factor: "Fluidez Verbal", seleccion: "72 | 21-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "66 | 21-02-2026" },
          { factor: "Influencia", seleccion: "83 | 21-02-2026" },
          { factor: "Estabilidad", seleccion: "61 | 21-02-2026" },
          { factor: "Cumplimiento", seleccion: "80 | 21-02-2026" },
        ],
      },
      createPersonalidadSection("21-02-2026", 76),
    ],
  },
  {
    id: 8,
    nombre: "Miguel Herrera",
    correo: "miguel.herrera@correo.com",
    plaza: "Asesor Comercial",
    evaluaciones: ["TCG", "TP1"],
    completado: "2/6",
    sections: [
      {
        title: "Capacidad Intelectual",
        factors: [
          { factor: "Comprensión Verbal", seleccion: "46 | 22-02-2026" },
          { factor: "Concepción Espacial", seleccion: "37 | 22-02-2026" },
          { factor: "Razonamiento", seleccion: "51 | 22-02-2026" },
          { factor: "Fluidez Verbal", seleccion: "54 | 22-02-2026" },
        ],
      },
      {
        title: "Comportamiento en el Trabajo",
        factors: [
          { factor: "Dominancia", seleccion: "53 | 22-02-2026" },
          { factor: "Influencia", seleccion: "58 | 22-02-2026" },
          { factor: "Estabilidad", seleccion: "49 | 22-02-2026" },
          { factor: "Cumplimiento", seleccion: "65 | 22-02-2026" },
        ],
      },
      createPersonalidadSection("22-02-2026", 57),
    ],
  },
];

distributeSectionDates(REPORT_USERS);

type InformeOperativoProps = {
  candidateId?: number | null;
  compactMode?: boolean;
};

type ReportSectionTab =
  | "capacidad-intelectual"
  | "habilidades-mentales"
  | "comportamiento-en-trabajo"
  | "personalidad";

type ExportFormat = "pdf" | "word";

type ExportFactorGroup = {
  evaluationType: string;
  factors: string[];
};

const EVALUATION_SECTION_TAB_MAP: Record<string, ReportSectionTab> = {
  TP1: "personalidad",
  TP2: "personalidad",
  AUTO: "comportamiento-en-trabajo",
  TCG: "habilidades-mentales",
};

const normalizeEvaluationType = (evaluationType: string) =>
  evaluationType.toUpperCase().replace(/\s+/g, "");

const resolveSectionTabByEvaluationType = (
  evaluationType: string,
): ReportSectionTab => {
  const normalizedEvaluationType = normalizeEvaluationType(evaluationType);

  if (normalizedEvaluationType.startsWith("CI-VERSION")) {
    return "capacidad-intelectual";
  }

  return (
    EVALUATION_SECTION_TAB_MAP[normalizedEvaluationType] ??
    "capacidad-intelectual"
  );
};

export const InformeOperativo = ({
  candidateId,
  compactMode = false,
}: InformeOperativoProps = {}) => {
  const navigate = useNavigate();
  const { id, userId } = useParams();
  const [activeEvaluationView, setActiveEvaluationView] = useState<
    "best-score" | "history"
  >("best-score");
  const [selectedEvaluationTypeFilter, setSelectedEvaluationTypeFilter] =
    useState("ALL");
  const [generationDateFilter, setGenerationDateFilter] = useState("");
  const [historySortBy, setHistorySortBy] =
    useState<EvaluationAttemptSortBy>("createdAt");
  const [isAddTestModalOpen, setIsAddTestModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat | null>(null);
  const [selectedExportFactorKeys, setSelectedExportFactorKeys] = useState<
    string[]
  >([]);
  const [activeSectionTab, setActiveSectionTab] = useState<ReportSectionTab>(
    "capacidad-intelectual",
  );
  const [isDetailSectionVisible, setIsDetailSectionVisible] = useState(false);
  const [activeDetailEvaluationType, setActiveDetailEvaluationType] = useState<
    string | null
  >(null);
  const detailSectionsRef = useRef<HTMLDivElement | null>(null);

  const getEvaluationDate = (selection: string) => {
    const datePart = selection.split("|")[1]?.trim();
    return datePart && datePart.length > 0 ? datePart : "Sin fecha";
  };

  const getEvaluationPercentile = (selection: string) => {
    const percentilePart = selection.split("|")[0]?.trim();
    return percentilePart && percentilePart.length > 0
      ? percentilePart
      : "Sin percentil";
  };

  const resolvedUserId = useMemo(() => {
    if (candidateId !== undefined && candidateId !== null) {
      return Number.isInteger(candidateId) ? candidateId : null;
    }

    if (!userId) {
      return null;
    }

    const numericUserId = Number(userId);

    if (!Number.isInteger(numericUserId)) {
      return null;
    }

    return numericUserId;
  }, [candidateId, userId]);

  const user = useMemo(() => {
    if (resolvedUserId === null) {
      return null;
    }

    return REPORT_USERS.find((item) => item.id === resolvedUserId) ?? null;
  }, [resolvedUserId]);

  const backPath = id ? `/admin/grupos/${id}/candidatos` : "/admin/grupos";

  const evaluationTypes = useMemo(() => {
    if (!user) {
      return [] as string[];
    }

    return Array.from(new Set(user.evaluaciones));
  }, [user]);

  const bestEvaluationRows = useMemo(() => {
    if (!user) {
      return [] as Array<{
        evaluationType: string;
        bestScore: number;
        bestCreatedAt: string;
        bestFinishedAt: string;
        bestDurationLabel: string;
        attemptsCount: number;
      }>;
    }

    return evaluationTypes
      .map((evaluationType) => {
        const attempts = getCandidateEvaluationAttempts(
          user.id,
          evaluationType,
          {
            sortBy: "createdAt",
          },
        );
        const bestAttempt = attempts[0] ?? null;

        if (!bestAttempt) {
          return {
            evaluationType,
            bestScore: 0,
            bestCreatedAt: "",
            bestFinishedAt: "",
            bestDurationLabel: "",
            attemptsCount: 0,
          };
        }

        return {
          evaluationType,
          bestScore: bestAttempt.score,
          bestCreatedAt: bestAttempt.createdAt,
          bestFinishedAt: getAttemptFinishedAt(bestAttempt),
          bestDurationLabel: formatDurationLabel(
            getAttemptDurationInMinutes(bestAttempt),
          ),
          attemptsCount: attempts.length,
        };
      })
      .sort((left, right) => {
        const rightDate = right.bestCreatedAt
          ? parseDateTime(right.bestCreatedAt)
          : 0;
        const leftDate = left.bestCreatedAt
          ? parseDateTime(left.bestCreatedAt)
          : 0;

        if (rightDate !== leftDate) {
          return rightDate - leftDate;
        }

        return right.attemptsCount - left.attemptsCount;
      });
  }, [evaluationTypes, user]);

  const historyRows = useMemo(() => {
    if (!user) {
      return [] as ReportEvaluationAttempt[];
    }

    return getCandidateEvaluationAttempts(
      user.id,
      selectedEvaluationTypeFilter === "ALL"
        ? ""
        : selectedEvaluationTypeFilter,
      {
        generationDate: generationDateFilter || undefined,
        sortBy: historySortBy,
      },
    );
  }, [generationDateFilter, historySortBy, selectedEvaluationTypeFilter, user]);

  const capacidadIntelectualSection = useMemo(
    () =>
      user?.sections.find(
        (section) => section.title === "Capacidad Intelectual",
      ),
    [user],
  );

  const habilidadesMentalesSection = useMemo(() => {
    if (!capacidadIntelectualSection) {
      return undefined;
    }

    return {
      ...capacidadIntelectualSection,
      title: "Habilidades Mentales",
    };
  }, [capacidadIntelectualSection]);

  const comportamientoEnTrabajoSection = useMemo(
    () =>
      user?.sections.find(
        (section) => section.title === "Comportamiento en el Trabajo",
      ),
    [user],
  );

  const personalidadSection = useMemo(
    () => user?.sections.find((section) => section.title === "Personalidad"),
    [user],
  );

  const getFactorsByEvaluationType = (evaluationType: string) => {
    const targetSectionTab = resolveSectionTabByEvaluationType(evaluationType);

    if (targetSectionTab === "capacidad-intelectual") {
      return (
        capacidadIntelectualSection?.factors.map((factor) => factor.factor) ??
        []
      );
    }

    if (targetSectionTab === "habilidades-mentales") {
      return (
        habilidadesMentalesSection?.factors.map((factor) => factor.factor) ?? []
      );
    }

    if (targetSectionTab === "comportamiento-en-trabajo") {
      return (
        comportamientoEnTrabajoSection?.factors.map(
          (factor) => factor.factor,
        ) ?? []
      );
    }

    return personalidadSection?.factors.map((factor) => factor.factor) ?? [];
  };

  const exportFactorGroups = useMemo(() => {
    return evaluationTypes.map((evaluationType) => ({
      evaluationType,
      factors: Array.from(new Set(getFactorsByEvaluationType(evaluationType))),
    }));
  }, [
    capacidadIntelectualSection,
    comportamientoEnTrabajoSection,
    evaluationTypes,
    habilidadesMentalesSection,
    personalidadSection,
  ]);

  const allExportFactorKeys = useMemo(
    () =>
      exportFactorGroups.flatMap((group) =>
        group.factors.map((factor) => `${group.evaluationType}::${factor}`),
      ),
    [exportFactorGroups],
  );

  const hasAnyExportFactorSelected = selectedExportFactorKeys.length > 0;

  const handleOpenExportModal = (format: ExportFormat) => {
    setExportFormat(format);
    setSelectedExportFactorKeys([]);
    setIsExportModalOpen(true);
  };

  const handleToggleExportFactor = (factorKey: string, checked: boolean) => {
    setSelectedExportFactorKeys((current) => {
      if (checked) {
        if (current.includes(factorKey)) {
          return current;
        }

        return [...current, factorKey];
      }

      return current.filter((key) => key !== factorKey);
    });
  };

  const handleToggleExportGroup = (
    group: ExportFactorGroup,
    checked: boolean,
  ) => {
    const groupKeys = group.factors.map(
      (factor) => `${group.evaluationType}::${factor}`,
    );

    setSelectedExportFactorKeys((current) => {
      if (checked) {
        return Array.from(new Set([...current, ...groupKeys]));
      }

      return current.filter((key) => !groupKeys.includes(key));
    });
  };

  const handleToggleAllExportFactors = (checked: boolean) => {
    setSelectedExportFactorKeys(checked ? allExportFactorKeys : []);
  };

  const handleConfirmExport = () => {
    if (!user || !exportFormat || selectedExportFactorKeys.length === 0) {
      return;
    }

    const selectedFactorsByEvaluationType = exportFactorGroups
      .map((group) => ({
        evaluationType: group.evaluationType,
        factors: group.factors.filter((factor) =>
          selectedExportFactorKeys.includes(
            `${group.evaluationType}::${factor}`,
          ),
        ),
      }))
      .filter((group) => group.factors.length > 0);

    console.log(`generate ${exportFormat}`, {
      userId: user.id,
      selectedFactorsByEvaluationType,
    });

    setIsExportModalOpen(false);
  };

  const handleOpenEvaluationDetails = (evaluationType: string) => {
    const nextSectionTab = resolveSectionTabByEvaluationType(evaluationType);

    setActiveDetailEvaluationType(evaluationType);
    setIsDetailSectionVisible(true);
    setActiveSectionTab(nextSectionTab);

    requestAnimationFrame(() => {
      detailSectionsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  if (!user) {
    return (
      <section className={compactMode ? "space-y-3" : "space-y-4"}>
        {!compactMode && (
          <div className="rounded-xl border bg-white p-4">
            <AdminTitle
              title="Informe operativo"
              subtitle="No se encontró información para el candidato seleccionado."
            />
          </div>
        )}

        <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
          <CardContent className="pt-6">
            {!compactMode && (
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                onClick={() => navigate(backPath)}
              >
                Volver a candidatos
              </Button>
            )}

            {compactMode && (
              <p className="text-sm text-corp-gray-600">
                No se encontró información para el candidato seleccionado.
              </p>
            )}
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className={compactMode ? "space-y-3" : "space-y-4"}>
      {!compactMode && (
        <>
          <div className="rounded-xl border bg-white p-4">
            <AdminTitle
              title={`${user.nombre} - Informe de Evaluaciones`}
              subtitle="Resumen integral de evaluaciones y resultados disponibles."
            />
          </div>

          <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
            <CardContent className="py-2">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-center text-sm text-corp-gray-600 sm:text-left">
                  Exporta este informe operativo en el formato que necesites.
                </p>

                <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:justify-end">
                  <Button
                    type="button"
                    size="sm"
                    className="cursor-pointer border border-brand-600/40 bg-brand-500 text-white transition-colors hover:bg-brand-600"
                    onClick={() => setIsAddTestModalOpen(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Agregar prueba
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="cursor-pointer border-amber-300 bg-surface-card text-amber-700 transition-colors hover:bg-amber-600 hover:text-white"
                    onClick={() => handleOpenExportModal("pdf")}
                  >
                    <FileText className="h-4 w-4" />
                    Generar PDF
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="cursor-pointer border-blue-300 bg-surface-card text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                    onClick={() => handleOpenExportModal("word")}
                  >
                    <FileType className="h-4 w-4" />
                    Generar Word
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardHeader className="space-y-3 pb-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-lg font-semibold text-text-strong">
              Evaluaciones del candidato
            </CardTitle>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
              <Button
                type="button"
                size="sm"
                variant={
                  activeEvaluationView === "best-score" ? "default" : "outline"
                }
                className={
                  activeEvaluationView === "best-score"
                    ? "cursor-pointer border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600"
                    : "cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                }
                onClick={() => setActiveEvaluationView("best-score")}
              >
                Evaluación más reciente
              </Button>
              <Button
                type="button"
                size="sm"
                variant={
                  activeEvaluationView === "history" ? "default" : "outline"
                }
                className={
                  activeEvaluationView === "history"
                    ? "cursor-pointer border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600"
                    : "cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                }
                onClick={() => setActiveEvaluationView("history")}
              >
                Histórico de intentos
              </Button>
            </div>
          </div>

          {/* {bestOverallEvaluation && (
            <p className="text-sm text-corp-gray-600">
              Mejor evaluación actual: {bestOverallEvaluation.evaluationType}{" "}
              (puntaje {bestOverallEvaluation.bestScore})
            </p>
          )} */}
        </CardHeader>

        <CardContent className="space-y-3">
          {activeEvaluationView === "history" && (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-corp-gray-600">
                  Tipo de evaluación
                </p>
                <Select
                  value={selectedEvaluationTypeFilter}
                  onValueChange={setSelectedEvaluationTypeFilter}
                >
                  <SelectTrigger className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 focus-visible:border-brand-500 focus-visible:ring-brand-100/60">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent className="border-corp-gray-200 bg-surface-card">
                    <SelectGroup>
                      <SelectItem
                        value="ALL"
                        className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                      >
                        Todos
                      </SelectItem>
                      {evaluationTypes.map((evaluationType) => (
                        <SelectItem
                          key={evaluationType}
                          value={evaluationType}
                          className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                        >
                          {evaluationType}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-corp-gray-600">
                  Fecha de generación
                </p>
                <Input
                  type="date"
                  value={generationDateFilter}
                  onChange={(event) =>
                    setGenerationDateFilter(event.target.value)
                  }
                  className="border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-corp-gray-400 focus-visible:border-brand-500 focus-visible:ring-brand-100/70"
                />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-corp-gray-600">
                  Ordenar por
                </p>
                <Select
                  value={historySortBy}
                  onValueChange={(value) =>
                    setHistorySortBy(value as EvaluationAttemptSortBy)
                  }
                >
                  <SelectTrigger className="w-full border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 focus-visible:border-brand-500 focus-visible:ring-brand-100/60">
                    <SelectValue placeholder="Selecciona orden" />
                  </SelectTrigger>
                  <SelectContent className="border-corp-gray-200 bg-surface-card">
                    <SelectGroup>
                      <SelectItem
                        value="createdAt"
                        className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                      >
                        Fecha de generación
                      </SelectItem>
                      <SelectItem
                        value="finishedAt"
                        className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                      >
                        Fecha de finalización
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="overflow-x-auto rounded-lg border border-corp-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-surface-page text-corp-gray-600">
                {activeEvaluationView === "best-score" ? (
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">
                      Evaluación
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Enlace
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Fecha de generación
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Fecha de finalización
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Tiempo de prueba
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Intentos acumulados
                    </th>
                    <th className="px-4 py-2 text-left font-semibold"></th>
                  </tr>
                ) : (
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">
                      Evaluación
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Enlace
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Fecha de generación
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Fecha de finalización
                    </th>
                    <th className="px-4 py-2 text-left font-semibold">
                      Tiempo de prueba
                    </th>
                    <th className="px-4 py-2 text-left font-semibold"></th>
                  </tr>
                )}
              </thead>

              <tbody>
                {activeEvaluationView === "best-score" ? (
                  bestEvaluationRows.length > 0 ? (
                    bestEvaluationRows.map((row) => (
                      <tr
                        key={row.evaluationType}
                        className="border-t border-corp-gray-200"
                      >
                        <td className="px-4 py-2 text-text-strong">
                          {row.evaluationType}
                        </td>
                        <td className="px-4 py-2">
                          <a
                            href="#"
                            className="inline-flex items-center justify-center rounded-md p-1.5 text-brand-600 transition-colors hover:bg-brand-100 hover:text-brand-700"
                            aria-label={`Abrir enlace de ${row.evaluationType}`}
                          >
                            <Link2 className="h-4 w-4" />
                          </a>
                        </td>
                        <td className="px-4 py-2 text-text-strong">
                          {row.bestCreatedAt || "-"}
                        </td>
                        <td className="px-4 py-2 text-text-strong">
                          {row.bestFinishedAt || "-"}
                        </td>
                        <td className="px-4 py-2 text-text-strong">
                          {row.bestDurationLabel || "-"}
                        </td>
                        <td className="px-4 py-2 text-text-strong">
                          {row.attemptsCount}
                        </td>
                        <td className="px-4 py-2">
                          <Button
                            type="button"
                            size="sm"
                            variant={
                              activeDetailEvaluationType === row.evaluationType
                                ? "default"
                                : "outline"
                            }
                            className={
                              activeDetailEvaluationType === row.evaluationType
                                ? "cursor-pointer border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600"
                                : "cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                            }
                            onClick={() =>
                              handleOpenEvaluationDetails(row.evaluationType)
                            }
                          >
                            Detalles
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-corp-gray-200">
                      <td
                        colSpan={7}
                        className="px-4 py-3 text-center text-corp-gray-600"
                      >
                        No hay intentos registrados para este candidato.
                      </td>
                    </tr>
                  )
                ) : historyRows.length > 0 ? (
                  historyRows.map((attempt) => (
                    <tr
                      key={attempt.id}
                      className="border-t border-corp-gray-200"
                    >
                      <td className="px-4 py-2 text-text-strong">
                        {attempt.evaluationType}
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href="#"
                          className="inline-flex items-center justify-center rounded-md p-1.5 text-brand-600 transition-colors hover:bg-brand-100 hover:text-brand-700"
                          aria-label={`Abrir enlace de ${attempt.evaluationType}`}
                        >
                          <Link2 className="h-4 w-4" />
                        </a>
                      </td>
                      <td className="px-4 py-2 text-text-strong">
                        {attempt.createdAt}
                      </td>
                      <td className="px-4 py-2 text-text-strong">
                        {getAttemptFinishedAt(attempt)}
                      </td>
                      <td className="px-4 py-2 text-text-strong">
                        {formatDurationLabel(
                          getAttemptDurationInMinutes(attempt),
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          type="button"
                          size="sm"
                          variant={
                            activeDetailEvaluationType ===
                            attempt.evaluationType
                              ? "default"
                              : "outline"
                          }
                          className={
                            activeDetailEvaluationType ===
                            attempt.evaluationType
                              ? "cursor-pointer border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600"
                              : "cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                          }
                          onClick={() =>
                            handleOpenEvaluationDetails(attempt.evaluationType)
                          }
                        >
                          Detalles
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-corp-gray-200">
                    <td
                      colSpan={6}
                      className="px-4 py-3 text-center text-corp-gray-600"
                    >
                      No hay registros para los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {!compactMode && isAddTestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Agregar prueba"
            className="max-h-[88vh] w-full max-w-3xl"
          >
            <AgregarPruebaModalForm
              onRequestClose={() => setIsAddTestModalOpen(false)}
            />
          </div>
        </div>
      )}

      {isExportModalOpen && exportFormat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Seleccionar factores para exportar"
            className="w-full max-w-4xl rounded-xl border border-corp-gray-200 bg-surface-card p-4 shadow-sm"
          >
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-strong">
                  Seleccionar factores para {exportFormat.toUpperCase()}
                </h3>
                <p className="text-sm text-corp-gray-600">
                  Marca los factores que deseas incluir en el archivo.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                  onClick={() =>
                    handleToggleAllExportFactors(
                      selectedExportFactorKeys.length !==
                        allExportFactorKeys.length,
                    )
                  }
                >
                  {selectedExportFactorKeys.length ===
                  allExportFactorKeys.length
                    ? "Deseleccionar todos"
                    : "Seleccionar todos"}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                  onClick={() => setIsExportModalOpen(false)}
                >
                  Cerrar
                </Button>
              </div>
            </div>

            <div className="max-h-[52vh] space-y-3 overflow-y-auto pr-1">
              {exportFactorGroups.map((group) => {
                const groupKeys = group.factors.map(
                  (factor) => `${group.evaluationType}::${factor}`,
                );
                const allGroupSelected =
                  groupKeys.length > 0 &&
                  groupKeys.every((key) =>
                    selectedExportFactorKeys.includes(key),
                  );

                return (
                  <div
                    key={group.evaluationType}
                    className="rounded-lg border border-corp-gray-200 bg-surface-page p-3"
                  >
                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="text-sm font-semibold text-text-strong">
                        {group.evaluationType}
                      </h4>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                        onClick={() =>
                          handleToggleExportGroup(group, !allGroupSelected)
                        }
                      >
                        {allGroupSelected
                          ? "Deseleccionar tipo"
                          : "Seleccionar tipo"}
                      </Button>
                    </div>

                    {group.factors.length === 0 ? (
                      <p className="text-sm text-corp-gray-600">
                        Sin factores disponibles para este tipo de evaluación.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {group.factors.map((factor) => {
                          const factorKey = `${group.evaluationType}::${factor}`;

                          return (
                            <label
                              key={factorKey}
                              className="flex cursor-pointer items-center gap-2 rounded-md border border-corp-gray-200 bg-surface-card px-2 py-1.5 text-sm text-text-strong"
                            >
                              <input
                                type="checkbox"
                                checked={selectedExportFactorKeys.includes(
                                  factorKey,
                                )}
                                onChange={(event) =>
                                  handleToggleExportFactor(
                                    factorKey,
                                    event.target.checked,
                                  )
                                }
                                className="h-4 w-4 cursor-pointer accent-brand-500"
                              />
                              <span>{factor}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-corp-gray-600">
                Factores seleccionados: {selectedExportFactorKeys.length}
              </p>

              <Button
                type="button"
                size="sm"
                disabled={!hasAnyExportFactorSelected}
                className="cursor-pointer border border-brand-600/40 bg-brand-500 text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleConfirmExport}
              >
                {exportFormat === "pdf" ? "Generar PDF" : "Generar Word"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {isDetailSectionVisible && (
        <div ref={detailSectionsRef}>
          <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
            <CardContent className="pt-4">
              <Tabs value={activeSectionTab}>
                {/*
                <div className="flex justify-center">
                  <TabsList variant="line" className="mx-auto">
                    <TabsTrigger
                      value="Dimensiones Personales"
                      className="cursor-pointer hover:text-brand-500 data-[state=active]:text-brand-500 group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-brand-500"
                    >
                      Dimensiones Personales
                    </TabsTrigger>
                    <TabsTrigger
                      value="Aspiraciones"
                      className="cursor-pointer hover:text-brand-500 data-[state=active]:text-brand-500 group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-brand-500"
                    >
                      Aspiraciones
                    </TabsTrigger>
                    <TabsTrigger
                      value="Trabajo"
                      className="cursor-pointer hover:text-brand-500 data-[state=active]:text-brand-500 group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-brand-500"
                    >
                      Trabajo
                    </TabsTrigger>
                    <TabsTrigger
                      value="Intercambios"
                      className="cursor-pointer hover:text-brand-500 data-[state=active]:text-brand-500 group-data-[variant=line]/tabs-list:data-[state=active]:after:bg-brand-500"
                    >
                      Intercambios
                    </TabsTrigger>
                  </TabsList>
                </div>
                */}

                <TabsContent value="capacidad-intelectual" className="mt-4">
                  <CapacidadIntelectual
                    section={capacidadIntelectualSection}
                    getEvaluationDate={getEvaluationDate}
                    getEvaluationPercentile={getEvaluationPercentile}
                    activeEvaluationType={activeDetailEvaluationType}
                  />
                </TabsContent>

                <TabsContent value="habilidades-mentales" className="mt-4">
                  <HabilidadesMentales
                    section={habilidadesMentalesSection}
                    getEvaluationDate={getEvaluationDate}
                    getEvaluationPercentile={getEvaluationPercentile}
                  />
                </TabsContent>

                <TabsContent value="comportamiento-en-trabajo" className="mt-4">
                  <ComportamientoEnTrabajo
                    section={comportamientoEnTrabajoSection}
                    getEvaluationDate={getEvaluationDate}
                    getEvaluationPercentile={getEvaluationPercentile}
                  />
                </TabsContent>

                <TabsContent value="personalidad" className="mt-4">
                  <Personalidad
                    section={personalidadSection}
                    getEvaluationDate={getEvaluationDate}
                    getEvaluationPercentile={getEvaluationPercentile}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};
