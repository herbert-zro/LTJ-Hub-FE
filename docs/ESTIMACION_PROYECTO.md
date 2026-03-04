# ESTIMACIÓN PROYECTO — Migración de Mockup a Producto Funcional

Fecha de análisis: 2026-03-04

## A) Resumen ejecutivo

### Estado actual (qué existe hoy)

- El repositorio corresponde a un frontend React + Vite con arquitectura por features, con routing funcional y UI avanzada basada en Shadcn + Tailwind.
- Existe cobertura de módulos de negocio en UI: dashboard, usuarios, empresas, grupos, candidatos, evaluaciones, correo, bitácora y factor-rango.
- La mayor parte de los flujos operan con datos mock/hardcoded (`mock/*.ts` y constantes locales en páginas/componentes).
- No existe integración real a backend en el código actual:
  - No hay cliente HTTP ni servicios API implementados (carpeta `src/shared/api/` vacía).
  - No se detecta uso de Zustand ni TanStack Query en código ni dependencias instaladas.
  - No hay autenticación real, guards de ruta, ni autorización por roles/permisos.
  - No hay manejo transversal de `loading/error/retry`, solo estados vacíos en tablas.
- No hay backend en este repositorio (se asume construcción backend/microservicios desde cero o en repositorio paralelo).

### Qué falta para un MVP funcional

- Definir y construir backend base (auth, company scope, catálogos y operaciones core).
- Integrar frontend a datos reales con capa API + estado global (company + sesión) + caching (TanStack Query).
- Implementar autenticación/autorización end-to-end (FE + BE + gateway).
- Migrar features prioritarias (Empresas, Usuarios, Grupos y Dashboard) de mock a API real.
- Incorporar infraestructura mínima de despliegue (Nginx reverse proxy, ambientes dev/staging/prod, CI/CD, variables de entorno, observabilidad y seguridad base).

### Suposiciones y riesgos principales

#### Suposiciones

1. El backend **no existe** actualmente en este repo y debe construirse.
2. Se utilizará Node.js + Express + arquitectura de microservicios como indicaste.
3. Base de datos relacional principal (PostgreSQL) para datos transaccionales.
4. Se requiere soporte multiempresa (`companyId`) en prácticamente todos los endpoints.
5. Equipo estimado de referencia para planning: 1 Tech Lead, 2 FE, 2 BE, 1 QA compartido, 1 DevOps parcial.

#### Riesgos

- **Alto**: Dominio de `grupos/informe operativo` con alta complejidad funcional y archivos extensos.
- **Alto**: Retrabajo por contratos API no definidos actualmente.
- **Alto**: Falta de auth/roles puede bloquear salida a producción.
- **Medio**: Exportaciones (PDF/Word/Excel) están en stub (`console.log`) y requieren definición técnica clara.
- **Medio**: Riesgo de fragmentación por microservicios si no se define governance de contratos/versionado desde inicio.

---

## B) Inventario del sistema (basado en el repo)

### Features / módulos / páginas detectadas

#### Núcleo app/router/shell

- Router principal: `src/app/router/app.router.tsx`
- Provider raíz app: `src/app/providers/LTJHubApp.tsx`
- Layout admin: `src/admin/shell/layout/AdminLayout.tsx`
- Header + selector compañía: `src/admin/shell/components/AdminHeader.tsx`, `src/admin/shell/components/SelectCompany.tsx`
- Navegación admin: `src/admin/navigation/types/nav-items.ts`, `src/admin/shell/components/NavContent.tsx`

#### Auth

- Layout auth: `src/auth/layout/AuthLayout.tsx`
- Login: `src/auth/pages/login/LoginPage.tsx`

#### Dashboard

- Rutas: `src/admin/features/dashboard/dashboard.routes.tsx`
- Página: `src/admin/features/dashboard/pages/DashboardPage.tsx`
- Componentes: `src/admin/features/dashboard/components/*`
- Mock charts: `src/admin/features/dashboard/types/chartData.ts`

#### Usuarios

