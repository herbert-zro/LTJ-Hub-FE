# Plan de migración Mock -> Backend real

## 1) Resumen ejecutivo

Con base en el estado actual del proyecto:

- **Módulos a migrar**: 9
- **Rutas/páginas de negocio a migrar**: 31
- **Áreas transversales críticas**: exportaciones (PDF/Word), emails, historial de evaluaciones, roles/permisos, contexto de compañía.

Este plan propone una migración en **3 fases (MVP -> expansión -> hardening)** para reducir riesgo y habilitar valor temprano.

---

## 2) Inventario de módulos y páginas

| Módulo       | Rutas aprox. | Estado actual (alto nivel)                    | Dependencias clave                                     |
| ------------ | -----------: | --------------------------------------------- | ------------------------------------------------------ |
| Dashboard    |            1 | Mock en data/charts                           | companyId global, APIs agregadas                       |
| Usuarios     |            2 | Hook/página con mock                          | roles, permisos, empresa                               |
| Empresas     |           10 | Mix de hooks y componentes con mock           | roles, usuarios de empresa, factor-rango               |
| Grupos       |            9 | Alto volumen de datos mock + flujos complejos | candidatos, resultados, informe operativo, exportación |
| Candidatos   |            1 | Hook con mock                                 | grupos, evaluaciones, correo                           |
| Evaluaciones |            2 | Data local en página                          | catálogo/tipos, estados                                |
| Correo       |            2 | Plantillas mock + formularios                 | proveedor email, auditoría                             |
| Bitácora     |            2 | Data local en página                          | eventos centralizados, filtros                         |
| Factor-rango |            2 | Data local en página                          | empresas, reglas de negocio                            |

---

## 3) Matriz de priorización (impacto vs complejidad)

Escala:

- **Impacto**: Alto / Medio / Bajo
- **Complejidad**: Alta / Media / Baja
- **Prioridad**: P1 (primero), P2 (segundo), P3 (tercero)

| Módulo                                            | Impacto | Complejidad | Prioridad | Motivo                                                            |
| ------------------------------------------------- | ------- | ----------- | --------- | ----------------------------------------------------------------- |
| Select de compañía global + contexto API          | Alto    | Media       | **P1**    | Bloquea segmentación real por empresa en todo el admin            |
| Grupos (listado, candidatos, resultados, informe) | Alto    | Alta        | **P1**    | Núcleo de operación y principal consumidor de datos de evaluación |
| Usuarios                                          | Alto    | Media       | **P1**    | Gestión operativa base + relación con roles/permisos              |
| Empresas (core: listado/detalle)                  | Alto    | Media       | **P1**    | Catálogo principal para multiempresa                              |
| Dashboard (métricas principales)                  | Alto    | Media       | **P2**    | Alta visibilidad, depende de datos ya estabilizados               |
| Evaluaciones                                      | Medio   | Media       | **P2**    | Flujo funcional importante, menor dependencia transversal         |
| Correo (plantillas + envío)                       | Medio   | Alta        | **P2**    | Integración externa, trazabilidad y plantillas                    |
| Bitácora                                          | Medio   | Media       | **P2**    | Necesaria para auditoría y soporte operativo                      |
| Empresas (submódulos roles/usuarios/factor-rango) | Medio   | Media       | **P3**    | Extensión natural tras estabilizar APIs base                      |
| Candidatos (módulo independiente)                 | Medio   | Media       | **P3**    | Puede desacoplarse del flujo de grupos                            |
| Exportaciones PDF/Word                            | Medio   | Alta        | **P3**    | Depende de contrato de datos final por reporte                    |

---

## 4) Roadmap por fases

## Fase 1 — MVP funcional end-to-end (4 a 6 semanas)

**Objetivo**: quitar mocks críticos y validar patrón técnico backend en flujo real.

### Alcance recomendado

