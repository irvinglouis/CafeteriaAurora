'use client'

import { Bell, LogOut, Menu, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const fecha = new Intl.DateTimeFormat('es-PE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}).format(new Date())

export function DashboardHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(prefers)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-border p-2 text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
          <span className="sr-only">Abrir menú</span>
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-xl leading-tight tracking-tight text-balance sm:text-2xl">
            Buenos días, Aurora
          </h1>
          <p className="mt-0.5 text-sm capitalize text-muted-foreground">{fecha}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDark((v) => !v)}
            className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {dark ? (
              <Sun className="size-[18px]" aria-hidden="true" />
            ) : (
              <Moon className="size-[18px]" aria-hidden="true" />
            )}
            <span className="sr-only">
              {dark ? 'Activar modo claro' : 'Activar modo oscuro'}
            </span>
          </button>

          <button
            type="button"
            className="relative rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="size-[18px]" aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex size-[18px] items-center justify-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground">
              3
            </span>
            <span className="sr-only">Notificaciones: 3 sin leer</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <LogOut className="size-[18px]" aria-hidden="true" />
            <span className="hidden sm:inline">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  )
}