- Rutas: `src/admin/features/usuarios/usuarios.routes.tsx`
- Páginas: `src/admin/features/usuarios/pages/UsuariosPage.tsx`, `src/admin/features/usuarios/pages/UserFormPage.tsx`
- Hook: `src/admin/features/usuarios/hooks/useUsuarios.ts`
- Mock: `src/admin/features/usuarios/mock/users.mock.ts`

#### Empresas

- Rutas: `src/admin/features/empresas/empresas.routes.tsx`
- Páginas: `src/admin/features/empresas/pages/*`
- Layout interno: `src/admin/features/empresas/Layout/EmpresaLayout.tsx`
- Hook: `src/admin/features/empresas/hooks/useEmpresas.ts`
- Mock: `src/admin/features/empresas/mock/empresas.mock.ts`

#### Grupos

- Rutas: `src/admin/features/grupos/grupos.routes.tsx`
- Páginas: `src/admin/features/grupos/pages/*`
- Layout interno: `src/admin/features/grupos/layout/GrupoLayout.tsx`
- Componentes complejos: `src/admin/features/grupos/components/InformeOperativo.tsx`, `ComportamientoEnTrabajo.tsx`, `Personalidad.tsx`, `CapacidadIntelectual.tsx`

#### Candidatos

- Rutas: `src/admin/features/candidatos/candidatos.routes.tsx`
- Página: `src/admin/features/candidatos/pages/CandidatosPages.tsx`
- Hook: `src/admin/features/candidatos/hooks/useCandidatos.ts`
- Mock: `src/admin/features/candidatos/mock/candidatos.mock.ts`

#### Evaluaciones

- Rutas: `src/admin/features/evaluaciones/evaluaciones.routes.tsx`
- Páginas: `src/admin/features/evaluaciones/pages/EvaluacionesPage.tsx`, `EvaluacionesFormPage.tsx`

#### Correo

- Rutas: `src/admin/features/correo/correo.routes.tsx`
- Páginas: `src/admin/features/correo/pages/CorreoPage.tsx`, `CorreoFormPage.tsx`

#### Bitácora

- Rutas: `src/admin/features/bitacora/bitacora.routes.tsx`
- Páginas: `src/admin/features/bitacora/pages/BitacoraPage.tsx`, `BitacoraFormPage.tsx`

#### Factor-rango

- Rutas: `src/admin/features/factor-rango/factorRango.routes.tsx`
- Páginas: `src/admin/features/factor-rango/pages/FactorRangoPage.tsx`, `FactorRangoFormPage.tsx`

### Componentes clave reutilizables detectados

- Tabla genérica: `src/admin/components/data-table/DataTable.tsx`
- Toolbar de tablas: `src/admin/components/TableToolbar.tsx`
- Paginación: `src/admin/components/custom/CustomPagination.tsx`
- Acciones por fila: `src/admin/components/TableRowActions.tsx`
- Modal de confirmación: `src/admin/components/ModalCancelar.tsx`
- Componentes UI base (shadcn): `src/components/ui/*`

### Estado actual de state management (Zustand) y data fetching (TanStack Query)

- **Zustand**: no implementado.
- **TanStack Query**: no implementado.
- Evidencia técnica:
  - No hay dependencias en `package.json`.
  - No hay stores ni hooks query/mutation en `src/`.
  - No existe cliente HTTP/API en `src/shared/api/`.

---

## C) Gap Analysis (brechas)

> Se agrupa por módulo funcional para priorizar estimación. “Hoy” = estado mock detectado.

### 1) Auth + sesión

- Qué hace hoy (mock)
  - `LoginPage` es UI visual sin submit real ni token/session (`src/auth/pages/login/LoginPage.tsx`).
  - `/admin` no está protegido por guard.
- Qué debería hacer con datos reales
  - Login contra API, almacenamiento seguro de token, refresh token, logout.
  - Guards por sesión + permisos.
- Dependencias
  - `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh`, `POST /api/v1/auth/logout`, `GET /api/v1/auth/me`.
