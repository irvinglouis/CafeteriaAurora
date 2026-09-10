-- Café Aurora — validación final (paso 5/5)
-- No modifica datos. Revisa conteos, FKs y que no queden códigos C001/P001
-- en columnas UUID.

-- 1) Conteos esperados del Excel
select 'staging.customers' as origen, count(*) as n from staging.customers
union all
select 'public.customers con customer_code', count(*) from public.customers where customer_code is not null
union all
select 'staging.products', count(*) from staging.products
union all
select 'public.products', count(*) from public.products
union all
select 'staging.orders', count(*) from staging.orders
union all
select 'public.orders', count(*) from public.orders
union all
select 'staging.order_items', count(*) from staging.order_items
union all
select 'public.order_items', count(*) from public.order_items
union all
select 'staging.payments', count(*) from staging.payments
union all
select 'public.payments', count(*) from public.payments;

-- Esperado: 40 / 40 / 15 / 15 / 180 / 180 / 385 / 385 / 180 / 180
-- public.customers total debe ser >= 40 (Ana Torres, PILAR, etc. se conservan).

-- 2) Reservations intactas
select
  count(*) as reservations_total,
  count(*) filter (where status = 'pending') as pending,
  count(*) filter (where status = 'confirmed') as confirmed,
  count(*) filter (where status = 'cancelled') as cancelled
from public.reservations;

select r.id, c.name, c.email, c.customer_code, r.status
from public.reservations r
join public.customers c on c.id = r.customer_id
order by r.created_at;

-- 3) Ningún código Excel quedó guardado como UUID
select 'orders.customer_id parece código' as problema, count(*) as n
from public.orders
where customer_id::text ~ '^[A-Z]'
union all
select 'order_items.order_id parece código', count(*)
from public.order_items
where order_id::text ~ '^[A-Z]'
union all
select 'order_items.product_id parece código', count(*)
from public.order_items
where product_id::text ~ '^[A-Z]'
union all
select 'payments.order_id parece código', count(*)
from public.payments
where order_id::text ~ '^[A-Z]';

-- 4) Mapeo C001 → UUID
select
  s.customer_id as excel_code,
  c.id as customer_uuid,
  c.name,
  c.email
from staging.customers s
left join public.customers c on c.customer_code = s.customer_id
order by s.customer_id;

select 'customers Excel sin UUID' as problema, count(*) as n
from staging.customers s
where not exists (
  select 1 from public.customers c where c.customer_code = s.customer_id
);

select 'orders Excel sin UUID' as problema, count(*) as n
from staging.orders s
where not exists (
  select 1 from public.orders o where o.order_code = s.order_id
);

select 'products Excel sin UUID' as problema, count(*) as n
from staging.products s
where not exists (
  select 1 from public.products p where p.product_code = s.product_id
);

-- 5) Órdenes huérfanas o mal resueltas
select 'orders.customer_id inexistente' as problema, count(*) as n
from public.orders o
where not exists (select 1 from public.customers c where c.id = o.customer_id);

select 'order_items.order_id inexistente' as problema, count(*) as n
from public.order_items i
where not exists (select 1 from public.orders o where o.id = i.order_id);

select 'order_items.product_id inexistente' as problema, count(*) as n
from public.order_items i
where not exists (select 1 from public.products p where p.id = i.product_id);

select 'payments.order_id inexistente' as problema, count(*) as n
from public.payments p
where not exists (select 1 from public.orders o where o.id = p.order_id);

-- 6) Constraints de negocio
select 'orders.status inválido' as problema, count(*) as n
from public.orders
where status not in ('pending', 'completed', 'cancelled');

select 'payments.payment_status inválido' as problema, count(*) as n
from public.payments
where payment_status not in ('paid', 'pending', 'refunded');

select 'quantity <= 0' as problema, count(*) as n
from public.order_items
where quantity <= 0;

select 'montos negativos' as problema, count(*) as n
from (
  select price as monto from public.products
  union all
  select total from public.orders
  union all
  select unit_price from public.order_items
  union all
  select subtotal from public.order_items
  union all
  select amount from public.payments
) t
where monto < 0;

-- 7) Totales: items = order.total = payment.amount
select 'order.total != suma items' as problema, count(*) as n
from public.orders o
where o.total <> (
  select coalesce(sum(i.subtotal), 0)
  from public.order_items i
  where i.order_id = o.id
);

select 'order.total != payment.amount' as problema, count(*) as n
from public.orders o
join public.payments p on p.order_id = o.id
where o.total <> p.amount;

-- 8) Ejemplo resuelto: O0001 / C002 / P002
select
  o.order_code,
  o.id as order_uuid,
  c.customer_code,
  c.id as customer_uuid,
  c.name,
  o.status,
  o.total
from public.orders o
join public.customers c on c.id = o.customer_id
where o.order_code = 'O0001';
