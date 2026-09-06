'use client'

import { Check, Users, X } from 'lucide-react'
import { useState } from 'react'
import {
  reservations as seed,
  type Reservation,
  type ReservationStatus,
} from '@/lib/dashboard-data'
import { cn } from '@/lib/utils'

const statusStyles: Record<ReservationStatus, string> = {
  confirmada: 'bg-success/12 text-success',
  pendiente: 'bg-warning/15 text-warning',
  cancelada: 'bg-destructive/12 text-destructive',
}

const statusLabel: Record<ReservationStatus, string> = {
  confirmada: 'Confirmada',
  pendiente: 'Pendiente',
  cancelada: 'Cancelada',
}

export function ReservationsTable() {
  const [rows, setRows] = useState<Reservation[]>(seed)

  const setStatus = (id: string, estado: ReservationStatus) =>
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, estado } : r)))

  const confirmadas = rows.filter((r) => r.estado === 'confirmada').length
  const comensales = rows
    .filter((r) => r.estado !== 'cancelada')
    .reduce((sum, r) => sum + r.personas, 0)

  return (
    <section
      aria-labelledby="reservas-heading"
      className="animate-rise overflow-hidden rounded-2xl border border-border bg-card"
      style={{ animationDelay: '180ms' }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 id="reservas-heading" className="font-serif text-lg tracking-tight">
            Reservas de hoy
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {confirmadas} confirmadas · {comensales} comensales esperados
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          <Users className="size-3.5" aria-hidden="true" />
          {rows.length} reservas
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <caption className="sr-only">
            Listado de reservas del día con nombre, hora, número de personas, estado y acciones
          </caption>
          <thead>
            <tr className="border-b border-border bg-muted/40 text-left">
              <th scope="col" className="px-5 py-3 font-medium text-muted-foreground">
                Nombre
              </th>
              <th scope="col" className="px-5 py-3 font-medium text-muted-foreground">
                Hora
              </th>
              <th scope="col" className="px-5 py-3 font-medium text-muted-foreground">
                Personas
              </th>
              <th scope="col" className="px-5 py-3 font-medium text-muted-foreground">
                Estado
              </th>
              <th scope="col" className="px-5 py-3 text-right font-medium text-muted-foreground">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-border/70 transition-colors last:border-0 hover:bg-accent/40"
              >
                <td className="px-5 py-3.5">
                  <span className="block font-medium text-card-foreground">{r.nombre}</span>
                  <span className="block text-xs text-muted-foreground">{r.nota}</span>
                </td>
                <td className="px-5 py-3.5 tabular-nums text-muted-foreground">{r.hora}</td>
                <td className="px-5 py-3.5 tabular-nums text-muted-foreground">{r.personas}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      'inline-flex rounded-full px-2.5 py-1 text-xs font-medium',
                      statusStyles[r.estado],
                    )}
                  >
                    {statusLabel[r.estado]}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, 'confirmada')}
                      disabled={r.estado === 'confirmada'}
                      className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-card-foreground transition-colors hover:border-success hover:bg-success/10 hover:text-success disabled:pointer-events-none disabled:opacity-40"
                    >
                      <Check className="size-3.5" aria-hidden="true" />
                      Confirmar
                      <span className="sr-only">reserva de {r.nombre}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus(r.id, 'cancelada')}
                      disabled={r.estado === 'cancelada'}
                      className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-card-foreground transition-colors hover:border-destructive hover:bg-destructive/10 hover:text-destructive disabled:pointer-events-none disabled:opacity-40"
                    >
                      <X className="size-3.5" aria-hidden="true" />
                      Cancelar
                      <span className="sr-only">reserva de {r.nombre}</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
