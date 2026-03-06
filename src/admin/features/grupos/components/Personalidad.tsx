import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import type { DateRange } from "react-day-picker";

import type { ReportSection } from "./InformeOperativo";
import { ChartBarrasPorTipo } from "./ChartBarrasPorTipo";

type PersonalidadProps = {
  section?: ReportSection;
  getEvaluationDate: (selection: string) => string;
  getEvaluationPercentile: (selection: string) => string;
};

type PersonalidadTab =
  | "Dimensiones Personales"
  | "Aspiraciones"
  | "Trabajo"
  | "Intercambios";

const PERSONALIDAD_TAB_FACTORS: Record<PersonalidadTab, string[]> = {
  "Dimensiones Personales": [
    "Ascendencia",
    "Estabilidad Emocional",
    "Autoestima",
    "Vitalidad",
    "Responsabilidad",
  ],
  Aspiraciones: [
    "Resultados",
    "Reconocimiento",
    "Independencia",
    "Variedad",
    "Benevolencia",
  ],
  Trabajo: [
    "Cautela",
    "Originalidad",
    "Practicidad",
    "Decisión",
    "Orden",
    "Metas",
  ],
  Intercambios: [
    "Sociabilidad",
    "Comprensión",
    "Estímulo",
    "Conformidad",
    "Liderazgo",
  ],
};

const normalizeFactorName = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const parseReportDate = (date: string) => {
  const [dayPart, monthPart, yearPart] = date.split("-").map(Number);

  if (!dayPart || !monthPart || !yearPart) {
    return null;
  }

  const parsedDate = new Date(yearPart, monthPart - 1, dayPart);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
};

