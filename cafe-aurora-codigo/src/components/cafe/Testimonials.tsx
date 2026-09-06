import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/cafe";
import { Reveal, SectionTitle } from "./Reveal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 4200);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[i]!;

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <SectionTitle eyebrow="Testimonios" title="Lo que dicen nuestros clientes" />
        </Reveal>

        <Reveal delay={0.1}>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative mt-12 overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft sm:p-12"
          >
            <Quote className="h-8 w-8 text-gold/40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mt-6 font-display text-xl leading-relaxed sm:text-2xl">“{t.text}”</p>
                <div className="mt-8 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{t.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="flex text-gold">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className={cn("h-3.5 w-3.5", s < t.stars ? "fill-current" : "opacity-25")}
                          />
                        ))}
                      </span>
                      <span className="text-xs text-muted-foreground">{t.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((r, idx) => (
                <button
                  key={r.name}
                  aria-label={`Ver reseña de ${r.name}`}
                  onClick={() => setI(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    idx === i ? "w-8 bg-gold" : "w-3 bg-border",
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
