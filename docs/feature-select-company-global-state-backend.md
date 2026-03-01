# Feature: Select de Compañía con estado global + backend

## Objetivo

Implementar el flujo completo para que el selector de compañía (`SelectCompany`) controle el contexto activo de la aplicación y consuma datos reales desde backend.

## Estado actual (baseline)

- `SelectCompany` existe en `src/admin/shell/components/SelectCompany.tsx`.
- Las opciones de compañía están hardcodeadas en frontend.
- No hay estado global para compañía activa.
- No hay persistencia de la selección entre recargas/sesiones.
- No hay integración backend para catálogo de compañías ni permisos por compañía.

---

## Resultado esperado

1. La app obtiene compañías desde API.
2. El usuario selecciona una compañía activa en el header.
3. La compañía activa se guarda en estado global.
4. La selección persiste (por ejemplo en `localStorage`).
5. Todas las vistas/features consumen la compañía activa para filtrar datos.
6. Se manejan permisos, errores, loading y fallback de forma consistente.

---

## Diseño propuesto (alto nivel)

### 1) Dominio de compañía

Crear un modelo común:

```ts
export type Company = {
  id: string;
  name: string;
  code?: string;
  isActive?: boolean;
};
```

### 2) Estado global

Implementar un provider dedicado (sugerido: React Context + reducer ligero):

- `CompanyProvider`
- `useCompany()`
- estado mínimo:
  - `companies: Company[]`
  - `selectedCompanyId: string | null`
  - `selectedCompany: Company | null`
  - `isLoading: boolean`
  - `error: string | null`

### 3) Capa de API

Crear cliente en `shared/api`:

- `GET /companies` (catálogo)
- opcional `GET /me/companies` (si depende de usuario/roles)

### 4) Integración de UI

`SelectCompany` deja de usar mock local y consume `useCompany()`.

### 5) Propagación

Toda feature que haga fetch debe enviar `companyId` (query param, header o path según contrato backend).

---

## Paso a paso de implementación

## Fase 1 — Contrato backend y tipos

### Paso 1.1: Definir contrato de compañías

Acordar con backend:

- endpoint
- shape de respuesta
- estrategia de paginación (si aplica)
- filtro por usuario
- manejo de compañías inactivas

Ejemplo de respuesta esperada:

```json
[
  { "id": "sv", "name": "LTJ El Salvador", "isActive": true },
  { "id": "gt", "name": "LTJ Guatemala", "isActive": true }
]
```

### Paso 1.2: Tipos TS compartidos

Crear tipos en `src/shared/types/company.ts`.

### Paso 1.3: Validación de respuesta

Sugerido: parseo defensivo (con util manual o zod si se adopta).

---

## Fase 2 — Capa API de compañías

### Paso 2.1: Servicio de compañías

Crear archivo sugerido:

- `src/shared/api/company/company.api.ts`

Métodos mínimos:

- `getCompanies(): Promise<Company[]>`

### Paso 2.2: Manejo de errores

Normalizar errores de red/backend para exponer mensajes amigables al provider.

---

## Fase 3 — Estado global de compañía

### Paso 3.1: Crear provider

Ubicación sugerida:

- `src/app/providers/company/CompanyProvider.tsx`

### Paso 3.2: Crear hook de consumo

- `src/app/providers/company/useCompany.ts`

### Paso 3.3: Responsabilidades del provider

- Cargar compañías al inicializar.
- Seleccionar compañía por defecto:
  1. valor persistido válido,
  2. primera compañía activa,
  3. `null` con UI de error/fallback.
- Exponer acción `setSelectedCompany(companyId)`.
- Persistir selección.

### Paso 3.4: Persistencia

Sugerido:

- key: `ltj.selectedCompanyId`
- validar que exista en catálogo antes de usarla.

---

## Fase 4 — Inyección en árbol de aplicación

### Paso 4.1: Registrar provider

Agregar `CompanyProvider` cerca de `LTJHubApp` / router root para disponibilidad global.

### Paso 4.2: Orden de providers

Si existe provider de auth, inicializar compañía después de auth para respetar permisos de usuario.

---

