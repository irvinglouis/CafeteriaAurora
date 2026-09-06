import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal, SectionTitle } from "./Reveal";

const stats = [
  { value: 5, suffix: "", label: "años tostando en Lima" },
  { value: 50000, suffix: "+", label: "clientes atendidos" },
  { value: 12, suffix: "", label: "variedades de café" },
];

function Counter({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span className="font-display text-4xl font-semibold text-gold sm:text-5xl">
      {n.toLocaleString("es-PE")}
      {suffix}
    </span>
  );
}

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section id="nosotros" className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <SectionTitle
            eyebrow="Nuestra historia"
            title="De un tostador pequeño a un ritual de barrio"
            align="left"
          />
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Café Aurora nació en 2021 en una esquina de Miraflores con un tostador de 5 kilos y la
              convicción de que el café peruano merecía una vitrina a la altura del mundo.
            </p>
            <p>
              Trabajamos directamente con familias productoras de Cajamarca, Cusco y Villa Rica, pagando
              precios por encima del mercado y trazando cada lote hasta la parcela.
            </p>
            <p>
              Hoy nuestro salón es punto de encuentro para catas, lecturas y conversaciones que empiezan con
              una taza y terminan siendo parte de la historia del barrio.
            </p>
          </div>

          <div ref={ref} className="mt-10 grid gap-6 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <Counter value={s.value} suffix={s.suffix} active={inView} />
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80"
              alt="Tostador y granos de café en Café Aurora"
              loading="lazy"
              className="h-[540px] w-full rounded-[2rem] object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-border bg-card px-6 py-5 shadow-lift">
              <p className="font-display text-lg font-semibold">Tueste semanal</p>
              <p className="mt-1 text-xs text-muted-foreground">Cada martes, en casa</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
