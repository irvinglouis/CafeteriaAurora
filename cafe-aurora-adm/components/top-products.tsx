import { soles, topProducts } from '@/lib/dashboard-data'

export function TopProducts() {
  const max = Math.max(...topProducts.map((p) => p.unidades))

  return (
    <section
      aria-labelledby="productos-heading"
      className="animate-rise rounded-2xl border border-border bg-card p-5"
      style={{ animationDelay: '340ms' }}
    >
      <h2 id="productos-heading" className="font-serif text-lg tracking-tight">
        Más vendidos hoy
      </h2>
      <p className="mt-0.5 text-sm text-muted-foreground">Top 5 por unidades vendidas</p>

      <ol className="mt-5 flex flex-col gap-4">
        {topProducts.map((p, i) => (
          <li key={p.nombre}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-card-foreground">{p.nombre}</span>
              <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                {p.unidades} uds · {soles(p.ingreso)}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="animate-grow-x h-full rounded-full bg-secondary"
                style={{
                  width: `${(p.unidades / max) * 100}%`,
                  animationDelay: `${i * 80}ms`,
                  opacity: 1 - i * 0.12,
                }}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
