import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ComparativeCandidate = {
  id: number;
  nombre: string;
  metrics: Record<string, number>;
};

type ComparativeChartProps = {
  candidates: ComparativeCandidate[];
};

const CANDIDATE_COLORS = [
  "hsl(173 80% 50%)",
  "hsl(0 84% 60%)",
  "hsl(262 83% 58%)",
  "hsl(34 94% 55%)",
  "hsl(221 83% 53%)",
];

export const ComparativeChart = ({ candidates }: ComparativeChartProps) => {
  if (candidates.length === 0) {
    return (
      <div className="rounded-xl border border-corp-gray-200 bg-surface-card p-6 text-center text-sm text-corp-gray-600">
        No hay candidatos para comparar.
      </div>
    );
  }

  const metricKeys = Object.keys(candidates[0].metrics);

  const chartData = metricKeys.map((metric) => {
    const metricRow: Record<string, string | number> = {
      metric,
    };

    candidates.forEach((candidate) => {
      metricRow[`candidate-${candidate.id}`] = candidate.metrics[metric];
    });

    return metricRow;
  });

  return (
    <div className="min-w-0 rounded-xl border border-border bg-card px-4 pb-4 pt-5">
      <div className="flex min-w-0 flex-col">
        <h3 className="mb-1 text-sm font-semibold text-foreground">
          Gráfica Comparativa de Candidatos
        </h3>
        <p className="text-xs text-muted-foreground">
          Comparación de desempeño por métricas comunes.
        </p>

        <div className="mt-7 h-[420px] min-w-0 w-full">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            minHeight={320}
          >
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
              <XAxis
                dataKey="metric"
                tick={{ fill: "hsl(215 15% 52%)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "hsl(215 15% 52%)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "hsl(220 18% 10%)",
                  border: "1px solid hsl(220 14% 16%)",
                  borderRadius: 8,
                  color: "hsl(210 20% 92%)",
                }}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingBottom: 12, fontSize: 12 }}
              />

              {candidates.map((candidate, index) => (
                <Line
                  key={candidate.id}
                  type="linear"
                  dataKey={`candidate-${candidate.id}`}
                  name={candidate.nombre}
                  stroke={CANDIDATE_COLORS[index % CANDIDATE_COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2, fill: "hsl(220 18% 10%)" }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export type { ComparativeCandidate };
