'use client'

import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarCheck,
  ShoppingBag,
  UserPlus,
  Wallet,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn, formatPeruvianSoles } from '@/lib/utils'

const metrics = [
  {
    label: 'Reservas hoy',
    value: 24,
    icon: CalendarCheck,
    delta: 12.5,
    hint: '3 más que ayer',
    format: (n: number) => String(n),
  },
  {
    label: 'Pedidos pendientes',
    value: 8,
    icon: ShoppingBag,
    delta: -20,
    hint: '2 menos que ayer',
    format: (n: number) => String(n),
  },
  {
    label: 'Ingresos del día',
    value: 1240,
    icon: Wallet,
    delta: 8.4,
    hint: 'S/.96 más que ayer',
    format: formatPeruvianSoles,
  },
  {
    label: 'Clientes nuevos',
    value: 6,
    icon: UserPlus,
    delta: 50,
    hint: '2 más que ayer',
    format: (n: number) => String(n),
  },
]

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

function MetricCard({
  metric,
  index,
}: {
  metric: (typeof metrics)[number]
  index: number
}) {
  const animated = useCountUp(metric.value)
  const positive = metric.delta >= 0
  const Trend = positive ? ArrowUpRight : ArrowDownRight

  return (
    <article
      className="animate-rise rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(44,24,16,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(44,24,16,0.08)]"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-secondary">
          <metric.icon className="size-[18px]" aria-hidden="true" />
        </span>
      </div>

      <p className="mt-4 font-serif text-3xl leading-none tracking-tight text-card-foreground tabular-nums sm:text-4xl">
        {metric.format(animated)}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
            positive
              ? 'bg-success/12 text-success'
              : 'bg-destructive/12 text-destructive',
          )}
        >
          <Trend className="size-3.5" aria-hidden="true" />
          {positive ? '+' : ''}
          {metric.delta}%
        </span>
        <span className="text-xs text-muted-foreground">{metric.hint}</span>
      </div>
    </article>
  )
}

export function MetricCards() {
  return (
    <section aria-label="Métricas del día" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, i) => (
        <MetricCard key={metric.label} metric={metric} index={i} />
      ))}
    </section>
  )
}
