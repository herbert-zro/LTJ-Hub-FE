# Dashboard Components: Preparación para Backend

## Alcance

Este documento cubre los componentes de dashboard listados en el contexto:

- [src/admin/features/dashboard/components/MetricChart.tsx](src/admin/features/dashboard/components/MetricChart.tsx)
- [src/admin/features/dashboard/components/CandidatosChart.tsx](src/admin/features/dashboard/components/CandidatosChart.tsx)
- [src/admin/features/dashboard/components/EvaluacionesChart.tsx](src/admin/features/dashboard/components/EvaluacionesChart.tsx)
- [src/admin/features/dashboard/components/EvaluacionesPorTipo.tsx](src/admin/features/dashboard/components/EvaluacionesPorTipo.tsx)

Contexto funcional actual:

- Componentes orientados a mockup funcional.
- Datos hardcoded/ficticios.
- UI basada en React + Vite + TypeScript + Tailwind + shadcn/ui.
- Arquitectura feature-based.
- Próxima fase: integración con API REST.

---

## 1) MetricChart

### 1. 📦 Descripción General del Componente

- Propósito: visualizar comparativa de pruebas enviadas por día y categoría.
- Módulo: dashboard.
- Rol en el flujo: panel analítico principal para lectura rápida del comportamiento semanal/mensual.

### 2. 🧱 Estructura Interna

- Props:
  - `data?: ChartData[]`
- Estado local:
  - `selectedMonth` (`useState`) para cambiar el mes de referencia.
- Hooks utilizados:
  - `useState`.
- Hijos relevantes:
  - `Card`, `CardHeader`, `CardContent` (shadcn/ui)
  - `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` (shadcn/ui)
  - `BarChart`, `Bar`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `Legend`, `ResponsiveContainer` (Recharts)
  - `RenderLegend` (componente custom)
- Dependencias externas:
  - `recharts`, `@/components/ui/*`.

### 3. 📊 Manejo de Datos (Estado Actual - Mock)

- Los datos vienen de `DEFAULT_DATA` local, tipados con `ChartData`.
- Se calcula `daysInMonth` desde el mes seleccionado y se ajustan valores (`Math.min`) para no exceder días del mes.
- Limitaciones actuales:
  - No refleja picos reales por empresa/segmento/usuario.
  - No hay paginación, filtros avanzados ni segmentación real por backend.
  - El mes solo altera límites de eje, no consulta datos reales.
- Cambio esperado con backend:
  - Sustituir `DEFAULT_DATA` por respuesta API parametrizada por mes y compañía.

### 4. 🔌 Preparación para Integración con Backend

- Mover a `services/api`:
  - fetch de series por mes (`getMetricComparisonByMonth`).
  - mapeo DTO -> modelo de UI.
- Mantener en presentación:
  - rendering del gráfico.
  - estilos, ejes, tooltip, leyenda.
- TanStack Query recomendado:
  - key sugerida: `["dashboard", "metric-chart", companyId, month]`.
  - usar `select` para transformar payload y mantener componente limpio.
- Interfaces futuras sugeridas:

```ts
export interface MetricComparisonPoint {
  day: string;
  capacidad: number;
  comportamiento: number;
  personalidad: number;
  competencia: number;
}

export interface MetricComparisonParams {
  companyId: string;
  month: number; // 0-11
  year: number;
}

export interface MetricComparisonResponse {
  points: MetricComparisonPoint[];
}
```

### 5. ⚙️ Consideraciones de Escalabilidad

- Refactor sugerido:
  - extraer cálculo de ticks y `daysInMonth` a util (`chart.utils.ts`).
  - separar `MonthSelector` como subcomponente reusable.
- SOLID:
  - SRP: separar fetch/transformación de la vista.
  - OCP: permitir series dinámicas sin tocar JSX fijo de `<Bar>`.

### 6. 🎨 Consideraciones de UI/UX

- shadcn: ya usa `Card` y `Select` correctamente.
- Responsividad: `ResponsiveContainer` presente, correcto.
- Faltantes para producción:
  - skeleton loading.
  - empty state sin datos.
  - error state con acción “reintentar”.

### 7. 🚀 Plan de Evolución

