-- Café Aurora — staging → tablas definitivas (paso 4/5)
-- Resuelve C001/P001/O0001 a UUID.
-- No borra customers existentes ni reservations.
-- Se puede reejecutar: usa ON CONFLICT sobre los códigos únicos.
-- Zona horaria de las fechas del Excel: America/Lima.

-- ---------------------------------------------------------------------------
-- 1) customers
--    Si el email ya existe (reservas de prueba, etc.):
--      solo se rellena customer_code. No se pisa name/phone/created_at.
--    Si el email es nuevo:
--      se inserta un UUID nuevo + customer_code del Excel.
-- ---------------------------------------------------------------------------

update public.customers as c
set customer_code = s.customer_id
from staging.customers as s
where lower(trim(c.email)) = lower(trim(s.email))
  and c.customer_code is null;

insert into public.customers (name, email, phone, created_at, customer_code)
select
  s.name,
  lower(trim(s.email)),
  s.phone,
  (s.created_at at time zone 'America/Lima'),
  s.customer_id
from staging.customers as s
where not exists (
  select 1
  from public.customers as c
  where lower(trim(c.email)) = lower(trim(s.email))
     or c.customer_code = s.customer_id
);

-- ---------------------------------------------------------------------------
-- 2) products
-- ---------------------------------------------------------------------------

insert into public.products (product_code, name, category, price, active)
select
  s.product_id,
  s.name,
  s.category,
  s.price,
  s.active
from staging.products as s
on conflict (product_code) do update
set
  name = excluded.name,
  category = excluded.category,
  price = excluded.price,
  active = excluded.active;

-- ---------------------------------------------------------------------------
-- 3) orders  (customer_id = UUID de customers, no C001)
-- ---------------------------------------------------------------------------

insert into public.orders (
  order_code,
  customer_id,
  order_date,
  status,
  total,
  created_at
)
select
  s.order_id,
  c.id,
  (s.order_date at time zone 'America/Lima'),
  s.status,
  s.total,
  (s.order_date at time zone 'America/Lima')
from staging.orders as s
join public.customers as c
  on c.customer_code = s.customer_id
on conflict (order_code) do update
set
  customer_id = excluded.customer_id,
  order_date = excluded.order_date,
  status = excluded.status,
  total = excluded.total,
  created_at = excluded.created_at;

-- ---------------------------------------------------------------------------
-- 4) order_items  (order_id y product_id = UUID)
-- ---------------------------------------------------------------------------

insert into public.order_items (
  order_item_code,
  order_id,
  product_id,
  quantity,
  unit_price,
  subtotal
)
select
  s.order_item_id,
  o.id,
  p.id,
  s.quantity,
  s.unit_price,
  s.subtotal
from staging.order_items as s
join public.orders as o
  on o.order_code = s.order_id
join public.products as p
  on p.product_code = s.product_id
on conflict (order_item_code) do update
set
  order_id = excluded.order_id,
  product_id = excluded.product_id,
  quantity = excluded.quantity,
  unit_price = excluded.unit_price,
  subtotal = excluded.subtotal;

-- ---------------------------------------------------------------------------
-- 5) payments  (order_id = UUID)
-- ---------------------------------------------------------------------------

insert into public.payments (
  payment_code,
  order_id,
  amount,
  payment_method,
  payment_status,
  paid_at,
  created_at
)
select
  s.payment_id,
  o.id,
  s.amount,
  s.payment_method,
  s.payment_status,
  case
    when s.paid_at is null then null
    else (s.paid_at at time zone 'America/Lima')
  end,
  coalesce(
    case
      when s.paid_at is null then null
      else (s.paid_at at time zone 'America/Lima')
    end,
    now()
  )
from staging.payments as s
join public.orders as o
  on o.order_code = s.order_id
on conflict (payment_code) do update
set
  order_id = excluded.order_id,
  amount = excluded.amount,
  payment_method = excluded.payment_method,
  payment_status = excluded.payment_status,
  paid_at = excluded.paid_at,
  created_at = excluded.created_at;
