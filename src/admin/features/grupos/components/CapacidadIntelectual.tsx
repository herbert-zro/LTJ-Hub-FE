import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { FileText, FileType } from "lucide-react";

import type { ReportSection } from "./InformeOperativo";
import { ChartPorTipo } from "./ChartPorTipo";

type CapacidadIntelectualProps = {
  section?: ReportSection;
  getEvaluationDate: (selection: string) => string;
  getEvaluationPercentile: (selection: string) => string;
};

const CAPACIDAD_INTELECTUAL_FACTORS = [
  "Comprension Verbal",
  "Concepcion Espacial",
  "Razonamiento",
  "Habilidad Numerica",
  "Fluidez Verbal",
];

const ALL_DATES_VALUE = "ALL_DATES";

const normalizeFactor = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const CapacidadIntelectual = ({
  section,
  getEvaluationDate,
  getEvaluationPercentile,
}: CapacidadIntelectualProps) => {
  if (!section) {
    return null;
  }

  const fixedFactorsRows = useMemo(
    () =>
      CAPACIDAD_INTELECTUAL_FACTORS.map((factorName) => {
        const foundFactor = section.factors.find(
          (row) => normalizeFactor(row.factor) === normalizeFactor(factorName),
        );

        return {
          factor: factorName,
          seleccion: foundFactor?.seleccion ?? "",
        };
      }),
    [section.factors],
  );

  const availableDates = useMemo(
    () => [
      ...new Set(
        fixedFactorsRows
          .map((row) => getEvaluationDate(row.seleccion))
          .filter((value) => value !== "Sin fecha"),
      ),
    ],
    [fixedFactorsRows, getEvaluationDate],
  );

  const [selectedDate, setSelectedDate] = useState(ALL_DATES_VALUE);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);

  useEffect(() => {
    setSelectedDate(ALL_DATES_VALUE);
  }, [section.title]);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, [section.title]);

  const filteredRows = useMemo(() => {
    if (selectedDate === ALL_DATES_VALUE || !selectedDate) {
      return fixedFactorsRows;
    }

    return fixedFactorsRows.filter(
      (row) => getEvaluationDate(row.seleccion) === selectedDate,
    );
  }, [fixedFactorsRows, getEvaluationDate, selectedDate]);

  const filteredRowKeys = useMemo(
    () =>
      filteredRows.map(
        (row) => `${row.factor}-${getEvaluationDate(row.seleccion)}`,
      ),
    [filteredRows, getEvaluationDate],
  );

  const metricChartData = useMemo(
    () =>
      filteredRows.map((row) => ({
        factor: row.factor,
        percentil: Number(getEvaluationPercentile(row.seleccion)) || 0,
      })),
    [filteredRows, getEvaluationPercentile],
  );

  const allFilteredSelected =
    filteredRowKeys.length > 0 &&
    filteredRowKeys.every((rowKey) => selectedRowKeys.includes(rowKey));

  const hasAnyRowSelected = selectedRowKeys.length > 0;

  const handleToggleRow = (rowKey: string, checked: boolean) => {
    setSelectedRowKeys((current) => {
      if (checked) {
        if (current.includes(rowKey)) {
          return current;
        }

        return [...current, rowKey];
      }

      return current.filter((key) => key !== rowKey);
    });
  };

  const handleToggleAllFiltered = (checked: boolean) => {
    setSelectedRowKeys((current) => {
      if (checked) {
        return Array.from(new Set([...current, ...filteredRowKeys]));
      }

      return current.filter((key) => !filteredRowKeys.includes(key));
    });
  };

  return (
    <>
      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl font-semibold text-text-strong">
              {section.title}
            </CardTitle>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={!hasAnyRowSelected}
                className="cursor-pointer border-amber-300 bg-surface-card text-amber-700 hover:bg-amber-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => console.log("download pdf", section.title)}
              >
                <FileText className="h-4 w-4" />
                Generar PDF
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={!hasAnyRowSelected}
                className="cursor-pointer border-blue-300 bg-surface-card text-blue-600 hover:bg-blue-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => console.log("download word", section.title)}
              >
                <FileType className="h-4 w-4" />
                Generar Word
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs text-corp-gray-600">
                Evaluaciones realizadas
              </p>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger className="w-full min-w-56 border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 focus-visible:border-brand-500 focus-visible:ring-brand-100/60 sm:w-72">
                  <SelectValue placeholder="Selecciona una fecha" />
                </SelectTrigger>
                <SelectContent
                  align="start"
                  className="border-corp-gray-200 bg-surface-card"
                >
                  <SelectGroup>
                    <SelectItem
                      value={ALL_DATES_VALUE}
                      className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                    >
                      Todas las fechas
                    </SelectItem>
                    {availableDates.map((dateValue) => (
                      <SelectItem
                        key={`${section.title}-${dateValue}`}
                        value={dateValue}
                        className="text-corp-gray-600 focus:bg-brand-100 focus:text-brand-500"
                      >
                        {dateValue}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              size="sm"
              variant="outline"
              className="cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
              onClick={() => setIsMetricModalOpen(true)}
            >
              Detalles de Metrica
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-corp-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-surface-page text-corp-gray-600">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Factor</th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Percentil
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    Fecha de finalización
                  </th>
                  <th className="px-4 py-2 text-left font-semibold">
                    <input
                      type="checkbox"
                      checked={allFilteredSelected}
                      onChange={(event) =>
                        handleToggleAllFiltered(event.target.checked)
                      }
                      className="h-4 w-4 cursor-pointer accent-brand-500"
                      aria-label="Seleccionar todos los reportes"
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row) => (
                  <tr
                    key={row.factor}
                    className="border-t border-corp-gray-200"
                  >
                    <td className="px-4 py-2 text-text-strong">{row.factor}</td>
                    <td className="px-4 py-2 text-text-strong">
                      {getEvaluationPercentile(row.seleccion)}
                    </td>
                    <td className="px-4 py-2 text-text-strong">
                      {getEvaluationDate(row.seleccion)}
                    </td>
                    <td className="px-4 py-2 text-text-strong">
                      {(() => {
                        const rowKey = `${row.factor}-${getEvaluationDate(row.seleccion)}`;

                        return (
                          <input
                            type="checkbox"
                            checked={selectedRowKeys.includes(rowKey)}
                            onChange={(event) =>
                              handleToggleRow(rowKey, event.target.checked)
                            }
                            className="h-4 w-4 cursor-pointer accent-brand-500"
                            aria-label={`Reporte ${row.factor}`}
                          />
                        );
                      })()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {isMetricModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Detalles de métrica"
            className="w-full max-w-2xl"
          >
            <div className="rounded-xl border border-corp-gray-200 bg-surface-card p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-end">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="cursor-pointer border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                  onClick={() => setIsMetricModalOpen(false)}
                >
                  Cerrar
                </Button>
              </div>

              <ChartPorTipo
                data={metricChartData}
                sectionTitle={section.title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
