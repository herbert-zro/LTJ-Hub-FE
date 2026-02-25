# Guía de colores tokenizados (Brand)

Este documento describe la tokenización de color aplicada en la app usando Tailwind v4 + variables CSS en `src/index.css`.

## Objetivo

Centralizar la paleta corporativa en tokens para:

- mantener consistencia visual,
- evitar hex sueltos en componentes,
- facilitar cambios de marca sin refactor grande.

## Tokens definidos

### Brand (primario)

- `--brand-100`: `#EDE7F5` (fondo suave)
- `--brand-500`: `#6B4C9A` (principal)
- `--brand-600`: `#5A3E82` (hover)
- `--brand-700`: `#4B336C` (active)

### Grises corporativos

- `--corp-gray-100`: `#F3F4F6`
- `--corp-gray-200`: `#E5E7EB` (bordes)
- `--corp-gray-400`: `#9EA2A6`
- `--corp-gray-500`: `#75787B`
- `--corp-gray-600`: `#5F6366`

### Superficies y texto

- `--surface-page`: `#F9FAFB` (background principal)
- `--surface-card`: `#FFFFFF` (cards/tablas)
- `--text-strong`: `#1F2937` (texto principal)

## Mapeo a clases Tailwind

Los tokens están expuestos en `@theme inline` con `--color-*`, por lo que se usan como clases utilitarias:

- `text-brand-500`
- `bg-brand-100`
- `border-corp-gray-200`
- `text-corp-gray-500`
- `bg-surface-page`
- `bg-surface-card`
- `text-text-strong`

También se pueden combinar con opacidad, por ejemplo:

- `bg-brand-500/10`

## Ejemplos recomendados

### Estado activo de navegación

- `bg-brand-500/10 text-brand-500 border-brand-500`

### Bordes suaves de tablas/cards

- `border-corp-gray-200`

### Encabezados con identidad de marca

- `text-brand-500 font-semibold`

### Textos secundarios

- `text-corp-gray-500`

## Convención para nuevos componentes

1. Evitar usar colores hex directo en JSX/TSX.
2. Priorizar tokens (`brand-*`, `corp-gray-*`, `surface-*`, `text-*`).
3. Si falta un color, agregar primero el token en `src/index.css` y luego usar la clase Tailwind.

## Notas

- Actualmente los mismos valores se aplican en `:root` y `.dark` para mantener consistencia de marca.
- Si se desea tema oscuro real, se puede definir una variante oscura de estos tokens más adelante.
