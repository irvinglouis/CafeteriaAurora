import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { Reveal, SectionTitle } from "./Reveal";

const info = [
  { icon: MapPin, title: "Dirección", value: "Av. Óscar R. Benavides 340, Miraflores, Lima" },
  { icon: Phone, title: "Teléfono", value: "+51 987 654 321" },
  { icon: Mail, title: "Email", value: "hola@cafeaurora.pe" },
  { icon: Clock, title: "Horario", value: "Lun–Vie 7am–9pm · Sáb 8am–10pm · Dom 9am–7pm" },
];

export function Contact() {
  return (
    <section id="contacto" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionTitle
            eyebrow="Ubicación"
            title="Ven a visitarnos"
            subtitle="Estamos a dos cuadras del Malecón, con terraza interior y estacionamiento cercano."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-soft">
              <iframe
                title="Mapa de Café Aurora en Miraflores, Lima"
                src="https://www.google.com/maps?q=Miraflores,+Lima,+Peru&output=embed"
                loading="lazy"
                className="h-[420px] w-full border-0"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {info.map((c) => (
                <div key={c.title} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-gold">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {c.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">{c.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-sm font-semibold">Síguenos</p>
              <div className="mt-4 flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Facebook, label: "Facebook" },
                  { icon: MessageCircle, label: "TikTok" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#contacto"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border text-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
              <a
                href="https://wa.me/51987654321"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" /> Escríbenos por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
