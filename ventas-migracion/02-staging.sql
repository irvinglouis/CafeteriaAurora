-- Café Aurora — tablas staging (paso 2/5)
-- Reciben los códigos del Excel (C001, P001, O0001, OI0001, PAY0001)
-- tal cual, antes de resolverlos a UUID.
-- No tocan customers.id ni reservations.

create schema if not exists staging;

create table if not exists staging.customers (
  customer_id text primary key,
  name text not null,
  email text not null,
  phone text not null,
  created_at timestamp without time zone not null
);

create table if not exists staging.products (
  product_id text primary key,
  name text not null,
  category text not null,
  price numeric(12, 2) not null,
  active boolean not null
);

create table if not exists staging.orders (
  order_id text primary key,
  customer_id text not null,
  order_date timestamp without time zone not null,
  status text not null,
  total numeric(12, 2) not null
);

create table if not exists staging.order_items (
  order_item_id text primary key,
  order_id text not null,
  product_id text not null,
  quantity integer not null,
  unit_price numeric(12, 2) not null,
  subtotal numeric(12, 2) not null
);

create table if not exists staging.payments (
  payment_id text primary key,
  order_id text not null,
  amount numeric(12, 2) not null,
  payment_method text not null,
  payment_status text not null,
  paid_at timestamp without time zone
);

alter table staging.customers enable row level security;
alter table staging.products enable row level security;
alter table staging.orders enable row level security;
alter table staging.order_items enable row level security;
alter table staging.payments enable row level security;
