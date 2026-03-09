# Vista: Listado de Grupos

## Alcance

Ruta: `/admin/grupos`

Archivo actual principal: `src/admin/features/grupos/pages/GrupoPage.tsx`

## Estado actual (mock)

- Usa `GRUPOS_DATA` hardcodeado.
- Busqueda y paginacion son 100% cliente.
- Eliminar solo hace `console.log`.
- Acciones: ver detalle, editar, eliminar.

## Objetivo en produccion

Tener un listado paginado/filtrable desde backend, con eliminacion real y control de permisos.

## Contrato API recomendado

- `GET /api/v1/grupos`
  - Query: `page`, `pageSize`, `search`, `empresaId`, `sortBy`, `sortDir`
  - Response:

```json
{
  "items": [
    {
      "id": 1,
      "nombre": "Grupo Operativo A",
      "empresa": { "id": 10, "nombre": "LTJ El Salvador" },
      "candidatosCount": 28,
      "createdAt": "2026-03-01T10:00:00Z"
    }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 124
}
```

- `DELETE /api/v1/grupos/{id}`
  - Response `204 No Content`

## Pasos de implementacion

1. Crear `api/grupos.api.ts` con `getGrupos` y `deleteGrupo`.
2. Crear `hooks/useGruposList.ts` con TanStack Query (key: `['grupos', filters]`).
3. Reemplazar `GRUPOS_DATA` por respuesta real y mover filtros a query params.
4. Sincronizar paginacion con URL (`useSearchParams`) para deep-linking.
5. Reemplazar `handleConfirmDelete` por mutacion real con invalidacion de cache.
6. Gestionar permisos:
   - Ocultar boton `Agregar grupo` si no tiene `grupos.create`.
   - Ocultar `Editar/Eliminar` si no tiene `grupos.update/delete`.
7. Agregar `skeleton` de tabla + estado vacio + estado error con reintento.

## Buenas practicas clave

- Debounce de busqueda (250-400 ms).
- Cancelacion de requests al cambiar filtros.
- Mensajes de exito/error centralizados (toast service).
- Confirmacion de eliminacion con nombre del grupo para evitar errores humanos.

## Casos de prueba

- Lista inicial carga correctamente con paginacion.
- Busqueda actualiza query y conserva pagina al refrescar URL.
- Eliminar grupo invalida cache y refresca tabla.
- Usuario sin permiso no ve acciones restringidas.
- Error 500 muestra estado error y permite reintentar.

## Riesgos comunes

- Paginacion cliente/servidor mezclada (datos inconsistentes).
- Filtros sin persistencia en URL.
- Eliminar sin manejo de conflicto (grupo con proceso activo).
