# Migración de ventas Café Aurora

Fuente: `cafe-aurora-adm/cafe_aurora_ventas.xlsx` (5 hojas, datos coherentes).

No se ejecuta sola. Tú corres cada archivo en el **SQL Editor** de Supabase, en este orden.

## Qué no se toca

- `reservations` (ni filas ni columnas)
- `customers.id` (sigue siendo UUID)
- `cafe-aurora-codigo`
- `cafe-aurora-adm` (diseño y código)

## Orden

1. `01-schema.sql` — agrega `customer_code` y crea `products`, `orders`, `order_items`, `payments`
2. `02-staging.sql` — crea el schema `staging` con las 5 hojas
3. `03-load-staging.sql` — carga el Excel a staging (recomendado)  
   Alternativa: importar `csv/*.csv` en Table Editor sobre cada tabla `staging.*`
4. `04-transform.sql` — C001/P001/O0001 → UUID definitivos
5. `05-validate.sql` — conteos y FKs
6. `06-drop-staging.sql` — **solo** si la validación está perfecta

## Resolución de códigos

| Excel | Columna staging | Destino |
|---|---|---|
| C001 | `customers.customer_id` | `customers.customer_code` + `customers.id` UUID |
| P001 | `products.product_id` | `products.product_code` + `products.id` UUID |
| O0001 | `orders.order_id` | `orders.order_code` + `orders.id` UUID |
| OI0001 | `order_items.order_item_id` | `order_items.order_item_code` |
| PAY0001 | `payments.payment_id` | `payments.payment_code` |

`orders.customer_id`, `order_items.order_id`, `order_items.product_id` y `payments.order_id` quedan como UUID, nunca como `C001`.

Clientes del Excel que **no** existan por email se insertan con un UUID nuevo.  
Si el email ya existe (Ana Torres, PILAR, etc.), solo se rellena `customer_code` si está vacío. No se pisan nombre, teléfono ni `created_at`.
