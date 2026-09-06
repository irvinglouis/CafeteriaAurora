import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { categories, products, type Category } from "@/data/cafe";
import { Reveal, SectionTitle } from "./Reveal";
import { cn } from "@/lib/utils";

export function MenuSection() {
  const [active, setActive] = useState<Category>("Cafés Especiales");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 550);
    return () => clearTimeout(t);
  }, [active]);

  const items = products.filter((p) => p.category === active);

  return (
    <section id="menu" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="Nuestra carta"
            title="Menú de temporada"
            subtitle="Granos de altura peruanos tostados cada semana, repostería artesanal y desayunos preparados al momento."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  "relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  active === c ? "text-gold-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === c && (
                  <motion.span
                    layoutId="menu-tab"
                    className="absolute inset-0 -z-10 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-3xl border border-border bg-card">
                  <div className="h-52 animate-pulse bg-muted" />
                  <div className="space-y-3 p-6">
                    <div className="h-4 w-20 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-2/3 animate-pulse rounded-full bg-muted" />
                    <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
                    <div className="h-3 w-4/5 animate-pulse rounded-full bg-muted" />
                  </div>
                </div>
              ))
            : null}

          <AnimatePresence mode="popLayout">
            {!loading &&
              items.map((p, i) => (
                <motion.article
                  key={p.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
                      <span className="shrink-0 font-display text-lg font-semibold text-gold">
                        S/.{p.price}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                    <button
                      onClick={() => toast.success(`${p.name} agregado a tu pedido`)}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/40 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-gold-foreground"
                    >
                      <Plus className="h-4 w-4" /> Agregar
                    </button>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