- Edge cases
  - Credenciales inválidas, expiración de token, sesión inválida, bloqueo por demasiados intentos, timeout de red.

### 2) Selector de compañía / contexto global

- Qué hace hoy (mock)
  - `SelectCompany` usa lista hardcoded local (`src/admin/shell/components/SelectCompany.tsx`).
- Qué debería hacer con datos reales
  - Cargar compañías por usuario, persistir selección, propagar `companyId` a queries.
- Dependencias
  - `GET /api/v1/companies` o `GET /api/v1/me/companies`.
- Edge cases
  - Usuario sin compañías, compañía inactiva, compañía persistida ya no autorizada.

### 3) Dashboard

- Qué hace hoy (mock)
  - Métricas/charts y stats con constantes locales/hardcoded (`DashboardPage`, `chartData.ts`, componentes dashboard).
- Qué debería hacer con datos reales
  - Consultas por compañía y rango de fechas, agregaciones reales, estados loading/error/empty.
- Dependencias
  - Endpoints agregados de métricas y tendencias por período.
- Edge cases
  - Períodos sin datos, latencia alta en agregaciones, discrepancias por timezone.

### 4) Usuarios

- Qué hace hoy (mock)
  - Listado + filtro + paginación client-side desde `USUARIOS_DATA`.
  - Acciones editar/eliminar en stub (`console.log`) en `useUsuarios.ts`.
- Qué debería hacer con datos reales
  - CRUD real con validación backend, paginación server-side, filtros y sort.
- Dependencias
  - `GET/POST/PATCH/DELETE /api/v1/users` + roles/permisos + company scope.
- Edge cases
  - Email duplicado, rol inválido, usuario inactivo, conflictos de concurrencia.

### 5) Empresas

- Qué hace hoy (mock)
  - Listado/detalle/submódulos alimentados por `EMPRESAS_DATA` + mocks inline de roles/usuarios.
  - Navegación funcional por rutas dinámicas.
- Qué debería hacer con datos reales
  - CRUD empresa + gestión de roles/usuarios empresa + factor-rango por empresa.
- Dependencias
  - `GET/POST/PATCH/DELETE /api/v1/companies`
  - `/api/v1/companies/:id/roles`
  - `/api/v1/companies/:id/users`
  - `/api/v1/companies/:id/factor-ranges`
- Edge cases
  - Integridad referencial al eliminar empresa, datos huérfanos, permisos cross-company.

### 6) Grupos (módulo crítico)

- Qué hace hoy (mock)
  - Listado de grupos y vistas avanzadas (candidatos, resultados, informe operativo, comparativas) con datasets locales.
  - Operaciones clave en stub: exportaciones/email/disc result (`console.log`).
  - Alto volumen de lógica en archivos grandes (especialmente `InformeOperativo.tsx`).
- Qué debería hacer con datos reales
  - CRUD grupos, asignación candidatos/evaluaciones, resultados históricos, informes y exportaciones reales.
- Dependencias
  - Endpoints de grupos, miembros, evaluaciones, resultados, reportes y archivos.
  - Integración con correo y/o servicio de exportación.
- Edge cases
  - Paginación y filtros complejos, trazabilidad histórica, volumen de resultados, permisos por rol.

### 7) Candidatos

- Qué hace hoy (mock)
  - Listado desde `CANDIDATOS_DATA`, modal de CV con URL mock.
- Qué debería hacer con datos reales
  - CRUD candidato, gestión de CV/documentos, vínculos a grupos/evaluaciones.
- Dependencias
  - `/api/v1/candidates`, almacenamiento de archivos (S3/obj storage o equivalente), enlaces seguros.
- Edge cases
  - Archivos inexistentes/corruptos, límites de tamaño, formatos no soportados.

### 8) Evaluaciones

- Qué hace hoy (mock)
  - Listado con constante `EVALUACIONES_DATA`; acciones CRUD en stub.
- Qué debería hacer con datos reales
  - Catálogo de evaluaciones + asignación/tipos/indicadores + lifecycle.
