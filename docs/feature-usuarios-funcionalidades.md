# Feature Usuarios — Funcionalidades implementadas

Este documento resume los cambios realizados en `src/admin/features/usuarios` durante la refactorización incremental orientada a estabilidad inmediata.

## Objetivo del trabajo

- Modularizar la página de listado de usuarios.
- Reducir lógica inline en `UsuariosPage`.
- Mejorar mantenibilidad sin sobre-generalizar entre features.
- Implementar paginación visual y funcional con mejor UX.

## Cambios implementados

### 1) Mock data separada

Se movió la data fake fuera de la página a:

- `src/admin/features/usuarios/mock/users.mock.ts`

Resultado:

- `USUARIOS_DATA` quedó centralizado en un archivo dedicado.
- Se generó un set de datos de prueba de al menos 100 registros para pruebas de búsqueda y paginación.

---

### 2) Formateadores separados

Se extrajo el formateo del tipo de usuario a:

- `src/admin/features/usuarios/formatters/user.format.ts`

Función:

- `formatTipo(tipo)`

Resultado:

- Reutilización del mismo formateo en tabla y filtrado.
- `UsuariosPage` quedó sin lógica de presentación específica de dominio.

---

### 3) Filtrado separado

Se extrajo la lógica de búsqueda a:

- `src/admin/features/usuarios/utils/filterUsers.ts`

Función:

- `filterUsers(users, query)`

Criterios incluidos en el filtrado:

- `id`
- `nombre`
- `correo`
- `tipo` (usando `formatTipo`)
- `empresa`
- `estado`

Resultado:

- Lógica de filtro desacoplada del componente de UI.
- Más fácil de testear y reutilizar dentro del feature.

---

### 4) Columnas separadas

Se extrajo la definición de columnas de la tabla a:

- `src/admin/features/usuarios/table/users.columns.tsx`

Builder:

- `buildUserColumns({ onEdit, onDelete })`

Resultado:

- `UsuariosPage` dejó de contener estructura de columnas inline.
- Configuración de acciones y celdas encapsulada por feature.

---

### 5) Hook de controlador de página

Se creó el hook:

- `src/admin/features/usuarios/hooks/useUsuariosPage.ts`

Responsabilidades actuales del hook:

- Estado: `searchTerm`, `rowsPerPage`, `currentPage`, `deleteTargetId`
- Handlers: búsqueda, filas por página, cambio de página, editar, eliminar, confirmar/cerrar modal
- Datos derivados: `filteredData`

Resultado:

- `UsuariosPage` quedó enfocado en render/composición.
- Mejor separación entre lógica de estado y presentación.

---

### 6) Paginación funcional + mejora visual

Se mejoró la paginación con dos frentes:

1. **Funcional:**

- Integración real entre `rowsPerPage`, `currentPage`, `totalPages` y `paginatedData`.
- La tabla muestra solo los registros de la página actual.

2. **Visual:**

- `CustomPagination` ya no renderiza todos los botones de páginas cuando hay muchas.
- Se muestra una ventana corta de páginas (máximo visible configurable, default 4) con `...` para rangos ocultos.

Archivos implicados:

- `src/admin/components/RowsPerPage.tsx`
- `src/admin/components/TableToolbar.tsx`
- `src/admin/components/custom/CustomPagination.tsx`
- `src/admin/features/usuarios/pages/UsuariosPage.tsx`

Resultado:

- Interfaz más limpia y usable para datasets grandes.

---

## Estado final de `UsuariosPage`

`UsuariosPage` quedó como capa de orquestación de UI:

- consume `useUsuariosPage`
- calcula `totalPages`, `safeCurrentPage`, `paginatedData`
- construye columnas con `buildUserColumns`
- renderiza toolbar, tabla, paginación y modal

Esto reduce complejidad local y mejora lectura del componente.

## Decisión de arquitectura (estabilidad inmediata)

Se analizó reutilizar completamente estas piezas para todos los features (`correo`, `bitacora`, `factor-rango`, `evaluaciones`).

Decisión aplicada:

- **No generalizar agresivamente por ahora** para evitar acoplamientos prematuros.
- Mantener separaciones por feature, ya que los campos de negocio son distintos.
- Reutilizar solo donde ya existe base compartida estable (`DataTable`, `TableToolbar`, `CustomPagination`, `ModalCancelar`).

## Próximos pasos opcionales (sin urgencia)

- Extraer un hook base genérico para control de tablas (search/page/rows/modal), manteniendo filtros por feature.
- Extraer helper compartido para columna de acciones (editar/eliminar).
- Agregar pruebas unitarias de `filterUsers` y `formatTipo`.
