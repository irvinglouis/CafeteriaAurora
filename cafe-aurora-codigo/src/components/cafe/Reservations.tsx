import { useState } from "react";
import { CalendarCheck, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { timeSlots } from "@/data/cafe";
import { reservationErrorMessage, submitReservation } from "@/lib/reservations";
import { Reveal, SectionTitle } from "./Reveal";
import { cn } from "@/lib/utils";

type Form = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  people: string;
  occasion: string;
};

const empty: Form = { name: "", email: "", phone: "", date: "", time: "", people: "2", occasion: "" };

const validators: Record<keyof Form, (v: string) => string | null> = {
  name: (v) => (v.trim().length < 3 ? "Ingresa tu nombre completo" : null),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v) ? null : "Correo no válido"),
  phone: (v) => (v.replace(/\D/g, "").length < 8 ? "Teléfono de al menos 8 dígitos" : null),
  date: (v) => (v ? null : "Elige una fecha"),
  time: (v) => (v ? null : "Elige una hora"),
  people: () => null,
  occasion: () => null,
};

export function Reservations() {
  const [form, setForm] = useState<Form>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [loading, setLoading] = useState(false);

  const errorFor = (k: keyof Form) => (touched[k] ? validators[k](form[k]) : null);
  const validFor = (k: keyof Form) => Boolean(touched[k] && !validators[k](form[k]) && form[k] !== "");
  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setTouched((t) => ({ ...t, [k]: true }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const keys = Object.keys(validators) as (keyof Form)[];
    setTouched(Object.fromEntries(keys.map((k) => [k, true])));
    const firstError = keys.map((k) => validators[k](form[k])).find(Boolean);
    if (firstError) {
      toast.error(firstError);
      return;
    }
    setLoading(true);
    try {
      await submitReservation(form);
      toast.success("¡Reserva confirmada!", {
        description: `${form.name}, te esperamos el ${form.date} a las ${form.time} para ${form.people} persona(s).`,
      });
      setForm(empty);
      setTouched({});
    } catch (error: unknown) {
      toast.error(reservationErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (k: keyof Form) =>
    cn(
      "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-gold",
      errorFor(k) ? "border-destructive" : validFor(k) ? "border-gold/60" : "border-input",
    );

  return (
    <section id="reservas" className="bg-secondary/50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <SectionTitle
            eyebrow="Reservas"
            title="Aparta tu mesa favorita"
            subtitle="Confirmamos por correo en minutos. Mesas junto a la ventana sujetas a disponibilidad."
            align="left"
          />
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre completo" error={errorFor("name")} valid={validFor("name")}>
                <input
                  className={fieldClass("name")}
                  placeholder="Ana Torres"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>
              <Field label="Email" error={errorFor("email")} valid={validFor("email")}>
                <input
                  className={fieldClass("email")}
                  placeholder="ana@correo.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="Teléfono" error={errorFor("phone")} valid={validFor("phone")}>
                <input
                  className={fieldClass("phone")}
                  placeholder="+51 987 654 321"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Field>
              <Field label="Fecha" error={errorFor("date")} valid={validFor("date")}>
                <input
                  type="date"
                  className={fieldClass("date")}
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                />
              </Field>
              <Field label="Hora" error={errorFor("time")} valid={validFor("time")}>
                <select
                  className={fieldClass("time")}
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                >
                  <option value="">Selecciona</option>
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Personas">
                <select
                  className={fieldClass("people")}
                  value={form.people}
                  onChange={(e) => set("people", e.target.value)}
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n} {n === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Ocasión especial (opcional)">
              <select
                className={fieldClass("occasion")}
                value={form.occasion}
                onChange={(e) => set("occasion", e.target.value)}
              >
                <option value="">Sin ocasión especial</option>
                <option value="Cumpleaños">Cumpleaños</option>
                <option value="Aniversario">Aniversario</option>
                <option value="Reunión de negocios">Reunión de negocios</option>
              </select>
            </Field>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-sm font-semibold text-gold-foreground shadow-soft transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Confirmando…
                </>
              ) : (
                <>
                  <CalendarCheck className="h-4 w-4" /> Confirmar reserva
                </>
              )}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
              alt="Mesa reservada en el salón de Café Aurora"
              loading="lazy"
              className="h-[520px] w-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, transparent 40%, rgba(26,15,10,0.9) 100%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-8 text-cream">
              <Sparkles className="h-5 w-5 text-gold" />
              <h3 className="mt-3 text-2xl font-semibold">Salón Aurora</h3>
              <p className="mt-2 max-w-sm text-sm text-cream/80">
                24 mesas, barra de cata para 8 personas y terraza interior con luz natural.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-cream/85">
                {["Cancelación gratuita hasta 2h antes", "Cata guiada bajo pedido", "Opciones sin gluten y veganas"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-gold" /> {t}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  valid,
  children,
}: {
  label: string;
  error?: string | null;
  valid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
        {valid && <Check className="h-3.5 w-3.5 text-gold" />}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
