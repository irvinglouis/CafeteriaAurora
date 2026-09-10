-- Café Aurora — limpieza opcional de staging
-- Ejecutar SOLO después de que 05-validate.sql dé conteos correctos
-- y problema = 0 en todas las consultas.
-- No borra customers, reservations, products, orders, order_items ni payments.

drop table if exists staging.payments;
drop table if exists staging.order_items;
drop table if exists staging.orders;
drop table if exists staging.products;
drop table if exists staging.customers;
drop schema if exists staging;
