import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type ChartMetricItem = {
  factor: string;
  percentil: number;
};

type ChartPorTipoProps = {
  data: ChartMetricItem[];
  sectionTitle: string;
};

const FACTOR_COLORS = [
  "#E044A7",
  "#744ED2",
  "#F59E0B",
  "#2EC4B6",
  "#38BDF8",
  "#22C55E",
  "#FB7185",
  "#6366F1",
];

const MAX_SCORE = 100;

export const ChartPorTipo = ({ data, sectionTitle }: ChartPorTipoProps) => {
  const totalPercentil = data.reduce((acc, item) => acc + item.percentil, 0);
  const evaluationProgress =
    data.length > 0 ? Number((totalPercentil / data.length).toFixed(2)) : 0;

  const safeProgress = Math.min(MAX_SCORE, Math.max(0, evaluationProgress));

  const chartData = [
    ...data.map((item, index) => {
      const safePercentil = Math.min(MAX_SCORE, Math.max(0, item.percentil));

      return {
        name: item.factor,
        valor:
          data.length > 0
            ? Number((safePercentil / data.length).toFixed(2))
            : 0,
        porcentaje: Number(safePercentil.toFixed(2)),
        fill: FACTOR_COLORS[index % FACTOR_COLORS.length],
        kind: "factor",
      };
    }),
    {
      name: "Remanente",
      valor: Number((MAX_SCORE - safeProgress).toFixed(2)),
      porcentaje: Number((MAX_SCORE - safeProgress).toFixed(2)),
      fill: "var(--corp-gray-200)",
      kind: "remaining",
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
                _value: number | undefined,
                _name: string | undefined,
                item,
              ) => [
                `${item.payload?.porcentaje ?? 0}%`,
                item.payload?.kind === "remaining"
                  ? "No alcanzado"
                  : (item.payload?.name ?? ""),
              ]}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              wrapperStyle={{ fontSize: "12px", color: "var(--corp-gray-600)" }}
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
