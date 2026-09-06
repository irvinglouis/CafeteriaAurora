import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { schedule } from "@/data/cafe";
import { Reveal, SectionTitle } from "./Reveal";
import { cn } from "@/lib/utils";

export function Hours() {
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);

  return (
    <section className="bg-primary py-24 text-cream sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Horarios</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Siempre recién molido</h2>
            <p className="mt-4 text-sm text-cream/75">
              Cocina abierta hasta una hora antes del cierre. Última extracción, 20 minutos antes.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {schedule.map((d, i) => {
            const isToday = today === d.index;
            return (
              <Reveal key={d.day} delay={i * 0.05}>
                <div
                  className={cn(
                    "h-full rounded-2xl border p-5 transition-colors",
                    isToday ? "border-gold bg-cream/10" : "border-cream/15 bg-cream/5",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{d.day}</span>
                    <span
                      className={cn(
                        "h-2.5 w-2.5 shrink-0 rounded-full",
                        isToday ? "bg-[#3fbf6f]" : "bg-cream/25",
                      )}
                    />
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-sm text-cream/80">
                    <Clock className="h-4 w-4 text-gold" />
                    {d.hours}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-cream/50">
                    {isToday ? "Abierto hoy" : "Cerrado hoy"}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
