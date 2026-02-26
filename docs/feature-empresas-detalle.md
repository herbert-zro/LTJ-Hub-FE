# Feature Empresas: detalle por ID

## Documentación relacionada

- [TableRowActions extensible por feature](./table-row-actions-extensible.md)

## Objetivo

Habilitar una vista de detalles para una empresa seleccionada desde la tabla, usando el `id` en la URL.

## Resumen de implementación

Se completó el flujo end-to-end para que la acción de **ver detalles** en la tabla de empresas navegue al detalle de la empresa seleccionada.

## Archivos involucrados

- `src/admin/components/TableRowActions.tsx`
- `src/admin/features/empresas/table/empresas.columns.tsx`
- `src/admin/features/empresas/hooks/useEmpresas.ts`
- `src/admin/features/empresas/empresas.routes.tsx`
- `src/admin/features/empresas/pages/EmpresaDetailsPage.tsx`
- `src/admin/features/empresas/components/EmpresaDetails.tsx`
- `src/admin/features/empresas/mock/empresas.mock.ts`

## Cambios clave

### 1) Acción opcional en `TableRowActions`

Se volvió extensible el componente para aceptar una acción opcional de detalles:

- `onViewDetails?: () => void`
- `viewDetailsLabel?: string`

Comportamiento:

- El botón se renderiza **solo** cuando ambas props opcionales están presentes.
- Si no se envían, el componente mantiene su comportamiento previo (editar/eliminar).

### 2) Integración en tabla de empresas

En `empresas.columns.tsx` se envía la acción de detalles por fila:

- `onViewDetails={() => onViewDetails(row.id)}`
- `viewDetailsLabel={`Ver detalle de empresa ${row.nombre}`}`

Esto hace que la tabla de empresas muestre el botón adicional sin impactar otros features.

### 3) Navegación a detalle desde hook

En `useEmpresas.ts` se implementó `handleViewDetails(id)` para navegar a:

- `/admin/empresas/:id`

La navegación usa `useNavigate`.

### 4) Ruta dinámica de detalle

En `empresas.routes.tsx` se agregó la ruta:

- `:id` -> `EmpresaDetailsPage`

Con esto, cada empresa puede abrir su vista específica por identificador.

### 5) Componente de detalle

`EmpresaDetails.tsx` ahora:

- Obtiene `id` con `useParams`.
- Busca la empresa en `EMPRESAS_DATA`.
- Muestra la información principal: `id`, `nombre`, `estado`, `url`, `correo`, `direccion`, `telefono`.
- Maneja fallback cuando el `id` es inválido o la empresa no existe.
- Incluye acción para volver al listado.

## Fuente de datos actual

El detalle usa datos de ejemplo desde:

- `src/admin/features/empresas/mock/empresas.mock.ts`

## Estado actual

- Flujo funcional desde la tabla hasta la vista detalle.
- Implementación compatible con features que no usan el botón de detalles.
- Sin errores de TypeScript en los archivos modificados de este flujo.

## Próximos pasos sugeridos (opcional)

- Reemplazar mock por consumo de API real (`shared/api`).
- Agregar detalle con tabs o secciones si el dominio crece.
- Preparar navegación hacia edición desde la vista de detalle.
