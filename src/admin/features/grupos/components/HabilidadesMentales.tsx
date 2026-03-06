import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import type { DateRange } from "react-day-picker";

import type { ReportSection } from "./InformeOperativo";
import { ChartBarrasPorTipo } from "./ChartBarrasPorTipo";

type HabilidadesMentalesProps = {
  section?: ReportSection;
  getEvaluationDate: (selection: string) => string;
  getEvaluationPercentile: (selection: string) => string;
};

type EvaluationVariantConfig = {
  key: string;
  label: string;
  percentileDelta: number;
};

type EvaluationVariantOption = {
  key: string;
  label: string;
  selection: string;
};

const CAPACIDAD_INTELECTUAL_FACTORS = [
  "Comprension Verbal",
  "Concepcion Espacial",
  "Razonamiento",
  "Habilidad Numerica",
  "Fluidez Verbal",
];

const normalizeFactor = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const FACTOR_EVALUATION_VARIANTS_CONFIG: Record<
  string,
  EvaluationVariantConfig[]
> = {
  razonamiento: [
    { key: "base", label: "Razonamiento", percentileDelta: 0 },
    { key: "hl-1", label: "1 HL", percentileDelta: 6 },
    { key: "thl-2", label: "2 THL", percentileDelta: 12 },
  ],
};

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

const createSelectionWithDelta = (
  selection: string,
  percentileDelta: number,
) => {
  const [percentileRaw = "", dateRaw = ""] = selection
    .split("|")
    .map((part) => part.trim());
  const percentileValue = Number(percentileRaw);

  if (Number.isNaN(percentileValue)) {
    return selection;
  }

  const adjustedPercentile = Math.max(
    1,
    Math.min(99, percentileValue + percentileDelta),
  );
  return `${adjustedPercentile} | ${dateRaw}`;
};

