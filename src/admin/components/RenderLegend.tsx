const LEGEND_LABELS: Record<string, string> = {
  capacidad: "CAPACIDAD INTELECTUAL",
  comportamiento: "COMPORTAMIENTO EN EL TRABAJO",
  personalidad: "PERSONALIDAD",
  competencia: "COMPETENCIA",
};

export const RenderLegend = (props: {
  payload?: ReadonlyArray<{ value?: string | number; color?: string }>;
}) => {
  const { payload } = props;
  if (!payload) return null;
  return (
    <div className="flex flex-col items-start gap-2 pb-2 sm:flex-row sm:flex-wrap sm:justify-center">
      {payload.map((entry) => (
        <div key={String(entry.value)} className="flex items-center gap-1.5">
          <span
            className="inline-block h-3 w-3 rounded-full"
            style={{ backgroundColor: entry.color ?? "transparent" }}
          />
          <span className="text-[11px] font-medium leading-4 tracking-wide text-muted-foreground sm:text-xs">
            {LEGEND_LABELS[String(entry.value)] ?? String(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};