- Dependencias
  - `/api/v1/evaluations`, `/api/v1/evaluation-types`.
- Edge cases
  - Tipos inválidos, evaluación en uso no eliminable, catálogos desactualizados.

### 9) Correo

- Qué hace hoy (mock)
  - Plantillas en `CORREO_DATA`, CRUD mock.
- Qué debería hacer con datos reales
  - Gestión de plantillas, preview/render, envío transaccional, tracking de envío.
- Dependencias
  - `/api/v1/email-templates`, `/api/v1/email/send`, proveedor SMTP/API.
- Edge cases
  - Fallos proveedor, reintentos, plantillas con variables faltantes.

### 10) Bitácora

- Qué hace hoy (mock)
  - Tabla con `BITACORA_DATA` local.
- Qué debería hacer con datos reales
  - Registro automático de eventos de negocio y seguridad; consulta filtrable/paginada.
- Dependencias
  - `/api/v1/audit-logs` + emisión de eventos desde servicios.
- Edge cases
  - Alto volumen, retención, PII sensible en logs.

### 11) Factor-rango

- Qué hace hoy (mock)
  - Catálogo amplio hardcoded en `FactorRangoPage.tsx`.
- Qué debería hacer con datos reales
  - Catálogo dinámico por compañía/tipo, CRUD y versionado de reglas.
- Dependencias
  - `/api/v1/factor-ranges` + vinculación con evaluaciones/resultados.
- Edge cases
  - Solapes de rangos percentiles, versiones incompatibles, reglas inválidas.

---

## D) Propuesta de Arquitectura (target)

## 1) Frontend (React + Vite)

### Estructura recomendada (feature-based + capas)

```text
src/
  app/
    providers/
      query/
      auth/
      company/
    router/
      guards/
  shared/
    api/
      client/
      errors/
      interceptors/
    types/
    utils/
  admin/
    features/
      <feature>/
        api/
        hooks/
        pages/
        components/
        types/
        adapters/
```

### Convenciones

- UI pura en `components` (sin fetch directo).
- Hooks feature (`use<Feature>Query`) para acceso a datos.
- Normalizar errores en una capa `shared/api/errors`.
- Query keys por dominio (`["users", companyId, filters]`).
- Estado global en Zustand solo para sesión/compañía/filtros globales.

## 2) Backend (Node.js + Express, microservicios)

### Microservicios propuestos (boundaries)

1. **gateway-service**
   - Entrada única (`/api`), auth middleware, rate limit, routing interno.
2. **identity-service**
   - Login, refresh token, sesiones, usuarios base, roles/permisos globales.
3. **company-service**
   - Empresas, compañías permitidas por usuario, contexto multiempresa.
4. **admin-catalog-service**
   - Usuarios de empresa, roles de empresa, factor-rango.
5. **assessment-service**
   - Evaluaciones, resultados, intentos históricos, informes operativos.
6. **group-candidate-service**
   - Grupos, membresías, candidatos, asignaciones.
7. **notification-service**
   - Plantillas correo, envío, retries, estado de entrega.
8. **audit-service**
   - Bitácora técnica/funcional centralizada.
9. **reporting-export-service** (opcional Fase 2/3)
   - Exportaciones PDF/Word/Excel y reportes pesados.

### Entidades clave

- User, Role, Permission, Company, CompanyUser, CompanyRole
- Group, Candidate, CandidateDocument
- Evaluation, EvaluationAttempt, EvaluationResult, FactorRange
- EmailTemplate, EmailDispatch
- AuditLog

## 3) API (REST)

### Estándares recomendados

