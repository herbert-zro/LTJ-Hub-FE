# Design Tokens — Cheat Sheet

Referencia rápida de colores tokenizados para Tailwind.

## Brand

| Token       | HEX       | Clase principal                       |
| ----------- | --------- | ------------------------------------- |
| `brand-100` | `#EDE7F5` | `bg-brand-100`                        |
| `brand-500` | `#6B4C9A` | `text-brand-500` / `border-brand-500` |
| `brand-600` | `#5A3E82` | `text-brand-600`                      |
| `brand-700` | `#4B336C` | `text-brand-700`                      |

## Grises corporativos

| Token           | HEX       | Uso sugerido            |
| --------------- | --------- | ----------------------- |
| `corp-gray-100` | `#F3F4F6` | Hover suave             |
| `corp-gray-200` | `#E5E7EB` | Bordes                  |
| `corp-gray-400` | `#9EA2A6` | Texto auxiliar          |
| `corp-gray-500` | `#75787B` | Texto secundario        |
| `corp-gray-600` | `#5F6366` | Texto secundario fuerte |

## Superficies y texto

| Token          | HEX       | Clase              |
| -------------- | --------- | ------------------ |
| `surface-page` | `#F9FAFB` | `bg-surface-page`  |
| `surface-card` | `#FFFFFF` | `bg-surface-card`  |
| `text-strong`  | `#1F2937` | `text-text-strong` |

## Combinaciones rápidas

- Navegación activa: `bg-brand-500/10 text-brand-500 border-brand-500`
- Encabezado de tabla: `text-brand-500 font-semibold`
- Borde estándar: `border-corp-gray-200`
- Texto secundario: `text-corp-gray-500`
- Row hover sutil: `hover:bg-surface-page`

## Regla de oro

- No usar hex directo en componentes.
- Si falta un tono, definir token en `src/index.css` y luego usar clase Tailwind.
