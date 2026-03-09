# Vista: Informe Operativo

## Alcance

Ruta: `/admin/grupos/:id/informe-operativo/:userId`

Archivo actual principal: `src/admin/features/grupos/components/InformeOperativo.tsx`

Subcomponentes:

- `CapacidadIntelectual.tsx`
- `HabilidadesMentales.tsx`
- `ComportamientoEnTrabajo.tsx`
- `Personalidad.tsx`
- `AgregarPruebaModalForm.tsx`
- `ChartBarrasPorTipo.tsx`

## Estado actual (mock)

- Dataset local extenso (`REPORT_USERS`, `REPORT_EVALUATION_ATTEMPTS`).
- Exportacion PDF/Word y agregar prueba solo simulan accion.
- Historico y detalle por evaluacion ya modelados en UI.

## Objetivo en produccion

Exponer informe operativo real por candidato, con historico de intentos, filtros, detalle por factor, exportaciones y asignacion de pruebas.

## Contratos API recomendados

- `GET /api/v1/grupos/{groupId}/candidatos/{candidateId}/informe-operativo`
- `GET /api/v1/grupos/{groupId}/candidatos/{candidateId}/evaluaciones/intentos`
  - Query: `evaluationType`, `generationDate`, `sortBy=createdAt|finishedAt`
- `POST /api/v1/grupos/{groupId}/candidatos/{candidateId}/pruebas`
- `POST /api/v1/grupos/{groupId}/candidatos/{candidateId}/export`
  - Body: formato + factores seleccionados

Payload export sugerido:

```json
{
  "format": "pdf",
  "selectedFactorsByEvaluationType": [
    {
      "evaluationType": "TP1",
      "factors": ["Ascendencia", "Vitalidad"]
    }
  ]
}
```

## Pasos de implementacion

1. Separar dominio del componente gigante:
   - `informe-operativo.api.ts`
   - `informe-operativo.mapper.ts`
   - hooks por bloque (`useCandidateReport`, `useEvaluationHistory`, `useExportReport`).
2. Mantener componentes presentacionales y mover logica de negocio a hooks.
3. Unificar tipo de fecha en ISO (`YYYY-MM-DDTHH:mm:ssZ`) y formatear solo en UI.
4. Reemplazar `console.log` por mutaciones reales:
   - Agregar prueba.
   - Exportar PDF/Word.
5. Paginar historico de intentos si puede crecer.
6. Asegurar control de permisos:
   - `report.view`, `report.export`, `tests.assign`.
7. Optimizar rendimiento:
   - Virtualizar tablas largas.
   - Memoizar transforms pesados.
8. Implementar auditoria:
  - Quien exporto, que formato, que factores y cuando.

## Buenas practicas clave

- Nunca inferir datos clinicos/psicometricos en frontend; consumir resultados validados por backend.
- Estandarizar catalogos de factores por tipo de prueba en backend.
- Proteger exportaciones con watermark y/o token temporal cuando aplique.
- Evitar acoplamiento entre IDs visibles y datos sensibles.

## Casos de prueba

- Carga informe por candidato con secciones correctas.
- Filtros del historico respetan tipo, fecha y orden.
- Detalles por evaluacion muestran seccion esperada.
- Agregar prueba actualiza estado del candidato.
- Exportacion falla con mensaje claro si no hay factores seleccionados.

## Nota tecnica

Actualmente la vista concentra demasiada responsabilidad en un solo archivo. En produccion conviene dividir por bounded context para mejorar mantenibilidad y cobertura de pruebas.
