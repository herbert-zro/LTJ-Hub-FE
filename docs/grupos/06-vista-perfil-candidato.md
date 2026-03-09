# Vista: Perfil de Candidato

## Alcance

Ruta: `/admin/grupos/:id/perfil-candidato/:userId`

Archivo actual principal: `src/admin/features/grupos/pages/GrupoCandidatoPerfil.tsx`

## Estado actual (mock)

- Perfil basado en constante local `CANDIDATE_PROFILES`.
- Grupo actual resuelto con `GRUPOS_CATALOGO` local.
- Permite abrir informe operativo en modal dentro del perfil.

## Objetivo en produccion

Mostrar ficha integral del candidato con datos reales, historial de procesos, y acceso consistente al informe operativo.

## Contrato API recomendado

- `GET /api/v1/candidatos/{candidateId}`
- `GET /api/v1/candidatos/{candidateId}/procesos?includeCurrent=true`
- `GET /api/v1/grupos/{groupId}` (solo si se necesita metadata del grupo)

Respuesta sugerida de perfil:

```json
{
  "id": 1,
  "nombreCompleto": "Ana Martinez",
  "correo": "ana@correo.com",
  "fechaNacimiento": "1995-06-18",
  "estadoCandidato": "Activo",
  "identificacion": { "tipo": "DUI", "numero": "04567891-2" },
  "contacto": { "telefono": "+50370000000", "direccion": "..." }
}
```

## Pasos de implementacion

1. Crear hook `useCandidateProfile(candidateId, groupId)`.
2. Calcular edad con util central y timezone consistente.
3. Cargar historial de procesos desde backend (no hardcode).
4. Tratar datos sensibles:
   - Enmascarar documento/telefono segun permisos.
   - No mostrar campos sin autorizacion.
5. Mantener tabs `Proceso Actual` y `Historial` con estados vacio/error.
6. Modal de informe operativo:
   - Compartir un mismo origen de datos para evitar dobles consultas innecesarias.

## Buenas practicas clave

- Manejar PII bajo principio de minimo privilegio.
- Registrar acceso a perfil si la politica de auditoria lo requiere.
- Evitar duplicar logica de formato de fechas/documentos.
- Definir fallback visual para datos incompletos.

## Casos de prueba

- Carga de perfil con datos completos e incompletos.
- Usuario sin permiso no ve campos sensibles.
- Historial vacio muestra mensaje correcto.
- Modal de informe abre y cierra con teclado (`Escape`) y foco correcto.