1. Extraer `DEFAULT_DATA` a archivo mock temporal del feature.
2. Crear `dashboard.api.ts` y método `getMetricComparisonByMonth`.
3. Integrar hook (`useQuery`) con params (`companyId`, `month`, `year`).
4. Implementar loading/error/empty.
5. Agregar pruebas unitarias de transformación + integración de render.

---

## 2) CandidatosChart

### 1. 📦 Descripción General del Componente

- Propósito: mostrar crecimiento de candidatos (activos/inactivos) por mes.
- Módulo: dashboard.
- Rol: indicador de tendencia temporal para decisiones operativas.

### 2. 🧱 Estructura Interna

- Props: no recibe props actualmente.
- Estado local: no tiene.
- Hooks: no usa hooks.
- Hijos/dependencias:
  - `LineChart`, `Line`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `ResponsiveContainer`.
- Datos:
  - `candidatosData` importado de `../types/chartData`.

### 3. 📊 Manejo de Datos (Estado Actual - Mock)

- Fuente mock local del feature.
- Limitaciones:
  - serie fija; no depende de filtros de negocio.
  - no distingue compañía/sede/segmento.
- Cambio esperado:
  - consumir series por rango temporal y contexto (companyId).

### 4. 🔌 Preparación para Integración con Backend

- Backend/service:
  - endpoint de tendencia mensual.
  - posible agregación por `status` (`active`, `inactive`).
- Presentación:
  - mantener estilo de líneas, grid y tooltip.
- TanStack Query:
  - key sugerida: `["dashboard", "candidate-growth", companyId, from, to]`.
- Interfaces futuras:

```ts
export interface CandidateGrowthPoint {
  month: string;
  activos: number;
  inactivos: number;
}

export interface CandidateGrowthResponse {
  points: CandidateGrowthPoint[];
}
```

### 5. ⚙️ Consideraciones de Escalabilidad

- Recibir props de configuración (`title`, `seriesConfig`) para reutilización.
- Centralizar colores de series en constante compartida para coherencia entre gráficos.

### 6. 🎨 Consideraciones de UI/UX

- Diseño ya consistente con dashboard cards.
- Añadir estados:
  - loading con placeholder.
  - error con mensaje contextual.
  - empty con copy orientado a negocio.

### 7. 🚀 Plan de Evolución

1. Extraer dataset mock actual.
2. Crear endpoint/service para growth.
3. Integrar query con filtros de fecha/compañía.
4. Añadir estados UX.
5. Testing de mapeo y render de líneas.

---

## 3) EvaluacionesChart

### 1. 📦 Descripción General del Componente

- Propósito: mostrar barras horizontales de evaluaciones por categoría.
- Módulo: dashboard.
- Rol: comparación rápida de magnitudes por tipo.

### 2. 🧱 Estructura Interna

- Props:
  - `title: string`
  - `data: { label: string; value: number; color: string }[]`
- Estado local: no tiene.
- Hooks: no usa hooks.
- Dependencias:
  - componente visual puro (sin Recharts).

### 3. 📊 Manejo de Datos (Estado Actual - Mock)

- Depende totalmente del caller para los datos.
- Calcula `maxValue` para normalizar anchos de barra.
- Limitaciones:
  - color viene como string libre (`color`) y puede romper consistencia de tema.
  - sin validación de dataset vacío.
- Cambio esperado:
  - consumir datos desde endpoint de distribución por tipo.

### 4. 🔌 Preparación para Integración con Backend

- Mover a service/api:
  - agregaciones por tipo y periodo.
- Mantener en presentación:
  - cálculo de proporción visual.
- TanStack Query:
  - key: `["dashboard", "evaluations-by-type", companyId, period]`.
- Interfaces futuras:

```ts
export interface EvaluationTypeStat {
  type: string;
  count: number;
}

export interface EvaluationTypeResponse {
  items: EvaluationTypeStat[];
}
```

### 5. ⚙️ Consideraciones de Escalabilidad

- Convertir `color` a clave semántica (ej. `tone: "primary" | "warning" | ...`) y mapear en UI.
- Extraer fila de barra como subcomponente para simplificar mantenimiento.

### 6. 🎨 Consideraciones de UI/UX

- Buena legibilidad actual.
- Añadir:
  - `aria` labels para barras.
  - estado vacío cuando no hay items.
  - truncamiento/tooltip para labels largos.

