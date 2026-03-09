import { useMemo, useState, type FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { RenderLegend } from "./RenderLegend";

export interface ChartData {
  day: string;
  capacidad: number;
  comportamiento: number;
  personalidad: number;
  competencia: number;
}

interface ComparativaChartProps {
  data?: ChartData[];
}

const DEFAULT_DATA: ChartData[] = [
  {
    day: "Lunes",
    capacidad: 18,
    comportamiento: 12,
    personalidad: 15,
    competencia: 8,
  },
  {
    day: "Martes",
    capacidad: 22,
    comportamiento: 14,
    personalidad: 17,
    competencia: 9,
  },
  {
    day: "Miércoles",
    capacidad: 24,
    comportamiento: 13,
    personalidad: 19,
    competencia: 11,
  },
  {
    day: "Jueves",
    capacidad: 20,
    comportamiento: 11,
    personalidad: 16,
    competencia: 10,
  },
  {
    day: "Viernes",
    capacidad: 26,
    comportamiento: 15,
    personalidad: 21,
    competencia: 12,
  },
  {
    day: "Sábado",
    capacidad: 14,
    comportamiento: 9,
    personalidad: 11,
    competencia: 7,
  },
  {
    day: "Domingo",
    capacidad: 12,
    comportamiento: 8,
    personalidad: 10,
    competencia: 6,
  },
];

const COLORS = {
  capacidad: "var(--destructive)",
  comportamiento: "var(--muted-foreground)",
  personalidad: "var(--chart-2)",
  competencia: "var(--chart-4)",
};

const LEGEND_LABELS: Record<string, string> = {
  capacidad: "CAPACIDAD INTELECTUAL",
  comportamiento: "COMPORTAMIENTO EN EL TRABAJO",
  personalidad: "PERSONALIDAD",
  competencia: "COMPETENCIA",
};

const DAY_KEY_TO_WEEKDAY: Record<string, number> = {
  lunes: 1,
  martes: 2,
  miercoles: 3,
  jueves: 4,
  viernes: 5,
  sabado: 6,
  domingo: 0,
};

const normalizeDayKey = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const MetricChart: FC<ComparativaChartProps> = ({
  data = DEFAULT_DATA,
}) => {
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >();

  const currentYear = new Date().getFullYear();
  const dateLimits = useMemo(
    () => ({
      min: new Date(currentYear, 0, 1),
      max: new Date(currentYear, 11, 31),
    }),
    [currentYear],
  );

  const referenceDate = selectedDateRange?.from
    ? new Date(
        selectedDateRange.from.getFullYear(),
        selectedDateRange.from.getMonth(),
        1,
      )
    : new Date(currentYear, 2, 1);
  const daysInMonth = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth() + 1,
    0,
  ).getDate();

  const yAxisTicks = [
    0,
    ...Array.from(
      { length: Math.floor(daysInMonth / 5) },
      (_, index) => (index + 1) * 5,
    ),
    daysInMonth,
  ].filter((value, index, array) => array.indexOf(value) === index);

  const chartData = data.map((row) => ({
    ...row,
    capacidad: Math.min(row.capacidad, daysInMonth),
    comportamiento: Math.min(row.comportamiento, daysInMonth),
    personalidad: Math.min(row.personalidad, daysInMonth),
    competencia: Math.min(row.competencia, daysInMonth),
  }));

  const normalizedFrom = selectedDateRange?.from
    ? new Date(
        selectedDateRange.from.getFullYear(),
        selectedDateRange.from.getMonth(),
        selectedDateRange.from.getDate(),
      ).getTime()
    : null;

  const normalizedTo = selectedDateRange?.to
    ? new Date(
        selectedDateRange.to.getFullYear(),
        selectedDateRange.to.getMonth(),
        selectedDateRange.to.getDate(),
      ).getTime()
    : normalizedFrom;

  const selectedWeekdays = useMemo(() => {
    if (normalizedFrom === null && normalizedTo === null) {
      return null;
    }

    const fromTime = normalizedFrom ?? normalizedTo;
    const toTime = normalizedTo ?? normalizedFrom;

    if (fromTime === null || toTime === null) {
      return null;
    }

    const startDate = new Date(Math.min(fromTime, toTime));
    const endDate = new Date(Math.max(fromTime, toTime));
    const weekdays = new Set<number>();

    for (
      let cursor = new Date(startDate);
      cursor.getTime() <= endDate.getTime();
      cursor = new Date(
        cursor.getFullYear(),
        cursor.getMonth(),
        cursor.getDate() + 1,
      )
    ) {
      weekdays.add(cursor.getDay());
    }

    return weekdays;
  }, [normalizedFrom, normalizedTo]);

  const filteredChartData = chartData.filter((row) => {
    if (selectedWeekdays === null) {
      return true;
    }

    const weekday = DAY_KEY_TO_WEEKDAY[normalizeDayKey(row.day)];

    if (weekday === undefined) {
      return false;
    }

    return selectedWeekdays.has(weekday);
  });

  return (
    <Card className="chart-card h-full">
      {/* Header */}
      <CardHeader className="chart-card-header pb-3">
        <h2 className="chart-title text-center">
          Comparativa de Pruebas Enviadas
        </h2>
        <div className="chart-controls flex w-full justify-center">
          <div className="date-input-wrapper flex w-full justify-center">
            <Field className="w-full max-w-sm">
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

                <PopoverContent className="w-auto p-0" align="center">
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
        </div>
      </CardHeader>

      {/* Chart */}
      <CardContent className="chart-content pt-2">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={filteredChartData}
            margin={{ top: 18, right: 8, left: -10, bottom: 0 }} // Labels
            barCategoryGap="30%"
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="var(--border)"
              vertical={true}
              horizontal={true}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, daysInMonth]}
              ticks={yAxisTicks}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
              formatter={(value, name) => {
                const seriesName = String(name ?? "");
                return [value, LEGEND_LABELS[seriesName] ?? seriesName];
              }}
            />
            <Legend
              content={RenderLegend}
              verticalAlign="top"
              wrapperStyle={{ top: -8 }}
            />
            <Bar
              dataKey="capacidad"
              fill={COLORS.capacidad}
              radius={[2, 2, 0, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="comportamiento"
              fill={COLORS.comportamiento}
              radius={[2, 2, 0, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="personalidad"
              fill={COLORS.personalidad}
              radius={[2, 2, 0, 0]}
              maxBarSize={14}
            />
            <Bar
              dataKey="competencia"
              fill={COLORS.competencia}
              radius={[2, 2, 0, 0]}
              maxBarSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
