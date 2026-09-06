import { BookMarked, BookOpen, HeartHandshake } from "lucide-react";
import { libraryBooks } from "@/data/cafe";
import { Reveal } from "./Reveal";

const ritual = [
  { icon: BookOpen, label: "Toma un libro" },
  { icon: BookMarked, label: "Léelo" },
  { icon: HeartHandshake, label: "Devuélvelo o déjalo para alguien más" },
];

export function Library() {
  return (
    <section id="biblioteca" className="bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Biblioteca gratuita
            </span>
            <h2 className="mt-3 text-balance-title text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Nuestra Biblioteca
            </h2>
            <p className="mt-4 font-display text-base italic text-primary/80 sm:text-lg">
              Toma un libro · Léelo · Devuélvelo o déjalo para alguien más
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Un estante abierto junto a la barra. Elige un título, acompáñalo con tu taza y, cuando
              termines, tráelo de vuelta o déjalo para el siguiente lector.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-3">
            {ritual.map((step, i) => (
              <div
                key={step.label}
                className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-primary px-4 py-3.5 text-cream shadow-soft"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
                  <step.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-0.5 text-sm font-medium leading-snug text-cream">{step.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {libraryBooks.map((book, i) => (
            <Reveal key={book.title} delay={i * 0.05}>
              <article className="group h-full overflow-hidden rounded-3xl border border-primary/15 bg-primary shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={book.cover}
                    alt={`Portada de ${book.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(28,16,7,0.12) 0%, rgba(28,16,7,0.35) 48%, rgba(28,16,7,0.94) 100%)",
                    }}
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-cream/20 bg-primary/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cream backdrop-blur">
                    {book.genre}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="mb-3 h-px w-10 bg-gold" />
                    <h3 className="font-display text-xl font-semibold leading-tight text-cream">
                      {book.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-cream/75">{book.author}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-cream/10 px-5 py-4">
                  <p className="text-xs text-cream/55">En el estante · préstamo libre</p>
                  <span className="rounded-full bg-cream/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
                    Gratis
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
