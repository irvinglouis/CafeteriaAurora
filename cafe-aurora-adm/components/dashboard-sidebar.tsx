'use client'

import {
  BookOpen,
  CalendarCheck,
  Coffee,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Resumen', icon: LayoutDashboard, active: true },
  { label: 'Reservas', icon: CalendarCheck, badge: '24' },
  { label: 'Pedidos', icon: ShoppingBag, badge: '8' },
  { label: 'Menú', icon: BookOpen },
  { label: 'Clientes', icon: Users },
  { label: 'Ingresos', icon: TrendingUp },
  { label: 'Configuración', icon: Settings },
]

export function DashboardSidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-primary/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:sticky lg:top-0 lg:h-dvh lg:w-64 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-6">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
            <Coffee className="size-5" aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="font-serif text-lg leading-tight tracking-tight">
              Café Aurora
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-sidebar-foreground/55">
              Administración
            </span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto rounded-md p-1.5 text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:hidden"
          >
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Cerrar menú</span>
          </button>
        </div>

        <nav aria-label="Navegación principal" className="flex-1 overflow-y-auto px-3 py-5">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href="#"
                  aria-current={link.active ? 'page' : undefined}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                    link.active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                  )}
                >
                  <link.icon
                    className={cn(
                      'size-[18px] shrink-0',
                      link.active
                        ? 'text-sidebar-primary'
                        : 'text-sidebar-foreground/50 group-hover:text-sidebar-primary',
                    )}
                    aria-hidden="true"
                  />
                  {link.label}
                  {link.badge && (
                    <span className="ml-auto rounded-full bg-sidebar-primary/20 px-2 py-0.5 text-xs font-medium text-sidebar-primary">
                      {link.badge}
                    </span>
                  )}
                  {link.active && (
                    <span className="ml-auto size-1.5 rounded-full bg-sidebar-primary" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-xl bg-sidebar-accent/50 p-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sidebar-primary/25 font-serif text-base text-sidebar-primary">
              AV
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-sidebar-accent-foreground">
                Aurora Valdez
              </span>
              <span className="truncate text-xs text-sidebar-foreground/55">
                Propietaria
              </span>
            </span>
          </div>
        </div>
      </aside>
    </>
  )
}
