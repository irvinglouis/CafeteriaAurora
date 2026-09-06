import { useState } from "react";
import { Coffee, Send } from "lucide-react";
import { toast } from "sonner";

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cafeaurora",
    hoverClass:
      "hover:text-white hover:[background-image:linear-gradient(45deg,#FCAF45,#F77737,#E1306C,#C13584,#833AB4)]",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" fill="currentColor">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm9.38 1.88a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/cafeaurora",
    hoverClass: "hover:text-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" fill="currentColor">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@cafeaurora",
    hoverClass: "hover:bg-white hover:text-black",
    icon: (
      <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true" fill="currentColor">
        <path d="M19.8 8.2a6.6 6.6 0 0 1-3.9-1.3v7.4a6.3 6.3 0 1 1-5.4-6.2v3.1a3.2 3.2 0 1 0 2.2 3.1V2.5h3a6.6 6.6 0 0 0 4.1 5.4v.3Z" />
      </svg>
    ),
  },
];

const columns = [
  {
    title: "Explorar",
    links: [
      { label: "Menú", href: "#menu" },
      { label: "Galería", href: "#galeria" },
      { label: "Biblioteca", href: "#biblioteca" },
      { label: "Nuestra historia", href: "#nosotros" },
    ],
  },
  {
    title: "Visítanos",
    links: [
      { label: "Reservas", href: "#reservas" },
      { label: "Ubicación", href: "#contacto" },
      { label: "Horarios", href: "#inicio" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos", href: "#contacto" },
      { label: "Privacidad", href: "#contacto" },
      { label: "Trabaja con nosotros", href: "#contacto" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-primary pt-16 pb-8 text-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground">
                <Coffee className="h-4 w-4" />
              </span>
              <span className="font-display text-xl font-semibold">Café Aurora</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-cream/70">
              Cada taza cuenta una historia. Café de especialidad peruano, servido con calma.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`grid h-8 w-8 place-items-center overflow-hidden rounded-md text-cream transition-all duration-300 ${s.hoverClass}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) {
                  toast.error("Ingresa un correo válido");
                  return;
                }
                toast.success("¡Suscrito! Te enviaremos el tueste de la semana.");
                setEmail("");
              }}
              className="mt-8 flex max-w-sm gap-2"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="min-w-0 flex-1 rounded-full border border-cream/25 bg-cream/5 px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold"
              />
              <button
                type="submit"
                aria-label="Suscribirse"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gold text-gold-foreground"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-cream/70 transition-colors hover:text-cream">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-cream/15 pt-6 text-xs text-cream/50">
          © {new Date().getFullYear()} Café Aurora · Miraflores, Lima · Hecho con granos peruanos.
        </div>
      </div>
    </footer>
  );
}
