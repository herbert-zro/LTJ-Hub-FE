import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type ChartMetricItem = {
  factor: string;
  percentil: number;
};

type ChartPorTipoProps = {
  data: ChartMetricItem[];
  sectionTitle: string;
};

const CHART_COLORS = {
  progress: "var(--brand-500)",
  remaining: "var(--corp-gray-200)",
};

const MAX_SCORE = 100;

export const ChartPorTipo = ({ data, sectionTitle }: ChartPorTipoProps) => {
  const totalPercentil = data.reduce((acc, item) => acc + item.percentil, 0);
  const evaluationProgress =
    data.length > 0 ? Number((totalPercentil / data.length).toFixed(2)) : 0;

  const safeProgress = Math.min(MAX_SCORE, Math.max(0, evaluationProgress));

  const chartData = [
    { name: "Promedio", valor: safeProgress, fill: CHART_COLORS.progress },
    {
      name: "Restante",
      valor: Number((MAX_SCORE - safeProgress).toFixed(2)),
      fill: CHART_COLORS.remaining,
    },
  ];

  return (
    <div className="h-full rounded-xl border border-corp-gray-200 bg-surface-card p-4">
      <h3 className="text-sm font-semibold text-text-strong">{sectionTitle}</h3>
      <p className="mb-2 text-xs text-corp-gray-600">
        Promedio total de evaluación
      </p>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={96}
              dataKey="valor"
              nameKey="name"
              strokeWidth={0}
              isAnimationActive={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`${entry.name}-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              formatter={(
                value: number | undefined,
                name: string | undefined,
              ) => [`${value ?? 0}%`, name ?? ""]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-semibold text-text-strong">
              {evaluationProgress.toFixed(2)}/100
            </p>
            <p className="text-xs text-corp-gray-600">Promedio</p>
          </div>
        </div>
      </div>

      <p className="mt-2 text-xs text-corp-gray-600">
        Factores evaluados: {data.length}
      </p>
    </div>
  );
};
