# TableRowActions extensible por feature

## Documentación relacionada

- [Feature Empresas: detalle por ID](./feature-empresas-detalle.md)

## Objetivo

Permitir agregar acciones adicionales por fila sin romper los features existentes.

## Qué se cambió

Se actualizó `src/admin/components/TableRowActions.tsx` para soportar una acción opcional de **ver detalles**.

### Props nuevas (opcionales)

- `onViewDetails?: () => void`
- `viewDetailsLabel?: string`

### Comportamiento

- El botón de detalles **solo se renderiza** cuando se envían **ambas** props opcionales:
  - `onViewDetails`
  - `viewDetailsLabel`
- Si no se envían, el componente mantiene el comportamiento anterior (solo editar/eliminar).

## Implementación en Empresas

En `src/admin/features/empresas/table/empresas.columns.tsx` se pasó la nueva acción:

- `onViewDetails={() => onViewDetails(row.id)}`
- `viewDetailsLabel={\`Ver detalle de empresa ${row.nombre}\`}`

Además:

- Se agregó el handler `handleViewDetails` en `src/admin/features/empresas/hooks/useEmpresas.ts`.
- Se conectó ese handler desde `src/admin/features/empresas/pages/EmpresasPage.tsx` al `buildEmpresaColumns`.

## Reutilización en futuros features

Para habilitar el botón en otro feature:

1. Definir un handler (por ejemplo en su hook o page).
2. Pasar `onViewDetails` y `viewDetailsLabel` al usar `TableRowActions`.
3. Si no se desea mostrar, no enviar esas props.

## Nota de compatibilidad

El cambio es backward-compatible: los features actuales que no usan detalles no requieren modificaciones.
