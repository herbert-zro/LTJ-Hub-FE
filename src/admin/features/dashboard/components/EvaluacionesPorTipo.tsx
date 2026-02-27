import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { evaluacionesPorTipoData } from "../types/chartData";

export const EvaluacionesPorTipo = () => {
  return (
    <div className="h-full rounded-xl border border-border bg-card p-4">
      <h3 className="text-sm font-semibold text-foreground">
        Evaluaciones por Tipo
      </h3>
      <p className="mb-2 text-xs text-muted-foreground">
        Distribución de evaluaciones aplicadas
      </p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={evaluacionesPorTipoData}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={74}
              dataKey="valor"
              nameKey="name"
              strokeWidth={0}
            >
              {evaluacionesPorTipoData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                color: "#1f2937",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
              formatter={(
                value: number | undefined,
                name: string | undefined,
              ) => [`${name ?? ""} ${value ?? 0}%`, ""]}
            />
            <Legend
              iconSize={10}
              wrapperStyle={{ paddingTop: 4 }}
              formatter={(value) => (
                <span style={{ color: "hsl(215 15% 52%)", fontSize: 12 }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
