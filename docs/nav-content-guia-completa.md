# NavContent: guía completa

## Objetivo

Documentar el componente `NavContent` y todas las piezas relacionadas que construyen el menú lateral del módulo admin.

---

## 1) Componente principal

### Archivo

- `src/admin/components/NavContent.tsx`

### Responsabilidad

`NavContent` renderiza la navegación principal del sidebar:

- lista de items de navegación,
- item expandible de **Administración**,
- links normales (por ejemplo **Empresas**),
- estado activo según la ruta actual,
- comportamiento mobile/collapsed vía props y hook.

### Props

- `collapsed: boolean` → indica si el sidebar está contraído.
- `isMobile?: boolean` → indica si se está usando en contexto mobile.

### Dependencias directas

- `useLocation` de `react-router` para obtener `pathname`.
- `adminNavItems` como fuente de configuración.
- `useAdminSubmenu` para abrir/cerrar el submenu de Administración.
- `NavItemButton` para item expandible.
- `NavItemLink` para items simples.
- `CustomMenu` para renderizar hijos del item expandible.

---

## 2) Fuente de verdad de navegación

### Archivo

- `src/admin/navigation/types/nav-items.ts`

### Tipo

`AdminNavItem` define:

- `label`
- `icon?`
- `to?`
- `children?`
- `requiresCloseOnMobile?`
- `isExpandable?`
- `exactMatch?`

### Configuración actual relevante

- **Administración**
  - `to: "/admin"`
  - `isExpandable: true`
  - hijos: dashboard, usuarios, evaluaciones, factor-rango, correo, bitácora
- **Empresas**
  - `to: "/admin/empresas"`

> Nota importante: `Empresas` debe ser absoluta (`/admin/empresas`) para que el cálculo de activo sea correcto con `pathname`.

---

## 3) Lógica de estado activo

### Dónde se calcula

En `NavContent.tsx`, función interna `isItemActive(to, exactMatch)`:

- si no hay `to` o es `#` => no activo,
- si `exactMatch` => `pathname === to`,
- caso general => `pathname === to || pathname.startsWith(`${to}/`)`.

### Regla especial para items expandibles

Para el item **Administración**, el estado activo no se toma del `to` padre. Se calcula con sus hijos:

- activo si **alguno de los children** coincide con la ruta actual.

Esto evita que el padre quede activo siempre por prefijo `/admin` cuando estás en rutas hermanas como `/admin/empresas`.

---

## 4) Submenú de Administración

### Hook

- `src/admin/navigation/hooks/useAdminSubmenu.ts`

### Estado y acciones

- `isOpen`
- `toggle()`
- `close()`

### Reglas

- Si `collapsed === true`, se cierra submenu.
- Si `isMobile === true` y cambia `pathname`, se cierra submenu.

Esto mantiene UX consistente:

- escritorio contraído: sin submenu visible,
- mobile: el submenu no queda abierto después de navegar.

---

## 5) Componentes visuales relacionados

### `NavItemButton`

- Archivo: `src/admin/navigation/components/NavItemButton.tsx`
- Uso: item expandible (Administración).
- Soporta `rightSlot` (flecha `ChevronDown`) y estado `active`.

### `NavItemLink`

- Archivo: `src/admin/navigation/components/NavItemLink.tsx`
- Uso: links simples del nivel principal.
- Encapsula `Link` + `NavIcon` + `NavLabel`.
- Usa `NavMobileClose` para cerrar drawer en mobile al seleccionar.

### `CustomMenu`

- Archivo: `src/admin/components/custom/CustomMenu.tsx`
- Renderiza los children del item expandible.
- Tiene su propio cálculo de active por child y respeta `exactMatch`.

### `NavMobileClose`

- Archivo: `src/admin/navigation/components/NavMobileClose.tsx`
- Si `closeOnSelect` es true, envuelve con `SheetClose`.

### `NavIcon` y `NavLabel`

- Archivos:
  - `src/admin/navigation/components/NavIcon.tsx`
  - `src/admin/navigation/components/NavLabel.tsx`
- Encapsulan iconografía y transición visual de label según `collapsed`.

---

## 6) Integración en Sidebar

### Archivo

- `src/admin/shell/components/AdminSidebar.tsx`

`AdminSidebar` renderiza:

1. `HeaderBlock`
2. `NavContent collapsed={isCollapsed}`

Por eso `NavContent` es el núcleo de navegación del panel lateral en desktop.

---

## 7) Flujo de render (resumen)

1. `NavContent` lee `pathname`.
2. Itera `adminNavItems`.
3. Si el item es expandible:
   - usa `NavItemButton`,
   - calcula active por hijos,
   - si abierto y no collapsed, renderiza `CustomMenu`.
4. Si el item no es expandible:
   - renderiza `NavItemLink` con active propio.

---

## 8) Cómo agregar un nuevo item correctamente

### Item simple

1. Agregar objeto en `adminNavItems` con `to` absoluta (`/admin/...`).
2. Si debe cerrar drawer mobile: `requiresCloseOnMobile: true`.

### Item hijo de Administración

1. Agregar en `children` del item Administración.
2. Usar `exactMatch: true` solo si necesitas coincidencia exacta.

### Item sin ruta todavía

- Usar `to: "#"` para deshabilitado visual.
- No quedará activo por la lógica actual.

---

## 9) Errores comunes y troubleshooting

### Problema: el activo queda en el padre

- Causa: calcular activo del padre por `to` (`/admin`) en vez de children.
- Solución: mantener la regla actual de `some(children...)` para expandibles.

### Problema: un item nunca se activa

- Causa típica: `to` relativo (ejemplo `"empresas"`) o ruta distinta a router real.
- Solución: usar ruta absoluta (`"/admin/empresas"`) y validar en router.

### Problema: submenu abierto en mobile tras navegar

- Causa: no cerrar con cambio de ruta.
- Solución: mantener efecto `pathname + isMobile` en `useAdminSubmenu`.

---

## 10) Checklist rápido de mantenimiento

- [ ] Todas las rutas `to` son absolutas cuando corresponda.
- [ ] `exactMatch` solo donde de verdad se necesita.
- [ ] Items expandibles calculan active por children.
- [ ] Mobile close habilitado en items que navegan (`requiresCloseOnMobile`).
- [ ] No usar `#` para items productivos ya implementados.

---

## 11) Archivos de referencia

- `src/admin/components/NavContent.tsx`
- `src/admin/navigation/types/nav-items.ts`
- `src/admin/navigation/hooks/useAdminSubmenu.ts`
- `src/admin/components/custom/CustomMenu.tsx`
- `src/admin/navigation/components/NavItemButton.tsx`
- `src/admin/navigation/components/NavItemLink.tsx`
- `src/admin/navigation/components/NavMobileClose.tsx`
- `src/admin/navigation/components/NavIcon.tsx`
- `src/admin/navigation/components/NavLabel.tsx`
- `src/admin/shell/components/AdminSidebar.tsx`
