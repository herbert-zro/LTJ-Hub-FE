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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import { RenderLegend } from "./RenderLegend";

export interface ChartData {
  month: string;
  capacidad: number;
  comportamiento: number;
  personalidad: number;
  competencia: number;
}

interface ComparativaChartProps {
  data?: ChartData[];
  onFilter?: (date: string) => void;
}

const DEFAULT_DATA: ChartData[] = [
  {
    month: "Ene",
    capacidad: 67,
    comportamiento: 23,
    personalidad: 40,
    competencia: 4,
  },
  {
    month: "Feb",
    capacidad: 100,
    comportamiento: 27,
    personalidad: 55,
    competencia: 1,
  },
  {
    month: "Mar",
    capacidad: 1,
    comportamiento: 0,
    personalidad: 1,
    competencia: 0,
  },
  {
    month: "Abr",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
  },
  {
    month: "May",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
  },
  {
    month: "Jun",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
  },
  {
    month: "Jul",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
  },
  {
    month: "Ago",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
  },
  {
    month: "Sep",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
  },
  {
    month: "Oct",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
  },
  {
    month: "Nov",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
  },
  {
    month: "Dic",
    capacidad: 0,
    comportamiento: 0,
    personalidad: 0,
    competencia: 0,
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
  onFilter,
}) => {
  const [date, setDate] = useState("");

  const handleFilter = () => {
    onFilter?.(date);
  };

  return (
    <Card className="chart-card">
      {/* Header */}
      <CardHeader className="chart-card-header">
        <h2 className="chart-title text-center">
          Comparativa de Pruebas Enviadas
        </h2>
        <div className="chart-controls">
          <div className="date-input-wrapper">
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="Selecciona una fecha"
              className="date-input"
            />
            {/* <Calendar className="date-icon" size={16} /> */}
          </div>
        </div>
      </CardHeader>

      {/* Chart */}
      <CardContent className="chart-content">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 0, right: 8, left: -10, bottom: 0 }}
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
              dataKey="month"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 120]}
              ticks={[0, 20, 40, 60, 80, 100, 120]}
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
            <Legend content={RenderLegend} verticalAlign="top" />
            <Bar
              dataKey="capacidad"
              fill={COLORS.capacidad}
              radius={[2, 2, 0, 0]}
              maxBarSize={18}
            />
            <Bar
              dataKey="comportamiento"
              fill={COLORS.comportamiento}
              radius={[2, 2, 0, 0]}
              maxBarSize={18}
            />
            <Bar
              dataKey="personalidad"
              fill={COLORS.personalidad}
              radius={[2, 2, 0, 0]}
              maxBarSize={18}
            />
            <Bar
              dataKey="competencia"
              fill={COLORS.competencia}
              radius={[2, 2, 0, 0]}
              maxBarSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
