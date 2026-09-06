import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js";
import type { CustomerInsert, Database } from "./database.types";
import { getSupabase, isMissingSupabaseEnv } from "./supabase";

export type ReservationFormInput = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  people: string;
  occasion: string;
};

export class ReservationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ReservationError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isPostgrestError(error: unknown): error is PostgrestError {
  if (!isRecord(error)) return false;
  return typeof error["message"] === "string" && typeof error["code"] === "string";
}

function friendlyFromPostgrest(error: PostgrestError): string {
  if (error.code === "42501") {
    return "No pudimos guardar tu reserva por un permiso del servidor. Inténtalo más tarde.";
  }
  if (error.code === "23505") {
    return "Ya existe un registro con estos datos. Inténtalo de nuevo.";
  }
  return "No pudimos completar tu reserva. Inténtalo de nuevo en unos minutos.";
}

export function reservationErrorMessage(error: unknown): string {
  if (error instanceof ReservationError) return error.message;
  if (isMissingSupabaseEnv(error)) {
    return "El servicio de reservas no está disponible en este momento.";
  }
  if (isPostgrestError(error)) return friendlyFromPostgrest(error);
  if (error instanceof TypeError) {
    return "No pudimos conectar. Revisa tu conexión e inténtalo de nuevo.";
  }
  return "No pudimos completar tu reserva. Inténtalo de nuevo en unos minutos.";
}

async function identifyOrCreateCustomer(
  supabase: SupabaseClient<Database>,
  input: CustomerInsert,
): Promise<string> {
  const { data: existing, error: selectError } = await supabase
    .from("customers")
    .select("id")
    .eq("email", input.email)
    .maybeSingle();

  if (selectError) {
    throw new ReservationError(friendlyFromPostgrest(selectError));
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("customers")
      .update({ name: input.name, phone: input.phone })
      .eq("id", existing.id);

    if (updateError) {
      throw new ReservationError(friendlyFromPostgrest(updateError));
    }

    return existing.id;
  }

  const { data: created, error: insertError } = await supabase
    .from("customers")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
    })
    .select("id")
    .single();

  if (insertError) {
    if (insertError.code === "23505") {
      const { data: raced, error: racedError } = await supabase
        .from("customers")
        .select("id")
        .eq("email", input.email)
        .single();

      if (racedError || !raced) {
        throw new ReservationError(friendlyFromPostgrest(insertError));
      }

      return raced.id;
    }

    throw new ReservationError(friendlyFromPostgrest(insertError));
  }

  if (!created) {
    throw new ReservationError("No pudimos registrar tus datos. Inténtalo de nuevo.");
  }

  return created.id;
}

export async function submitReservation(form: ReservationFormInput): Promise<void> {
  const people = Number.parseInt(form.people, 10);
  if (!Number.isInteger(people) || people < 1 || people > 10) {
    throw new ReservationError("Elige entre 1 y 10 personas");
  }

  const supabase = getSupabase();
  const customerId = await identifyOrCreateCustomer(supabase, {
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
  });

  const occasion = form.occasion.trim();
  const notes = occasion === "" ? null : occasion;

  const { error } = await supabase.from("reservations").insert({
    customer_id: customerId,
    reservation_date: form.date,
    reservation_time: form.time,
    people,
    notes,
  });

  if (error) {
    throw new ReservationError(friendlyFromPostgrest(error));
  }
}
