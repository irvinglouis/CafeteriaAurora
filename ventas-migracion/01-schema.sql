-- Café Aurora — esquema de ventas (paso 1/5)
-- Seguro: no borra customers ni reservations.
-- No desactiva RLS. No toca reservations.
-- Ejecutar en el SQL Editor de Supabase.

-- ---------------------------------------------------------------------------
-- 1) customers: agregar código externo del Excel (C001, C002, ...)
--    id UUID se mantiene. Las reservas existentes no se tocan.
-- ---------------------------------------------------------------------------

alter table public.customers
  add column if not exists customer_code text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'customers_customer_code_key'
      and conrelid = 'public.customers'::regclass
  ) then
    alter table public.customers
      add constraint customers_customer_code_key unique (customer_code);
  end if;
end $$;

comment on column public.customers.customer_code is
  'Código externo del Excel (C001...). No reemplaza customers.id UUID.';

-- ---------------------------------------------------------------------------
-- 2) products
-- ---------------------------------------------------------------------------

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  product_code text not null,
  name text not null,
  category text not null,
  price numeric(12, 2) not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint products_product_code_key unique (product_code),
  constraint products_price_nonnegative check (price >= 0)
);

-- ---------------------------------------------------------------------------
-- 3) orders
-- ---------------------------------------------------------------------------

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null,
  customer_id uuid not null,
  order_date timestamptz not null,
  status text not null,
  total numeric(12, 2) not null,
  created_at timestamptz not null default now(),
  constraint orders_order_code_key unique (order_code),
  constraint orders_customer_id_fkey
    foreign key (customer_id) references public.customers (id),
  constraint orders_status_check
    check (status in ('pending', 'completed', 'cancelled')),
  constraint orders_total_nonnegative check (total >= 0)
);

create index if not exists orders_customer_id_idx
  on public.orders (customer_id);

create index if not exists orders_order_date_idx
  on public.orders (order_date);

-- ---------------------------------------------------------------------------
-- 4) order_items
-- ---------------------------------------------------------------------------

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_item_code text not null,
  order_id uuid not null,
  product_id uuid not null,
  quantity integer not null,
  unit_price numeric(12, 2) not null,
  subtotal numeric(12, 2) not null,
  created_at timestamptz not null default now(),
  constraint order_items_order_item_code_key unique (order_item_code),
  constraint order_items_order_id_fkey
    foreign key (order_id) references public.orders (id),
  constraint order_items_product_id_fkey
    foreign key (product_id) references public.products (id),
  constraint order_items_quantity_positive check (quantity > 0),
  constraint order_items_unit_price_nonnegative check (unit_price >= 0),
  constraint order_items_subtotal_nonnegative check (subtotal >= 0)
);

create index if not exists order_items_order_id_idx
  on public.order_items (order_id);

create index if not exists order_items_product_id_idx
  on public.order_items (product_id);

-- ---------------------------------------------------------------------------
-- 5) payments
-- ---------------------------------------------------------------------------

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  payment_code text not null,
  order_id uuid not null,
  amount numeric(12, 2) not null,
  payment_method text not null,
  payment_status text not null,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  constraint payments_payment_code_key unique (payment_code),
  constraint payments_order_id_fkey
    foreign key (order_id) references public.orders (id),
  constraint payments_payment_status_check
    check (payment_status in ('paid', 'pending', 'refunded')),
  constraint payments_amount_nonnegative check (amount >= 0)
);

create index if not exists payments_order_id_idx
  on public.payments (order_id);

-- ---------------------------------------------------------------------------
-- RLS: se mantiene encendido. Sin políticas anon todavía
-- (el panel y el sitio público no usan estas tablas en esta fase).
-- El SQL Editor de Supabase sí puede escribir (rol postgres).
-- ---------------------------------------------------------------------------

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
