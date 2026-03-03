# Informe Operativo: Histórico de Evaluaciones (Mock + Ruta a Backend)

## Alcance

Esta guía documenta lo implementado para el histórico de evaluaciones del candidato y cómo evolucionarlo a una implementación real con backend.

Archivo principal implementado:

- [src/admin/features/grupos/components/InformeOperativo.tsx](src/admin/features/grupos/components/InformeOperativo.tsx)

## Objetivo funcional

- Mantener historial completo de intentos por candidato y tipo de evaluación.
- No sobrescribir intentos anteriores.
- Permitir consulta por tipo de evaluación.
- Ordenar por:
  - Puntaje más alto (descendente)
  - Fecha de generación (más reciente primero)
- Exponer una vista de mejor puntaje por evaluación sin perder trazabilidad histórica.

---

## 1) Estado actual implementado (Mock)

### 1.1 Modelo de datos

Se usa una estructura de intentos independientes:

- `ReportEvaluationAttempt`
  - `id`
  - `candidateId`
  - `evaluationType`
  - `score`
  - `createdAt`

Mock dataset:

- `REPORT_EVALUATION_ATTEMPTS`

### 1.2 Regla de no sobrescritura

Se implementó helper append-only:

- `appendEvaluationAttempt(attempts, nextAttempt)`

Comportamiento:

- Agrega el intento al final de la colección.
- No reemplaza registros previos.
- Mantiene histórico acumulativo.

### 1.3 Consulta y ordenamiento

Se implementó:

- `getCandidateEvaluationAttempts(candidateId, evaluationType, options?)`

Capacidades:

- Filtro por candidato.
- Filtro por tipo de evaluación.
- Filtro por fecha de generación (`generationDate`).
- Filtro por puntaje mínimo (`minScore`).
- Ordenamiento por:
  - `score` (desc, desempata por fecha desc)
  - `createdAt` (desc, desempata por puntaje desc)

### 1.4 UI unificada con submenú

Se unificaron las dos tablas en una sola sección con submenú:

- Vista 1: Mejor puntaje por evaluación
- Vista 2: Histórico de intentos

Filtros visibles en la vista de histórico:

- Tipo de evaluación
- Fecha de generación
- Puntaje mínimo
- Ordenar por (puntaje o fecha)

Resultado funcional:

- Se puede ver el mejor resultado por tipo para CRM.
- Todos los intentos anteriores siguen almacenados y consultables.

---

## 2) Diseño recomendado para backend real

## 2.1 Modelo de persistencia (append-only)

Tabla sugerida: `candidate_evaluation_attempts`

Campos mínimos:

- `id` (PK)
- `candidate_id` (FK)
- `evaluation_type` (varchar)
- `score` (numeric/int)
- `created_at` (timestamp)

Campos opcionales recomendados:

- `status` (completed, failed, pending)
- `source` (crm, api, batch)
- `metadata` (jsonb para payload extra)
- `created_by` (usuario/sistema)

Índices recomendados:

- `(candidate_id, evaluation_type)`
- `(candidate_id, created_at desc)`
- `(candidate_id, evaluation_type, score desc, created_at desc)`

Regla crítica:

- No usar UPDATE para “reescribir intento anterior”.
- Todo nuevo intento se registra con INSERT.

## 2.2 API recomendada

### Crear intento (append-only)

- `POST /api/candidates/:candidateId/evaluation-attempts`

Body ejemplo:

- `evaluationType`
- `score`
- `createdAt` (opcional; backend puede asignarlo)

Respuesta:

- Registro creado con `id` definitivo.

### Listar intentos (histórico)

- `GET /api/candidates/:candidateId/evaluation-attempts`

Query params:

- `evaluationType`
- `generationDate` (YYYY-MM-DD)
- `minScore`
- `sortBy` (`score` | `createdAt`)
- `order` (`desc` | `asc`, por defecto `desc`)
- `page`, `pageSize`

### Resumen de mejor puntaje por tipo

- `GET /api/candidates/:candidateId/evaluation-attempts/best-by-type`

Respuesta por fila:

- `evaluationType`
- `bestScore`
- `bestCreatedAt`
- `attemptsCount`

Nota:

- Esta vista es derivada (query agregada), no reemplaza histórico.

## 2.3 Lógica de negocio en backend

Servicio sugerido:

- `createEvaluationAttempt`: valida y hace INSERT.
- `listEvaluationAttempts`: aplica filtros + sort + paginación.
- `getBestByType`: agrega por tipo usando score desc y fecha desc como desempate.

Pseudoregla de desempate:

1. Mayor puntaje
2. Si empate, intento más reciente

## 2.4 Consistencia y auditoría

- Registrar zona horaria consistente (ideal UTC).
- Mantener inmutables los intentos históricos.
- Agregar trazabilidad de actor (`created_by`) para auditoría.

---

## 3) Integración Frontend cuando exista backend

## 3.1 Qué reemplazar

En [src/admin/features/grupos/components/InformeOperativo.tsx](src/admin/features/grupos/components/InformeOperativo.tsx):

- Reemplazar `REPORT_EVALUATION_ATTEMPTS` por llamadas API.
- Mantener tipos y la UX actual (submenú, filtros, orden).

## 3.2 Capa sugerida

Crear archivo API del feature, por ejemplo:

- `src/admin/features/grupos/api/evaluationAttempts.api.ts`

Funciones sugeridas:

- `createEvaluationAttempt(candidateId, payload)`
- `getEvaluationAttempts(candidateId, filters)`
- `getBestAttemptsByType(candidateId)`

## 3.3 Estado de datos

Recomendado con TanStack Query:

- Query key histórico:
  - `['evaluation-attempts', candidateId, filters]`
- Query key resumen:
  - `['evaluation-attempts-best', candidateId]`
- Mutation crear intento:
  - invalidar ambas queries para refrescar.

## 3.4 Contrato de UI estable

La UI actual ya soporta:

- Navegación por submenú.
- Filtros de histórico.
- Ordenamiento.
- Resumen por mejor puntaje.

Esto permite cambiar la fuente de datos sin reescribir la experiencia visual.

---

## 4) Plan de migración recomendado

1. Extraer mocks/helpers de intentos a archivo dedicado del feature.
2. Crear cliente API y DTOs backend.
3. Sustituir lecturas mock por queries remotas.
4. Sustituir append local por mutation POST.
5. Agregar loading/error/empty states por vista.
6. Incorporar paginación en histórico si el volumen crece.

---

## 5) Criterios de aceptación funcional

- Crear un nuevo intento de la misma evaluación no elimina intentos anteriores.
- El histórico devuelve todos los intentos del candidato.
- El resumen muestra el mejor puntaje por evaluación.
- Los filtros (fecha, puntaje, tipo) funcionan combinados.
- El orden por puntaje y por fecha respeta desempates definidos.

---

## 6) Riesgos y mitigación

- Riesgo: timestamps con formatos mixtos.
  - Mitigación: normalizar formato ISO UTC en backend.
- Riesgo: crecimiento de tabla histórica.
  - Mitigación: índices compuestos + paginación.
- Riesgo: confundir resumen con histórico.
  - Mitigación: mantener endpoints separados y nombres claros.
