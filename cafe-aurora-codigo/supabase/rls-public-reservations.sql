-- Políticas mínimas para que el formulario público pueda
-- identificar/registrar clientes y crear reservaciones.

alter table public.customers enable row level security;
alter table public.reservations enable row level security;

create policy "anon_select_customers"
  on public.customers
  for select
  to anon
  using (true);

create policy "anon_insert_customers"
  on public.customers
  for insert
  to anon
  with check (true);

create policy "anon_update_customers"
  on public.customers
  for update
  to anon
  using (true)
  with check (true);

create policy "anon_insert_reservations"
  on public.reservations
  for insert
  to anon
  with check (true);
