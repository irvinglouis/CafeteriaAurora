import { Clock } from 'lucide-react'
import { orders, type OrderStatus } from '@/lib/dashboard-data'
import { cn, formatPeruvianSoles } from '@/lib/utils'

const statusStyles: Record<OrderStatus, string> = {
  preparando: 'bg-warning/15 text-warning',
  listo: 'bg-secondary/15 text-secondary',
  entregado: 'bg-success/12 text-success',
}

const statusLabel: Record<OrderStatus, string> = {
  preparando: 'Preparando',
  listo: 'Listo',
  entregado: 'Entregado',
}

export function LiveOrders() {
  return (
    <section
      aria-labelledby="pedidos-heading"
      className="animate-rise rounded-2xl border border-border bg-card p-5"
      style={{ animationDelay: '300ms' }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="pedidos-heading" className="font-serif text-lg tracking-tight">
            Pedidos en tiempo real
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">Últimos 5 pedidos recibidos</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-success" />
          En vivo
        </span>
      </div>

      <ul className="mt-4 flex flex-col">
        {orders.map((o) => (
          <li
            key={o.id}
            className="-mx-2 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg border-b border-border/70 px-2 py-3.5 transition-colors last:border-0 hover:bg-accent/40"
          >
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 font-medium text-card-foreground">
                {o.cliente}
                <span className="text-xs font-normal tabular-nums text-muted-foreground">
                  {o.codigo}
                </span>
              </p>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">{o.productos}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium tabular-nums text-card-foreground">
                {formatPeruvianSoles(o.total)}
              </span>
              <span
                className={cn(
                  'rounded-full px-2.5 py-1 text-xs font-medium',
                  statusStyles[o.estado],
                )}
              >
                {statusLabel[o.estado]}
              </span>
              <span className="flex w-20 items-center justify-end gap-1 text-xs tabular-nums text-muted-foreground">
                <Clock className="size-3.5" aria-hidden="true" />
                {o.minutos} min
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
