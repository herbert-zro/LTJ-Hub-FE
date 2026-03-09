# Vista: Formulario de Grupo (Crear/Editar)

## Alcance

Rutas:

- `/admin/grupos/form`
- `/admin/grupos/:groupId/edit`

Archivo actual principal: `src/admin/features/grupos/components/GrupoForm.tsx`

## Estado actual (mock)

- Carga datos de `GRUPOS_MOCK` en modo edicion.
- Empresas desde arreglo local `EMPRESAS_OPTIONS`.
- Submit usa `console.log`.
- Modal de cancelar ya existe y funciona para dirty state.

## Objetivo en produccion

Implementar alta/edicion real con validaciones de negocio, control de concurrencia y manejo de errores de backend.

## Contrato API recomendado

- `GET /api/v1/grupos/{id}`
- `POST /api/v1/grupos`
- `PUT /api/v1/grupos/{id}`
- `GET /api/v1/empresas?status=active`

Payload sugerido:

```json
{
  "nombre": "Grupo Operativo A",
  "empresaId": 10
}
```

## Validaciones sugeridas (frontend + backend)

- `nombre`: requerido, 3-120 chars, trim, no duplicado por empresa.
- `empresaId`: requerido.
- Regla de negocio: no permitir editar empresa si el grupo ya tiene candidatos activos (si aplica).

## Pasos de implementacion

1. Crear schema Zod (`grupos.schemas.ts`) y resolver con React Hook Form.
2. Cargar catalogo de empresas desde API en vez de constante local.
3. En modo edicion, cargar grupo por `groupId` con query dedicada.
4. Reemplazar submit por mutaciones `createGrupo` y `updateGrupo`.
5. Implementar mapeo de errores:
   - 409 duplicado -> mensaje especifico en campo nombre.
   - 422 validacion -> errores por campo.
6. Al guardar, redirigir a `/admin/grupos` y refrescar cache del listado.
7. Mantener modal de cancelacion con deteccion de dirty state del form.

## Buenas practicas clave

- Normalizar strings (`trim`) antes de enviar.
- Bloquear boton guardar mientras la mutacion esta en progreso.
- Deshabilitar submit si form invalido o sin cambios en edicion.
- Usar `id` de empresa, no nombre de empresa, en contratos.

## Casos de prueba

- Crear grupo exitoso y visible en listado.
- Editar grupo mantiene historial y aplica cambios.
- Error 409 muestra mensaje de grupo duplicado.
- Dirty form abre modal de cancelar correctamente.
- Sin permisos, vista solo lectura o redireccion segura.