- Versionado: `/api/v1/...`
- Paginación: `page`, `pageSize`, `total`, `totalPages`
- Filtros: query params explícitos + sorting (`sortBy`, `order`)
- Error envelope uniforme:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "...",
    "details": []
  }
}
```

- Validación: middleware (zod/joi) en cada endpoint.
- Idempotencia para operaciones sensibles (cuando aplique).

## 4) Infraestructura (Nginx reverse proxy / load balancer)

### Rutas sugeridas

- `/` -> frontend (Vite build estático servido por Nginx)
- `/api/` -> gateway-service (upstream balanceado)
- `/health` -> health endpoint global

### Nginx baseline recomendado

- Upstreams por servicio (mínimo gateway + frontend).
- `proxy_set_header` para `X-Request-Id`, `X-Forwarded-*`.
- Rate limiting básico en `/api/auth/*`.
- Timeouts ajustados para endpoints de reportes/export.
- Compresión y cache-control para assets estáticos.

## 5) Ambientes (dev / staging / prod)

- **Development**: mocks opcionales, logging debug, DB no productiva.
- **Staging**: espejo funcional de prod (sin datos reales sensibles), pruebas UAT.
- **Production**: hardening de seguridad, observabilidad completa, backups y política de secretos.

### Estrategia de variables por ambiente

- `.env.development`, `.env.staging`, `.env.production` (frontend build-time + backend runtime).
- Secretos fuera del repo (Vault/Secrets Manager/GitHub Actions secrets).
- Contratos mínimos:
  - `API_BASE_URL`
  - `AUTH_JWT_SECRET` / `AUTH_JWT_PUBLIC_KEY`
  - `DB_URL_*`
  - `SMTP_*` / proveedor mail
  - `LOG_LEVEL`

---

## E) Estimación detallada (epics -> tareas)

> Escenario estimado: pasar de mockup FE a plataforma funcional FE+BE+infra.
> Unidad: horas efectivas.

| Epic / Módulo                                                     | Tareas concretas                                                                                                                                                                                       | Complejidad | Horas (min-max) | Dependencias           | Riesgos y notas                                           |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | --------------: | ---------------------- | --------------------------------------------------------- |
| 0. Discovery técnico + contratos                                  | - Levantamiento de requisitos por módulo<br>- Definir contratos API v1 (OpenAPI)<br>- Matriz de permisos inicial<br>- Definir criterios DoD por feature                                                | M           |           40-64 | Stakeholders, TL FE/BE | Si contratos cambian tarde, impacta casi todos los épicos |
| 1. Base FE de integración (Zustand + TanStack Query + API client) | - Instalar/configurar Zustand y QueryClient<br>- Crear cliente HTTP, interceptores y manejo errores<br>- Estructura base `shared/api` + adapters<br>- Patrones `loading/error/empty/retry`             | M           |           56-84 | Epic 0                 | Deuda previa en pages con lógica inline aumenta refactor  |
| 2. AuthN/AuthZ end-to-end                                         | - Backend auth service + JWT/refresh<br>- Login/logout/me en FE<br>- Route guards y manejo sesión expirada<br>- Matriz de roles/permisos (mínimo) en backend                                           | L           |          88-132 | Epic 0, 1              | Crítico para seguridad y acceso a `/admin`                |
| 3. Contexto multiempresa global                                   | - Endpoints compañías por usuario<br>- Store global `selectedCompany` + persistencia<br>- Inyección de `companyId` en requests<br>- Revalidación de queries al cambiar compañía                        | M           |           52-80 | Epic 1, 2              | Bloquea coherencia de datos en todos los módulos          |
| 4. Backend plataforma base (gateway + microservicios bootstrap)   | - Estructura microservicios Express<br>- Gateway routing + middlewares comunes<br>- DB migrations/seeds base<br>- Healthchecks + manejo config/env                                                     | L           |         120-180 | Epic 0                 | Riesgo de sobrecoste si se sobredimensiona early-stage    |
| 5. Empresas + Usuarios (core) FE+BE                               | - CRUD empresas y usuarios (server-side pagination/filter)<br>- Roles/usuarios por empresa (mínimo viable)<br>- Integrar vistas `Empresas*` y `Usuarios*` a API<br>- Validaciones y errores de negocio | L           |         120-176 | Epics 1,2,3,4          | Módulo transversal; desbloquea administración operativa   |
| 6. Grupos + Candidatos (core) FE+BE                               | - CRUD grupos/candidatos y membresías<br>- Migrar `GrupoPage` y `GrupoCandidatosPage` a API<br>- Asignación evaluaciones + estados completado<br>- Flujo comparativa e informe operativo básico        | XL          |         168-252 | Epics 1,2,3,4          | Área más compleja; alto riesgo por lógica y volumen UI    |
| 7. Evaluaciones + Factor-rango FE+BE                              | - API catálogos evaluaciones/factor-rango<br>- Migrar `EvaluacionesPage` y `FactorRangoPage`<br>- Reglas de validación/rangos percentiles<br>- Enlaces con módulos de grupos/resultados                | L           |          96-144 | Epics 1,3,4,6          | Riesgo por reglas de negocio no documentadas al detalle   |
| 8. Dashboard real                                                 | - Endpoints agregados de métricas<br>- Integrar charts con Query + filtros fecha/compañía<br>- Manejo loading/error/empty por widget<br>- Ajuste de performance en queries                             | M           |           64-96 | Epics 3,4,5,6,7        | Dependiente de disponibilidad de datos consolidados       |
| 9. Correo + Bitácora FE+BE                                        | - Servicio plantillas y envío (mínimo)<br>- Registro y consulta de auditoría centralizada<br>- Integrar `CorreoPage` y `BitacoraPage` con API<br>- Estrategia retry/fail para envío                    | L           |          92-136 | Epics 2,3,4            | Integración externa de email puede variar costo           |
| 10. Reportes y exportaciones                                      | - Implementar export PDF/Word/Excel (backend)<br>- Reemplazar stubs `console.log` en grupos/informe<br>- Colas/reintentos para export pesado (si aplica)                                               | L           |          72-128 | Epics 6,7,9            | Riesgo alto por cambios frecuentes de formato             |
| 11. Calidad y testing (FE+BE)                                     | - Unit tests críticos FE (utils/hooks)<br>- Integration tests APIs principales<br>- E2E smoke (login + flujo core)<br>- Test de regresión staging                                                      | M           |          88-132 | Epics 1-10 parciales   | Hoy no hay suite de tests; base inicial toma tiempo       |
| 12. DevOps + CI/CD + ambientes                                    | - Dockerfiles FE/BE (opcional pero recomendado)<br>- Pipelines (lint/test/build/deploy)<br>- Nginx reverse proxy + TLS + headers<br>- Gestión de variables por ambiente + secretos                     | L           |          84-124 | Epics 2,4              | Riesgo de credenciales/config por ambiente                |
| 13. Hardening + release                                           | - Observabilidad mínima (logs, métricas, alertas)<br>- Seguridad base (CORS, rate-limit, headers)<br>- UAT + checklist go-live<br>- Plan de rollback y handover                                        | M           |           56-92 | Epics 5-12             | Puede extenderse por hallazgos de UAT                     |

### Totales

- **Total horas estimadas**: **1,296 - 1,920 h**
- **Total días (6h/día)**: **216 - 320 días-persona**
- **Total semanas (5 días/semana, 6h/día)**: **43 - 64 semanas-persona**

#### Lectura ejecutiva de capacidad

- Con 1 persona full-time: ~10 a 15 meses.
- Con equipo paralelo de 5 perfiles productivos (FE/BE/QA/DevOps con solape): ~2.5 a 4.5 meses calendario, dependiendo de definición de contratos y alcance real de reportes/exportaciones.

### Ruta crítica (dependencias que desbloquean)

1. Discovery + contratos (Epic 0)
2. Backend plataforma + Auth (Epics 2 y 4)
3. Contexto multiempresa + base FE integración (Epics 1 y 3)
4. Módulos core operativos (Epics 5 y 6)
5. Dashboard/Correo/Bitácora/Factor-rango (Epics 7,8,9)
6. Testing + DevOps + Hardening + Release (Epics 11,12,13)

---

## F) Plan de ejecución por fases

## Fase 0 — Preparación (1-2 semanas)

- Definir contratos API v1, roles/permisos y company scope.
- Crear base técnica FE (TanStack Query, Zustand, API client) y BE (gateway + servicios base).
- Configurar linters, convenciones, CI inicial y estrategia env.
- Docker opcional desde inicio si acelera parity entre ambientes.

## Fase 1 — MVP (6-10 semanas)

Objetivo: operación mínima real sin mocks en flujos críticos.

- Auth real + guards.
- Select de compañía global + propagación `companyId`.
- Empresas + Usuarios core.
- Grupos + Candidatos core (incluyendo resultados básicos).
- Dashboard mínimo con data real.

## Fase 2 — Hardening funcional (4-6 semanas)

- Evaluaciones + Factor-rango completos.
- Correo + Bitácora integrados.
- Reportes/export básicos.
- Testing automatizado (unit/integration/e2e smoke).
- Performance tuning + manejo de errores robusto.

## Fase 3 — Release (2-3 semanas)

- Staging estable con UAT.
- Seguridad mínima obligatoria + observabilidad.
- Despliegue productivo gradual y plan de rollback.

---

## G) Calidad y pruebas

## Estrategia FE

- Unit tests: utils/formatters/filters/adapters y hooks de dominio.
- Integration tests: páginas críticas con mock server (auth, empresas, grupos).
- E2E smoke: login -> seleccionar compañía -> navegar -> CRUD básico -> logout.

## Estrategia BE

- Unit tests: servicios de negocio y validadores.
- Integration tests: repositorios + DB + endpoints REST.
- Contract tests: validación de OpenAPI contra implementaciones.

## Observabilidad/logging mínimo

- Correlation ID por request (desde gateway).
- Logs estructurados JSON en todos los servicios.
- Métricas básicas: latencia endpoint, error rate, throughput.
- Alertas mínimas: 5xx sostenidos, auth failures anómalos, caída de servicios críticos.

## Seguridad mínima

- AuthN/AuthZ robusta (JWT + refresh + roles/permisos).
- CORS restrictivo por ambiente.
- Rate limit en auth y endpoints sensibles.
- Headers de seguridad (Nginx): HSTS, X-Frame-Options, X-Content-Type-Options, CSP base.
- Secret management fuera de repo.

---

## H) Entregables DevOps / CI-CD

## Dockerfiles sugeridos

- `frontend/Dockerfile`: build Vite + Nginx para estáticos.
- `services/*/Dockerfile`: Node.js production image por microservicio.
- `docker-compose.dev.yml` (opcional) para entorno local integrado.

## Pipeline CI/CD sugerido

1. **CI (pull request)**
   - Install deps
   - Lint
   - Unit tests
   - Build
   - (Opcional) contract checks
2. **CD Staging (main/develop)**
   - Build images
   - Push registry
   - Deploy staging
   - Smoke tests
3. **CD Production (tag/release)**
   - Aprobación manual
   - Deploy blue/green o rolling
   - Health checks + rollback automático básico

## Variables de entorno por ambiente

- Catálogo mínimo por servicio:
  - `NODE_ENV`
  - `PORT`
  - `API_BASE_URL` (en FE)
  - `DB_URL`
  - `JWT_SECRET` / `JWT_PUBLIC_KEY`
  - `REDIS_URL` (si hay cache/colas)
  - `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` (o provider token)
  - `LOG_LEVEL`
- Gestión recomendada:
  - `.env.example` versionado sin secretos.
  - Secretos reales en gestor seguro (no en git).

---

## Observaciones finales del estimado

- Este estimado es **accionable** para planning, pero su precisión depende de cerrar contratos API y reglas de negocio de `grupos/informe/exportaciones`.
- La mayor incertidumbre técnica está en:
  1. microservicios (si se implementan todos desde cero),
  2. permisos granulares,
  3. generación de reportes/exportables.
- Recomendación ejecutiva: iniciar con un **piloto vertical** (Auth + Company + Empresas/Usuarios + un flujo de Grupos) para validar arquitectura y calibrar velocidad real antes de comprometer fechas finales de todo el alcance.
