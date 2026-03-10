import React, { useMemo } from "react";
import { Link as LinkIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CandidateEvaluation {
  id: string;
  evaluacion: string;
  enlace: string;
  fechaGeneracion: Date;
  fechaFinalizacion: Date;
  tiempoPrueba: number; // en minutos
  intentosAcumulados: number;
}

const MOCK_EVALUACIONES: CandidateEvaluation[] = [
  {
    id: "1",
    evaluacion: "TP1",
    enlace: "https://example.com/eval/tp1",
    fechaGeneracion: new Date("2026-02-18T11:20:00"),
    fechaFinalizacion: new Date("2026-02-18T12:01:00"),
    tiempoPrueba: 41,
    intentosAcumulados: 2,
  },
  {
    id: "2",
    evaluacion: "AUTO",
    enlace: "https://example.com/eval/auto",
    fechaGeneracion: new Date("2026-02-18T10:15:00"),
    fechaFinalizacion: new Date("2026-02-18T10:49:00"),
    tiempoPrueba: 34,
    intentosAcumulados: 2,
  },
  {
    id: "3",
    evaluacion: "TCG",
    enlace: "https://example.com/eval/tcg",
    fechaGeneracion: new Date("2026-02-18T09:10:00"),
    fechaFinalizacion: new Date("2026-02-18T09:37:00"),
    tiempoPrueba: 27,
    intentosAcumulados: 2,
  },
  {
    id: "4",
    evaluacion: "TP2",
    enlace: "https://example.com/eval/tp2",
    fechaGeneracion: new Date("2026-02-17T15:45:00"),
    fechaFinalizacion: new Date("2026-02-17T16:05:00"),
    tiempoPrueba: 20,
    intentosAcumulados: 1,
  },
  {
    id: "5",
    evaluacion: "CI-VERSION D",
    enlace: "https://example.com/eval/ci-version-d",
    fechaGeneracion: new Date("2026-02-13T10:10:00"),
    fechaFinalizacion: new Date("2026-02-13T10:51:00"),
    tiempoPrueba: 41,
    intentosAcumulados: 1,
  },
  {
    id: "6",
    evaluacion: "CI-VERSION B",
    enlace: "https://example.com/eval/ci-version-b",
    fechaGeneracion: new Date("2026-02-12T11:20:00"),
    fechaFinalizacion: new Date("2026-02-12T11:54:00"),
    tiempoPrueba: 34,
    intentosAcumulados: 1,
  },
];

const formatDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const sortByGenerationDateDesc = (
  a: CandidateEvaluation,
  b: CandidateEvaluation,
) => {
  return b.fechaGeneracion.getTime() - a.fechaGeneracion.getTime();
};

export const CandidatoExternoEvaluaciones = () => {
  const evaluacionesOrdenadas = useMemo(() => {
    return [...MOCK_EVALUACIONES].sort(sortByGenerationDateDesc);
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Mis Evaluaciones
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Historial de evaluaciones psicométricas realizadas
        </p>
      </div>

      <Card className="overflow-hidden rounded-2xl border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Evaluaciones Completadas
          </CardTitle>
          <CardDescription>
            Total de evaluaciones: {evaluacionesOrdenadas.length}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {evaluacionesOrdenadas.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center p-6">
              <p className="text-sm text-gray-500">
                No tienes evaluaciones registradas
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold text-gray-700 pl-3">
                        Evaluación
                      </TableHead>
                      <TableHead className="w-20 text-center font-semibold text-gray-700">
                        Enlace
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Fecha de generación
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Fecha de finalización
                      </TableHead>
                      <TableHead className="font-semibold text-gray-700">
                        Tiempo de prueba
                      </TableHead>
                      <TableHead className="text-center font-semibold text-gray-700">
                        Intentos acumulados
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evaluacionesOrdenadas.map((evaluacion) => (
                      <TableRow
                        key={evaluacion.id}
                        className="hover:bg-gray-50/50"
                      >
                        <TableCell className="font-medium text-gray-900 pl-3">
                          {evaluacion.evaluacion}
                        </TableCell>
                        <TableCell className="text-center">
                          <a
                            href={evaluacion.enlace}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center text-brand-600 transition-colors hover:text-brand-700"
                            title="Ver evaluación"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </a>
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDateTime(evaluacion.fechaGeneracion)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {formatDateTime(evaluacion.fechaFinalizacion)}
                        </TableCell>
                        <TableCell className="text-gray-600">
                          {evaluacion.tiempoPrueba} min
                        </TableCell>
                        <TableCell className="text-center text-gray-900">
                          {evaluacion.intentosAcumulados}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="flex flex-col gap-3 p-4 md:hidden">
                {evaluacionesOrdenadas.map((evaluacion) => (
                  <Card
                    key={evaluacion.id}
                    className="overflow-hidden border-gray-200 shadow-sm"
                  >
                    <CardContent className="space-y-3 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {evaluacion.evaluacion}
                          </h3>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {evaluacion.intentosAcumulados}{" "}
                            {evaluacion.intentosAcumulados === 1
                              ? "intento"
                              : "intentos"}
                          </p>
                        </div>
                        <a
                          href={evaluacion.enlace}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-gray-200 p-2 text-brand-600 transition-colors hover:border-brand-300 hover:bg-brand-50"
                          title="Ver evaluación"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      </div>

                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Generación:</span>
                          <span className="font-medium text-gray-900">
                            {formatDateTime(evaluacion.fechaGeneracion)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Finalización:</span>
                          <span className="font-medium text-gray-900">
                            {formatDateTime(evaluacion.fechaFinalizacion)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tiempo:</span>
                          <span className="font-medium text-gray-900">
                            {evaluacion.tiempoPrueba} min
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