1. **Infra transversal**
   - Cliente API base y manejo de errores unificado.
   - Inyección de `companyId` en requests.
   - Estados estándar: `loading`, `empty`, `error`, `retry`.

2. **Módulos P1**
   - Select de compañía global + provider.
   - Grupos (mínimo: listado + candidatos + resultados + informe operativo lectura).
   - Usuarios (listado + alta/edición).
   - Empresas (listado + detalle).

### Entregables

- 0 mocks en los flujos P1.
- Contratos API versionados para entidades principales.
- Telemetría básica de errores FE/BE.

### Riesgos

- Contratos backend incompletos para informe operativo e histórico.
- Falta de control de permisos por empresa/rol desde backend.

---

## Fase 2 — Cobertura operativa y trazabilidad (3 a 5 semanas)

**Objetivo**: cubrir operación diaria y observabilidad funcional.

### Alcance recomendado

1. Dashboard (métricas principales con datos reales).
2. Evaluaciones (listado/form real).
3. Correo (plantillas + envío básico + estados).
4. Bitácora (eventos reales y filtros principales).
5. Histórico de evaluaciones del informe operativo (lectura real).

### Entregables

- Dashboard real por compañía y rango temporal.
- Correo con integración transaccional mínima.
- Bitácora con eventos trazables por actor/fecha/módulo.

### Riesgos

- Dependencia de proveedor email y políticas de reintento.
- Volumen de bitácora sin estrategia de paginación/filtros.

---

## Fase 3 — Hardening y funcionalidades avanzadas (2 a 4 semanas)

**Objetivo**: cerrar brechas de producto y robustecer operación.

### Alcance recomendado

1. Empresas submódulos completos (roles/usuarios/factor-rango).
2. Candidatos módulo independiente.
3. Exportaciones PDF/Word (backend o servicio dedicado).
4. Permisos finos por rol/recurso/acción.
5. Performance + QA regresión + seguridad básica.

### Entregables

- Exportación estable con trazabilidad.
- Matriz de permisos aplicada en frontend y validada por backend.
- Criterios de aceptación UAT completos.

### Riesgos

- Exportación con plantillas cambiantes y alto costo de mantenimiento.
- Desalineación FE/BE en reglas de autorización.

---

## 5) Estimación resumida por módulo (alto nivel)

> Estimación orientativa, sujeta a contratos backend y disponibilidad de equipo.

| Módulo / Área                                     | Esfuerzo estimado |
| ------------------------------------------------- | ----------------- |
| Infra API + company context                       | 1.5 - 2.5 semanas |
| Grupos (core)                                     | 2.5 - 4 semanas   |
| Usuarios                                          | 1 - 1.5 semanas   |
| Empresas core (listado/detalle)                   | 1 - 1.5 semanas   |
| Dashboard                                         | 1 - 2 semanas     |
| Evaluaciones                                      | 0.8 - 1.5 semanas |
| Correo                                            | 1.5 - 2.5 semanas |
| Bitácora                                          | 1 - 1.5 semanas   |
| Empresas submódulos (roles/usuarios/factor-rango) | 1.5 - 2.5 semanas |
| Candidatos independiente                          | 1 - 1.5 semanas   |
| Exportaciones PDF/Word                            | 1.5 - 3 semanas   |

---

## 6) Criterios de “Done” por módulo

Un módulo se considera migrado cuando:

1. No consume mocks locales en rutas productivas.
2. Tiene API real con manejo de errores y estados UX.
3. Respeta `companyId` y permisos por rol.
4. Tiene pruebas mínimas de humo (listado + detalle/form + error path).
5. Registra eventos clave en bitácora (cuando aplique).

---

## 7) Siguiente paso recomendado

Iniciar con un **piloto end-to-end**:

1. `company context` real.
2. `grupos` (listado + candidatos + resultados).
3. contratos backend cerrados para informe operativo/histórico.

Una vez estable, replicar el patrón a `usuarios`, `empresas`, y luego `dashboard`.
