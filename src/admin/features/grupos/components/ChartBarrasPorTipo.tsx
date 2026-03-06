import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartMetricItem = {
  factor: string;
  percentil: number;
};

type ChartBarrasPorTipoProps = {
  data: ChartMetricItem[];
  sectionTitle: string;
};

const normalizeFactor = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const FACTOR_COLOR_MAP: Record<string, string> = {
  "capacidad intelectual": "#744ED2",
  "comprension verbal": "#E044A7",
  "concepcion espacial": "#F59E0B",
  razonamiento: "#744ED2",
  "habilidad numerica": "#2EC4B6",
  "fluidez verbal": "#38BDF8",
};

const FALLBACK_COLORS = ["#22C55E", "#FB7185", "#6366F1"];

const MAX_SCORE = 100;

export const getFactorColor = (factor: string, index: number) => {
  return (
    FACTOR_COLOR_MAP[normalizeFactor(factor)] ??
    FALLBACK_COLORS[index % FALLBACK_COLORS.length]
  );
};

export const ChartBarrasPorTipo = ({
  data,
  sectionTitle,
}: ChartBarrasPorTipoProps) => {
  const isSingleBar = data.length === 1;

  const chartData = data.map((item, index) => ({
    nombre: item.factor,
    valor: Math.min(MAX_SCORE, Math.max(0, Number(item.percentil) || 0)),
    fill: getFactorColor(item.factor, index),
  }));

  return (
    <div className="h-full rounded-xl border border-corp-gray-200 bg-surface-card p-4">
      <h3 className="text-sm font-semibold text-text-strong">{sectionTitle}</h3>
      <p className="mb-2 text-xs text-corp-gray-600">
        Percentil por evaluación
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 16, right: 12, left: 0, bottom: 8 }}
            barCategoryGap={isSingleBar ? "0%" : "65%"}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="nombre"
              tick={{ fill: "var(--corp-gray-600)", fontSize: 12 }}
              interval={0}
              angle={-8}
              textAnchor="end"
              height={52}
              tickMargin={6}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tick={{ fill: "var(--corp-gray-600)", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number | string | undefined) => [
                `${value ?? 0}%`,
                "Percentil",
              ]}
              labelFormatter={(label) => `Evaluación: ${label}`}
            />
            <Bar
              dataKey="valor"
              radius={[6, 6, 0, 0]}
              isAnimationActive={false}
              barSize={isSingleBar ? 48 : undefined}
              maxBarSize={isSingleBar ? 48 : 44}
            >
              {chartData.map((entry, index) => (
                <Cell key={`${entry.nombre}-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs text-corp-gray-600">
        Evaluaciones consideradas: {chartData.length}
      </p>
    </div>
  );
};
