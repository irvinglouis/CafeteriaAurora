import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1920&q=80"
        alt="Barista preparando café de especialidad en Café Aurora"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,15,10,0.82) 0%, rgba(44,24,16,0.62) 45%, rgba(26,15,10,0.92) 100%)",
        }}
      />
      {/* vapor sutil */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3">
        {[12, 32, 54, 71, 88].map((left, i) => (
          <span
            key={left}
            className="steam absolute bottom-10 block h-40 w-24 rounded-full bg-cream/10 blur-2xl"
            style={{ left: `${left}%`, animationDelay: `${i * 1.4}s` }}
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pt-28 pb-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-cream backdrop-blur-md">
            Miraflores · Lima
          </span>
          <h1 className="mt-6 text-balance-title text-4xl font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            Cada taza cuenta una historia
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Café de especialidad. Ambiente único. Experiencia que perdura.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#reservas"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-[2.1rem] py-[1.05rem] text-[1.05rem] font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(46,125,82,0.55)]"
              style={{ backgroundColor: "#2E7D52" }}
            >
              Reservar Mesa
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#menu"
              className="inline-flex items-center justify-center rounded-full border border-cream/40 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Explorar Menú
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
