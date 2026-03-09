# Vista: Resultados del Grupo

## Alcance

Ruta: `/admin/grupos/:id/resultados`

Archivo actual principal: `src/admin/features/grupos/pages/GrupoResultadosPage.tsx`

## Estado actual (mock)

- Datos locales `RESULTADOS_DATA`.
- Filtro por evaluacion aplicado en cliente.
- Enlaces de resultado usan `#`.

## Objetivo en produccion

Consultar resultados reales por grupo/evaluacion y permitir acceso seguro a reportes generados.

## Contrato API recomendado

- `GET /api/v1/grupos/{id}/resultados`
  - Query: `evaluationType`, `status`, `page`, `pageSize`
- `GET /api/v1/resultados/{resultadoId}/download`
  - Entrega URL temporal firmada o stream protegido

Respuesta sugerida:

```json
{
  "items": [
    {
      "id": 991,
      "evaluacion": "TP1",
      "estado": "COMPLETADO",
      "fechaGeneracion": "2026-02-14T00:14:00Z",
      "fechaVencimiento": "2027-02-14T00:14:00Z",
      "downloadable": true
    }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 36
}
```

## Pasos de implementacion

1. Migrar select de evaluacion a filtro de API.
2. Agregar estados adicionales de negocio si aplican (`ERROR`, `EXPIRADO`).
3. Reemplazar `href="#"` por accion de descarga segura.
4. Formatear fechas segun locale del usuario.
5. Agregar paginacion servidor si la cantidad crece.
6. Mostrar badge de estado con color semantico.
7. Manejar errores de descarga (token expirado, permiso denegado, archivo no encontrado).

## Buenas practicas clave

- No exponer URLs permanentes de archivos sensibles.
- Registrar cada descarga para auditoria.
- Evitar descargas duplicadas en doble click (throttle).
- Si el archivo expira, ofrecer re-generacion controlada.

## Casos de prueba

- Filtrado por evaluacion devuelve resultados correctos.
- Descarga exitosa en estado completado.
- Estado pendiente no permite descarga.
- Error 403/404 muestra mensaje de negocio claro.