## Fase 5 — Integrar SelectCompany

### Paso 5.1: Conectar `SelectCompany`

Cambiar el componente para leer:

- `companies`
- `selectedCompanyId`
- `setSelectedCompany`
- `isLoading`, `error`

### Paso 5.2: Estados UI

- loading: disabled + placeholder “Cargando compañías…”
- error: disabled + opción fallback o mensaje controlado
- empty: disabled + “Sin compañías disponibles”

### Paso 5.3: UX

- al cambiar compañía, refrescar datos de pantallas dependientes.
- mostrar opción seleccionada consistentemente en todo el shell.

---

## Fase 6 — Conectar features al companyId

### Paso 6.1: Definir estrategia global

Elegir 1 estrategia:

1. query param (`?companyId=...`)
2. header (`x-company-id`)
3. segment de ruta (`/companies/:id/...`)

### Paso 6.2: Ajustar cliente API

Si se usa header, idealmente inyectarlo automáticamente desde una función central (wrapper de fetch/axios).

### Paso 6.3: Migrar módulos

Aplicar a features críticas primero:

- grupos
- usuarios
- empresas
- dashboard

---

## Fase 7 — Seguridad y permisos

### Paso 7.1: Scope de compañías por usuario

El backend debe retornar únicamente compañías permitidas para el usuario autenticado.

### Paso 7.2: Validación en frontend

Si `selectedCompanyId` ya no existe en catálogo, resetear selección y mostrar toast/mensaje.

### Paso 7.3: Prevención de manipulación

Nunca confiar solo en frontend; backend debe validar el acceso al `companyId` recibido.

---

## Fase 8 — Testing

### Unit tests

- Provider:
  - carga inicial
  - fallback por defecto
  - persistencia
  - error handling
- `SelectCompany`:
  - render en loading
  - render con opciones
  - cambio de selección

### Integration tests

- cambio de compañía refresca data en una pantalla real (ej. grupos).

### E2E (cuando exista)

- login -> seleccionar compañía -> navegar módulos -> confirmar scope.

---

## Fase 9 — Observabilidad

- loggear errores de fetch de compañías.
- trackear evento de cambio de compañía (si tienen analytics):
  - userId
  - companyId anterior
  - companyId nuevo

---

## Fase 10 — Rollout

1. Feature flag opcional para habilitación gradual.
2. Deploy backend (endpoint compañías) primero.
3. Deploy frontend con fallback seguro.
4. Monitorear errores de carga de compañías.

---

## Criterios de aceptación

- El selector carga compañías reales desde backend.
- La compañía seleccionada persiste al recargar.
- Las requests de features usan la compañía activa.
- Si cambia compañía, la data visible se actualiza según contexto.
- Sin compañía válida, la UI muestra estado controlado (no rompe).

---

## Riesgos comunes y mitigaciones

1. **Race conditions entre auth y compañías**
   - Mitigar inicializando provider de compañía después de auth.

2. **Persistencia inválida (`companyId` obsoleto)**
   - Mitigar validando contra catálogo en cada bootstrap.

3. **Módulos sin filtro por compañía**
   - Mitigar con checklist por feature y pruebas integradas.

4. **Diferencias de contrato entre ambientes**
   - Mitigar con tipado estricto + validación de payload.

---

## Checklist ejecutable

- [ ] Acordar endpoint y contrato con backend.
- [ ] Crear `Company` type compartido.
- [ ] Crear `company.api.ts`.
- [ ] Crear `CompanyProvider` + `useCompany`.
- [ ] Registrar provider en árbol app.
- [ ] Conectar `SelectCompany` al provider.
- [ ] Persistir `selectedCompanyId`.
- [ ] Inyectar `companyId` en cliente API.
- [ ] Migrar features principales.
- [ ] Agregar pruebas unitarias/integración.
- [ ] Validar manejo de errores y fallback.
- [ ] Documentar contrato final backend-frontend.

---

## Nota final

Cuando empiece la integración backend, la recomendación es implementar primero el provider + `SelectCompany` y conectar una sola feature end-to-end (por ejemplo `grupos`) como piloto. Luego replicar el patrón al resto de módulos.
