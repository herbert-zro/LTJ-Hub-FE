# Modulo de Grupos - Guia de Produccion

## Objetivo

Esta carpeta documenta, por vista, como pasar el modulo `src/admin/features/grupos` de mockups a produccion con una implementacion mantenible, segura y observable.

## Mapa de rutas actual

Fuente: `src/admin/features/grupos/grupos.routes.tsx`

- `/admin/grupos` -> listado de grupos
- `/admin/grupos/form` -> crear grupo
- `/admin/grupos/:groupId/edit` -> editar grupo
- `/admin/grupos/:id/candidatos` -> listado de candidatos del grupo
- `/admin/grupos/:id/candidatos/form` -> crear candidato
- `/admin/grupos/:id/informe-operativo/:userId` -> informe operativo
- `/admin/grupos/:id/perfil-candidato/:userId` -> perfil de candidato
- `/admin/grupos/:id/comparative-chart` -> grafica comparativa
- `/admin/grupos/:id/resultados` -> resultados del grupo

## Documentos por vista

- `docs/grupos/01-vista-listado-grupos.md`
- `docs/grupos/02-vista-formulario-grupo.md`
- `docs/grupos/03-vista-candidatos-grupo.md`
- `docs/grupos/04-vista-grafica-comparativa.md`
- `docs/grupos/05-vista-informe-operativo.md`
- `docs/grupos/06-vista-perfil-candidato.md`
- `docs/grupos/07-vista-resultados-grupo.md`

## Orden recomendado de implementacion

1. Base tecnica transversal (cliente HTTP, manejo de errores, auth, permisos, telemetry).
2. Listado + formulario de grupos.
3. Candidatos por grupo + alta de candidato.
4. Informe operativo (incluye exportaciones y agregado de pruebas).
5. Perfil candidato y resultados.
6. Grafica comparativa conectada a datos reales.

## Criterios transversales obligatorios

- Estado servidor: usar TanStack Query para `fetch`, cache, invalidaciones y reintentos.
- Formularios: usar React Hook Form + Zod para validaciones robustas.
- Mutaciones: exponer servicios por feature (`grupos.api.ts`) y no usar `console.log`.
- Seguridad: enviar token de sesion, validar permisos por accion (crear, editar, eliminar, exportar).
- UX: estados `loading`, `empty`, `error`, `success` en todas las tablas/formularios.
- Accesibilidad: foco en modales, `aria-label` en icon actions, contraste y navegacion por teclado.
- Trazabilidad: log de eventos de negocio (crear grupo, agregar candidato, exportar informe).
- Testing: unit + integration + e2e para flujos criticos.

## Estructura sugerida de codigo (feature-first)

```ts
src/admin/features/grupos/
  api/
    grupos.api.ts
    grupos.schemas.ts
  hooks/
    useGruposList.ts
    useGrupoDetail.ts
    useGrupoMutations.ts
    useGrupoCandidates.ts
  mappers/
    grupos.mapper.ts
  pages/
  components/
  types/
```

## Definicion de terminado (DoD)

- Sin datos hardcodeados en componentes de vista.
- Sin `console.log` para acciones de negocio.
- Errores de API mapeados a mensajes de negocio.
- Pruebas minimas por vista ejecutando en CI.
- Documentacion de contrato API versionada y validada con backend.