### 7. 🚀 Plan de Evolución

1. Definir adapter de data backend -> shape del componente.
2. Centralizar mapeo de color por tipo.
3. Integrar query en contenedor feature.
4. Manejar loading/error/empty.
5. Añadir tests de rendering proporcional.

---

## 4) EvaluacionesPorTipo

### 1. 📦 Descripción General del Componente

- Propósito: mostrar distribución porcentual de evaluaciones por tipo (pie/donut).
- Módulo: dashboard.
- Rol: lectura de composición del volumen evaluativo.

### 2. 🧱 Estructura Interna

- Props: no recibe actualmente.
- Estado local: no tiene.
- Hooks: no usa hooks.
- Dependencias:
  - `PieChart`, `Pie`, `Cell`, `ResponsiveContainer`, `Legend`, `Tooltip` (Recharts).
  - `evaluacionesPorTipoData` (mock local).

### 3. 📊 Manejo de Datos (Estado Actual - Mock)

- Data importada de archivo de tipos/data mock.
- Cada entrada incluye color (`fill`) predefinido.
- Limitaciones:
  - no contempla tipos dinámicos nuevos desde backend.
  - no existe estrategia de fallback de color cuando el tipo no está mapeado.
- Cambio esperado:
  - endpoint real de distribución + normalización de porcentajes.

### 4. 🔌 Preparación para Integración con Backend

- Service/api:
  - obtener distribución por tipo y periodo.
- Presentación:
  - conservar pie + tooltip + legend.
- TanStack Query:
  - key: `["dashboard", "evaluation-distribution", companyId, period]`.
- Interfaces futuras:

```ts
export interface EvaluationDistributionItem {
  name: string;
  value: number; // conteo o porcentaje
}

export interface EvaluationDistributionResponse {
  items: EvaluationDistributionItem[];
  total: number;
}
```

### 5. ⚙️ Consideraciones de Escalabilidad

- Crear util `resolveChartColorByType(name)` para nuevos tipos.
- Separar el `formatter` del tooltip/legend en util para reutilización.

### 6. 🎨 Consideraciones de UI/UX

- Buen uso de `ResponsiveContainer`.
- Mejoras sugeridas:
  - estado vacío (“Sin evaluaciones en el período”).
  - loading skeleton.
  - error toast/card.

### 7. 🚀 Plan de Evolución

1. Extraer mock a adapter temporal.
2. Crear endpoint/servicio de distribución.
3. Integrar query y transformación.
4. Manejar estados UX.
5. Tests de formatter y render de segmentos.

---

## Arquitectura recomendada para la siguiente fase

### Separación sugerida por capas

- `components/`: presentación pura.
- `hooks/`: orquestación de query + params.
- `services/api/`: llamadas HTTP.
- `adapters/`: transformación DTO -> modelo UI.
- `types/`: contratos de dominio.

### Ejemplo de hook con TanStack Query (futuro)

```ts
import { useQuery } from "@tanstack/react-query";
import { getCandidateGrowth } from "../services/dashboard.api";

export const useCandidateGrowth = (
  companyId: string,
  from: string,
  to: string,
) => {
  return useQuery({
    queryKey: ["dashboard", "candidate-growth", companyId, from, to],
    queryFn: () => getCandidateGrowth({ companyId, from, to }),
    enabled: Boolean(companyId),
    staleTime: 60_000,
  });
};
```

---

## Checklist transversal (para los 4 componentes)

- [ ] Extraer datos mock a fixtures/adapters.
- [ ] Definir contratos API por componente.
- [ ] Implementar servicios en `shared/api` o `feature/api`.
- [ ] Integrar queries con `queryKey` estable.
- [ ] Implementar loading/error/empty states.
- [ ] Centralizar colores/formatters de charts.
- [ ] Agregar pruebas de transformación y render.
- [ ] Validar accesibilidad mínima (labels, contraste, teclado donde aplique).

---

## Nota de implementación

Se recomienda migrar primero un componente end-to-end (por ejemplo `CandidatosChart`) para validar el patrón técnico (service + query + adapter + estados UX). Una vez estabilizado, replicar el mismo enfoque al resto de gráficos del dashboard.
