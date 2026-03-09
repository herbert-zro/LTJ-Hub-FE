# Vista: Grafica Comparativa de Candidatos

## Alcance

Ruta: `/admin/grupos/:id/comparative-chart`

Archivos actuales principales:

- `src/admin/features/grupos/pages/ComparativeChartPage.tsx`
- `src/admin/features/grupos/components/ComparativeChart.tsx`

## Estado actual (mock)

- Datos de metricas generados localmente con `buildMockMetricsByCandidateId`.
- Dependencia de `location.state.selectedCandidates`.
- Si se recarga pagina, puede perderse el estado seleccionado.

## Objetivo en produccion

Comparar candidatos reales por metricas estandarizadas, con trazabilidad y persistencia de seleccion.

## Contrato API recomendado

- `POST /api/v1/grupos/{id}/comparativas/candidatos`

Payload:

```json
{
  "candidateIds": [1, 4, 8],
  "metrics": [
    "razonamiento",
    "disc",
    "ajusteCultural",
    "competencias",
    "potencial"
  ]
}
```

Respuesta:

```json
{
  "candidates": [
    {
      "id": 1,
      "nombre": "Ana Martinez",
      "metrics": {
        "Razonamiento": 72,
        "Perfil DISC": 65,
        "Ajuste Cultural": 84,
        "Competencias": 77,
        "Potencial": 80
      }
    }
  ]
}
```

## Pasos de implementacion

1. Definir fuente persistente de seleccion:
   - Recomendado: query param `candidateIds=1,4,8`.
   - Alternativa: store global por feature.
2. Crear servicio `getComparativeMetrics(groupId, candidateIds)`.
3. Validar reglas antes de consultar:
   - Minimo 2 candidatos.
   - Maximo sugerido 6 para legibilidad.
4. Reemplazar generador mock por respuesta API.
5. Estandarizar metrica y orden de ejes desde backend para evitar drift.
6. Agregar opcion exportar grafica (imagen/PDF) si negocio lo necesita.

## Buenas practicas clave

- Mantener una paleta accesible y consistente para series.
- Mostrar fecha/version de datos comparados.
- Informar cuando un candidato no tiene metrica completa.
- Evitar mezclar escalas distintas sin normalizacion.

## Casos de prueba

- Bloquea comparativa con menos de 2 candidatos.
- Renderiza correctamente 2..6 candidatos.
- Resiste recarga de pagina sin perder seleccion.
- Maneja estado `sin datos` por metrica faltante.
- Error backend muestra mensaje recuperable.
