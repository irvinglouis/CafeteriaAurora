import { TrendingUp } from 'lucide-react'
import { soles, weeklyRevenue } from '@/lib/dashboard-data'

export function RevenueChart() {
  const max = Math.max(...weeklyRevenue.map((d) => d.monto))
  const total = weeklyRevenue.reduce((sum, d) => sum + d.monto, 0)
  const mejor = weeklyRevenue.reduce((a, b) => (b.monto > a.monto ? b : a))

  return (
    <section
      aria-labelledby="ingresos-heading"
      className="animate-rise rounded-2xl border border-border bg-card p-5"
      style={{ animationDelay: '240ms' }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="ingresos-heading" className="font-serif text-lg tracking-tight">
            Ingresos de la semana
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Total {soles(total)} · mejor día {mejor.label}
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-xs font-medium text-success">
          <TrendingUp className="size-3.5" aria-hidden="true" />
          +14.2% vs semana pasada
        </span>
      </div>

      <ul className="mt-8 flex h-56 items-end gap-2 sm:gap-4">
        {weeklyRevenue.map((d, i) => (
          <li key={d.dia} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {d.monto.toLocaleString('es-PE')}
            </span>
            <div
              className="animate-grow-y w-full rounded-t-md bg-secondary"
              style={{
                height: `${(d.monto / max) * 100}%`,
                animationDelay: `${i * 70}ms`,
                opacity: d.monto === max ? 1 : 0.78,
              }}
            >
              <span className="sr-only">
                {d.label}: {soles(d.monto)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{d.dia}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
