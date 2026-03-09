# Vista: Candidatos por Grupo

## Alcance

Rutas:

- `/admin/grupos/:id/candidatos`
- `/admin/grupos/:id/candidatos/form`

Archivos actuales principales:

- `src/admin/features/grupos/pages/GrupoCandidatosPage.tsx`
- `src/admin/features/grupos/components/CanditadosForm.tsx`
- `src/admin/features/grupos/components/GroupTableRowAction.tsx`
- `src/admin/features/grupos/components/GrupoFileToolbar.tsx`

## Estado actual (mock)

- Tabla basada en `GRUPO_USUARIOS_DATA`.
- Seleccion multiple implementada solo en cliente.
- Alta candidato abre modal con submit mock.
- Exportaciones (`PDF/Excel/Word`) y envio de correo usan `console.log`.

## Objetivo en produccion

Administrar candidatos reales del grupo, con operaciones transaccionales, trazabilidad y exportacion/acciones funcionales.

## Contrato API recomendado

- `GET /api/v1/grupos/{id}/candidatos`
  - Query: `page`, `pageSize`, `search`, `status`, `evaluationType`
- `POST /api/v1/grupos/{id}/candidatos`
- `POST /api/v1/grupos/{id}/candidatos/import` (opcional carga masiva)
- `POST /api/v1/grupos/{id}/candidatos/{candidateId}/reenviar-invitacion`
- `GET /api/v1/grupos/{id}/export?format=pdf|xlsx|docx`

Modelo de fila recomendado:

```json
{
  "id": 18,
  "correlativeId": "018",
  "nombre": "Ana Martinez",
  "correo": "ana@correo.com",
  "registrado": true,
  "evaluaciones": ["TCG", "TP1"],
  "completado": { "done": 2, "total": 6 }
}
```

## Pasos de implementacion

1. Crear `useGrupoCandidates(groupId, filters)` para tabla paginada.
2. Migrar filtros y paginacion a backend + URL params.
3. Reemplazar modal `CanditadosForm` por RHF + Zod + mutacion real.
4. Agregar endpoint para acciones de fila:
   - Ver detalle.
   - Ver informe operativo.
   - Ver perfil.
   - Reenviar pruebas/correo.
5. Convertir export toolbar a descarga real (`blob`) con manejo de errores.
6. Mantener seleccion multiple para `comparative-chart`, pero guardar seleccion en estado compartido (store o URL) en vez de `location.state` temporal.
7. Agregar telemetria de eventos: `candidate_added`, `candidate_reinvited`, `group_export_requested`.

## Buenas practicas clave

- Validar formato correo y duplicados por grupo.
- En tablas grandes, evitar calculos pesados en render; usar memo/selectors.
- Confirmar acciones sensibles (reenvio masivo, importaciones).
- Definir politica de idempotencia para reenvios de invitacion.

## Casos de prueba

- Carga de candidatos por grupo con paginacion servidor.
- Alta candidato valida datos y refresca tabla.
- Reenvio de invitacion responde mensajes por caso (exito, ya enviado, bloqueado).
- Exportacion genera archivo correcto por formato.
- Seleccion multiple persiste al navegar hacia comparativa.
