import { useState, type FC } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export const MetricChart: FC<ComparativaChartProps> = ({
  data = DEFAULT_DATA,
}) => {
  const [selectedMonth, setSelectedMonth] = useState("2");

  const currentYear = new Date().getFullYear();
  const referenceDate = new Date(currentYear, Number(selectedMonth), 1);
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

  return (
    <Card className="chart-card h-full">
      {/* Header */}
      <CardHeader className="chart-card-header pb-3">
        <h2 className="chart-title text-center">
          Comparativa de Pruebas Enviadas
        </h2>
        <div className="chart-controls flex w-full justify-end">
          <div className="date-input-wrapper w-full md:w-40">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="date-input w-full">
                <SelectValue placeholder="Selecciona un mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Enero</SelectItem>
                <SelectItem value="1">Febrero</SelectItem>
                <SelectItem value="2">Marzo</SelectItem>
                <SelectItem value="3">Abril</SelectItem>
                <SelectItem value="4">Mayo</SelectItem>
                <SelectItem value="5">Junio</SelectItem>
                <SelectItem value="6">Julio</SelectItem>
                <SelectItem value="7">Agosto</SelectItem>
                <SelectItem value="8">Septiembre</SelectItem>
                <SelectItem value="9">Octubre</SelectItem>
                <SelectItem value="10">Noviembre</SelectItem>
                <SelectItem value="11">Diciembre</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      {/* Chart */}
      <CardContent className="chart-content pt-2">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
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
