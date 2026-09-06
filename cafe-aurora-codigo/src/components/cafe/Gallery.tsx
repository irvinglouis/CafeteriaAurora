import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { gallery } from "@/data/cafe";
import { Reveal, SectionTitle } from "./Reveal";

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="galeria" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="Galería"
            title="El ritual, en imágenes"
            subtitle="Nuestro salón, la barra de cata y los detalles que hacen de cada visita algo memorable."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setOpen(src)}
                className="group relative block w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={src}
                  alt={`Café Aurora, fotografía ${i + 1}`}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ height: i % 3 === 0 ? 340 : i % 3 === 1 ? 260 : 300 }}
                />
                <span className="absolute inset-0 grid place-items-center bg-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-gold-foreground">
                    <Search className="h-5 w-5" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-primary/90 p-6 backdrop-blur-sm"
          >
            <button
              aria-label="Cerrar"
              className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full border border-cream/30 text-cream"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              src={open}
              alt="Vista ampliada"
              className="max-h-[82vh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
