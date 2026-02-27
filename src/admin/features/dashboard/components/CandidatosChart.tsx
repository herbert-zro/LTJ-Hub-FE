import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { candidatosData } from "../types/chartData";

export const CandidatosChart = () => {
  return (
    <div className="h-full rounded-xl border border-border bg-card px-4 pb-4 pt-5">
      <div className="flex h-full flex-col">
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Crecimiento de Candidatos
        </h3>
        <p className="text-xs text-muted-foreground">
          Activos e inactivos por mes
        </p>
        <div className="mt-7 h-[82%] min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={candidatosData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 14% 16%)" />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(215 15% 52%)", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
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
              <Line
                type="monotone"
                dataKey="activos"
                stroke="hsl(173 80% 50%)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="inactivos"
                stroke="hsl(0 84% 60%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
