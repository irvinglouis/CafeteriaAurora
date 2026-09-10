-- Café Aurora — SQL correctivo (no destructivo)
-- Crea solo las tablas faltantes. No toca customers, reservations, products ni staging.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique,
  customer_id uuid not null references public.customers (id),
  order_date timestamptz not null,
  status text not null check (status in ('pending', 'completed', 'cancelled')),
  total numeric(12, 2) not null check (total >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_item_code text not null unique,
  order_id uuid not null references public.orders (id),
  product_id uuid not null references public.products (id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  payment_code text not null unique,
  order_id uuid not null references public.orders (id),
  amount numeric(12, 2) not null check (amount >= 0),
  payment_method text not null,
  payment_status text not null check (payment_status in ('paid', 'pending', 'refunded')),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists orders_customer_id_idx on public.orders (customer_id);
create index if not exists orders_order_date_idx on public.orders (order_date);
create index if not exists order_items_order_id_idx on public.order_items (order_id);
create index if not exists order_items_product_id_idx on public.order_items (product_id);
create index if not exists payments_order_id_idx on public.payments (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