export const Personalidad = ({
  section,
  getEvaluationDate,
  getEvaluationPercentile,
}: PersonalidadProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PersonalidadTab>(
    "Dimensiones Personales",
  );

  const availableDates = useMemo(() => {
    if (!section) {
      return [];
    }

    return [
      ...new Set(
        section.factors
          .map((row) => getEvaluationDate(row.seleccion))
          .filter((value) => value !== "Sin fecha"),
      ),
    ];
  }, [getEvaluationDate, section]);

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();

  const dateLimits = useMemo(() => {
    const sortedDates = availableDates
      .map((date) => parseReportDate(date))
      .filter((item): item is Date => item !== null)
      .sort((a, b) => a.getTime() - b.getTime());

    return {
      min: sortedDates[0],
      max: sortedDates[sortedDates.length - 1],
    };
  }, [availableDates]);

  const filteredFactors = useMemo(() => {
    if (!section) {
      return [];
    }

    if (!selectedDateRange?.from && !selectedDateRange?.to) {
      return section.factors;
    }

    return section.factors.filter((row) => {
      const rowDate = parseReportDate(getEvaluationDate(row.seleccion));

      if (!rowDate) {
        return false;
      }

      const rowTime = rowDate.getTime();
      const fromTime = selectedDateRange?.from
        ? new Date(
            selectedDateRange.from.getFullYear(),
            selectedDateRange.from.getMonth(),
            selectedDateRange.from.getDate(),
          ).getTime()
        : null;
      const toTime = selectedDateRange?.to
        ? new Date(
            selectedDateRange.to.getFullYear(),
            selectedDateRange.to.getMonth(),
            selectedDateRange.to.getDate(),
          ).getTime()
        : null;

      if (fromTime !== null && rowTime < fromTime) {
        return false;
      }

      if (toTime !== null && rowTime > toTime) {
        return false;
      }

      return true;
    });
  }, [getEvaluationDate, section, selectedDateRange]);

  const filteredFactorsByActiveTab = useMemo(() => {
    const allowedFactors = new Set(
      PERSONALIDAD_TAB_FACTORS[activeTab].map((factor) =>
        normalizeFactorName(factor),
      ),
    );

    return filteredFactors.filter((row) =>
      allowedFactors.has(normalizeFactorName(row.factor)),
    );
  }, [activeTab, filteredFactors]);

  useEffect(() => {
    setSelectedDateRange(undefined);
    setSelectedRowKeys([]);
    setActiveTab("Dimensiones Personales");
  }, [section?.title]);

  const filteredRowKeys = useMemo(
    () =>
      filteredFactorsByActiveTab.map(
        (row) => `${row.factor}-${getEvaluationDate(row.seleccion)}`,
      ),
    [filteredFactorsByActiveTab, getEvaluationDate],
  );

  const metricChartData = useMemo(
    () =>
      filteredFactorsByActiveTab.map((row) => ({
        factor: row.factor,
        percentil: Number(getEvaluationPercentile(row.seleccion)) || 0,
      })),
    [filteredFactorsByActiveTab, getEvaluationPercentile],
  );

  const selectedMetricChartData = useMemo(
    () =>
      filteredFactorsByActiveTab
        .filter((row) =>
          selectedRowKeys.includes(
            `${row.factor}-${getEvaluationDate(row.seleccion)}`,
          ),
        )
        .map((row) => ({
          factor: row.factor,
          percentil: Number(getEvaluationPercentile(row.seleccion)) || 0,
        })),
    [
      filteredFactorsByActiveTab,
      getEvaluationDate,
      getEvaluationPercentile,
      selectedRowKeys,
    ],
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

  if (!section) {
    return null;
  }

  return (
    <>
      <Card className="border-corp-gray-200 bg-surface-card shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl font-semibold text-text-strong">
              {section.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as PersonalidadTab)}
          >
            <div className="mb-4 flex justify-center">
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

            <TabsContent value={activeTab} className="mt-0">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <Field className="w-full min-w-56 space-y-2 sm:w-72">
                  <FieldLabel
                    htmlFor="date-picker-range"
                    className="text-xs text-corp-gray-600"
                  >
                    Evaluaciones realizadas
                  </FieldLabel>
                  <div className="flex w-full flex-col gap-2">
                    <Popover>
                      <div className="relative">
                        <PopoverTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            id="date-picker-range"
                            className="w-full cursor-pointer justify-start border-corp-gray-200 bg-surface-card px-2.5 pr-9 font-normal text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                          >
                            <CalendarIcon className="h-4 w-4" />
                            {selectedDateRange?.from ? (
                              selectedDateRange.to ? (
                                <>
                                  {format(selectedDateRange.from, "dd-MM-yyyy")}{" "}
                                  - {format(selectedDateRange.to, "dd-MM-yyyy")}
                                </>
                              ) : (
                                format(selectedDateRange.from, "dd-MM-yyyy")
                              )
                            ) : (
                              <span>Selecciona un rango</span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        {selectedDateRange?.from && (
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 cursor-pointer text-corp-gray-600 hover:bg-brand-100 hover:text-brand-500"
                            aria-label="Limpiar rango"
                            onClick={(event) => {
                              event.stopPropagation();
                              setSelectedDateRange(undefined);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          defaultMonth={
                            selectedDateRange?.from ?? dateLimits.min
                          }
                          selected={selectedDateRange}
                          onSelect={setSelectedDateRange}
                          numberOfMonths={2}
                          startMonth={dateLimits.min}
                          endMonth={dateLimits.max}
                          disabled={{
                            before: dateLimits.min,
                            after: dateLimits.max,
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </Field>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={!hasAnyRowSelected}
                  className={`transition-all ${
                    hasAnyRowSelected
                      ? "cursor-pointer border-brand-300 bg-brand-50 text-brand-700 shadow-sm hover:border-brand-600 hover:bg-brand-600 hover:text-white hover:shadow-md"
                      : "cursor-not-allowed border-corp-gray-200 bg-surface-card text-corp-gray-600 opacity-50"
                  }`}
                  onClick={() => setIsMetricModalOpen(true)}
                >
                  Detalles de Metrica
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-corp-gray-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-surface-page text-corp-gray-600">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold">
                        Factor
                      </th>
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
                    {filteredFactorsByActiveTab.map((row) => (
                      <tr
                        key={`${row.factor}-${getEvaluationDate(row.seleccion)}`}
                        className="border-t border-corp-gray-200"
                      >
                        <td className="px-4 py-2 text-text-strong">
                          {row.factor}
                        </td>
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
            </TabsContent>
          </Tabs>
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

              <ChartBarrasPorTipo
                data={selectedMetricChartData}
                sectionTitle={section.title}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
