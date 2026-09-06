import { BookOpen, CalendarCheck, ShoppingBag, UserPlus } from 'lucide-react'
import { activity, type ActivityKind } from '@/lib/dashboard-data'

const icons: Record<ActivityKind, typeof CalendarCheck> = {
  reserva: CalendarCheck,
  pedido: ShoppingBag,
  cliente: UserPlus,
  menu: BookOpen,
}

export function RecentActivity() {
  return (
    <section
      aria-labelledby="actividad-heading"
      className="animate-rise rounded-2xl border border-border bg-card p-5"
      style={{ animationDelay: '380ms' }}
    >
      <h2 id="actividad-heading" className="font-serif text-lg tracking-tight">
        Actividad reciente
      </h2>
      <p className="mt-0.5 text-sm text-muted-foreground">Eventos del local de hoy</p>

      <ul className="mt-5 flex flex-col">
        {activity.map((item, i) => {
          const Icon = icons[item.kind]
          return (
            <li key={item.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-secondary">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                {i < activity.length - 1 && <span className="w-px flex-1 bg-border" />}
              </div>
              <div className="min-w-0 flex-1 pb-5">
                <p className="text-sm font-medium text-card-foreground">{item.titulo}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.detalle}</p>
                <p className="mt-1 text-xs text-muted-foreground/80">{item.hace}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
