import { useEffect, useState } from "react";
import { Coffee, Menu, Moon, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Menú", href: "#menu" },
  { label: "Reservas", href: "#reservas" },
  { label: "Galería", href: "#galeria" },
  { label: "Biblioteca", href: "#biblioteca" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("aurora-theme");
    const prefers = stored === "dark";
    setDark(prefers);
    document.documentElement.classList.toggle("dark", prefers);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("aurora-theme", next ? "dark" : "light");
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/70 py-3 backdrop-blur-xl"
          : "py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-5 sm:px-8">
        <a
          href="#inicio"
          className={cn(
            "flex min-w-0 items-center gap-2 transition-colors",
            scrolled ? "text-foreground" : "text-cream",
          )}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
            <Coffee className="h-4 w-4" />
          </span>
          <span className="truncate font-display text-lg font-semibold tracking-tight sm:text-xl">
            Café Aurora
          </span>
        </a>

        <div className="ml-auto hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold after:transition-transform hover:after:origin-left hover:after:scale-x-100",
                scrolled ? "text-foreground/80 hover:text-foreground" : "text-cream/85 hover:text-cream",
              )}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors",
              scrolled
                ? "border-border text-foreground hover:bg-muted"
                : "border-cream/30 text-cream hover:bg-cream/10",
            )}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="#reservas"
            className="hidden rounded-full px-6 py-3 text-[1.05rem] font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(46,125,82,0.55)] sm:inline-flex"
            style={{ backgroundColor: "#2E7D52" }}
          >
            Reservar Mesa
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-full border lg:hidden",
              scrolled ? "border-border text-foreground" : "border-cream/30 text-cream",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="mx-4 mt-3 rounded-2xl border border-border bg-card p-4 shadow-lift">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-card-foreground hover:bg-muted"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#reservas"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl px-3 py-3.5 text-center text-[1.05rem] font-semibold text-white transition-shadow duration-300 hover:shadow-[0_10px_28px_-6px_rgba(46,125,82,0.55)]"
                style={{ backgroundColor: "#2E7D52" }}
              >
                Reservar Mesa
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