export const HabilidadesMentales = ({
  section,
  getEvaluationDate,
  getEvaluationPercentile,
}: HabilidadesMentalesProps) => {
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

  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [selectedVariantByRowKey, setSelectedVariantByRowKey] = useState<
    Record<string, string>
  >({});
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);

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

  useEffect(() => {
    setSelectedDateRange(undefined);
  }, [section.title]);

  useEffect(() => {
    setSelectedRowKeys([]);
    setSelectedVariantByRowKey({});
  }, [section.title]);

  const filteredRows = useMemo(() => {
    if (!selectedDateRange?.from && !selectedDateRange?.to) {
      return fixedFactorsRows;
    }

    return fixedFactorsRows.filter((row) => {
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
  }, [fixedFactorsRows, getEvaluationDate, selectedDateRange]);

  const getRowKey = (row: { factor: string; seleccion: string }) =>
    `${row.factor}-${getEvaluationDate(row.seleccion)}`;

  const evaluationVariantsByRowKey = useMemo(() => {
    return Object.fromEntries(
      filteredRows.map((row) => {
        const normalizedFactor = normalizeFactor(row.factor);
        const variantsConfig =
          FACTOR_EVALUATION_VARIANTS_CONFIG[normalizedFactor];

        const options: EvaluationVariantOption[] = variantsConfig
          ? variantsConfig.map((variant) => ({
              key: variant.key,
              label: variant.label,
              selection: createSelectionWithDelta(
                row.seleccion,
                variant.percentileDelta,
              ),
            }))
          : [
              {
                key: "base",
                label: row.factor,
                selection: row.seleccion,
              },
            ];

        return [getRowKey(row), options];
      }),
    );
  }, [filteredRows, getEvaluationDate]);

  const getSelectedVariantOption = (row: {
    factor: string;
    seleccion: string;
  }) => {
    const rowKey = getRowKey(row);
    const options = evaluationVariantsByRowKey[rowKey] ?? [
      {
        key: "base",
        label: row.factor,
        selection: row.seleccion,
      },
    ];
    const selectedVariantKey =
      selectedVariantByRowKey[rowKey] ?? options[0].key;

    return (
      options.find((option) => option.key === selectedVariantKey) ?? options[0]
    );
  };

  const filteredRowKeys = useMemo(
    () => filteredRows.map((row) => getRowKey(row)),
    [filteredRows, getEvaluationDate],
  );

  const selectedMetricChartData = useMemo(
    () =>
      filteredRows
        .filter((row) => selectedRowKeys.includes(getRowKey(row)))
        .map((row) => ({
          factor: row.factor,
          percentil:
            Number(
              getEvaluationPercentile(getSelectedVariantOption(row).selection),
            ) || 0,
        })),
    [
      filteredRows,
      getEvaluationDate,
      getEvaluationPercentile,
      selectedRowKeys,
      selectedVariantByRowKey,
      evaluationVariantsByRowKey,
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

  const handleSelectEvaluationVariant = (
    rowKey: string,
    variantKey: string,
  ) => {
    setSelectedVariantByRowKey((current) => ({
      ...current,
      [rowKey]: variantKey,
    }));
  };

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
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="text-xs text-corp-gray-600">
                Evaluaciones realizadas
              </p>
              <Field className="w-full min-w-56 sm:w-72">
                <FieldLabel htmlFor="date-picker-range" className="sr-only">
                  Evaluaciones realizadas
                </FieldLabel>
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
                              {format(selectedDateRange.from, "dd-MM-yyyy")} -{" "}
                              {format(selectedDateRange.to, "dd-MM-yyyy")}
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
                      defaultMonth={selectedDateRange?.from ?? dateLimits.min}
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
              </Field>
            </div>

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
                    <td className="px-4 py-2 text-text-strong">
                      {(() => {
                        const rowKey = getRowKey(row);
                        const options =
                          evaluationVariantsByRowKey[rowKey] ?? [];
                        const selectedVariant = getSelectedVariantOption(row);
                        const baseOption =
                          options.find((option) => option.key === "base") ??
                          null;
                        const secondaryOptions = options.filter(
                          (option) => option.key !== "base",
                        );
                        const isBaseActive =
                          !baseOption || selectedVariant.key === baseOption.key;

                        return (
                          <div className="flex items-center gap-1">
                            {options.length > 1 ? (
                              <button
                                type="button"
                                className={`inline-flex cursor-pointer items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors ${
                                  isBaseActive
                                    ? "border-brand-500 bg-brand-100 text-brand-700"
                                    : "border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                                }`}
                                onClick={() =>
                                  handleSelectEvaluationVariant(
                                    rowKey,
                                    baseOption?.key ?? "base",
                                  )
                                }
                              >
                                {row.factor}
                              </button>
                            ) : (
                              <span
                                style={
                                  row.factor === "Razonamiento"
                                    ? { color: "#744ED2" }
                                    : undefined
                                }
                              >
                                {row.factor}
                              </span>
                            )}

                            {secondaryOptions.length > 0 && (
                              <div className="ml-1 inline-flex items-center gap-2">
                                {secondaryOptions.map((option) => {
                                  const isActive =
                                    selectedVariant.key === option.key;

                                  return (
                                    <button
                                      key={option.key}
                                      type="button"
                                      className={`inline-flex cursor-pointer items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors ${
                                        isActive
                                          ? "border-brand-500 bg-brand-100 text-brand-700"
                                          : "border-corp-gray-200 bg-surface-card text-corp-gray-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                                      }`}
                                      onClick={() =>
                                        handleSelectEvaluationVariant(
                                          rowKey,
                                          option.key,
                                        )
                                      }
                                    >
                                      {option.label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </td>
                    <td className="px-4 py-2 text-text-strong">
                      {getEvaluationPercentile(
                        getSelectedVariantOption(row).selection,
                      )}
                    </td>
                    <td className="px-4 py-2 text-text-strong">
                      {getEvaluationDate(row.seleccion)}
                    </td>
                    <td className="px-4 py-2 text-text-strong">
                      {(() => {
                        const rowKey = getRowKey(row);

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
