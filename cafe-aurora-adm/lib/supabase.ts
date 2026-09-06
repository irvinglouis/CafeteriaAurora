import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const MISSING_SUPABASE_ENV = 'MISSING_SUPABASE_ENV'

let client: SupabaseClient<Database> | null = null

/**
 * Devuelve el cliente de Supabase del panel administrativo.
 *
 * Reutiliza una unica instancia por sesion del navegador y la tipa con el
 * esquema `Database` generado desde el proyecto real de Cafe Aurora.
 *
 * @returns Cliente de Supabase tipado con el esquema public del proyecto.
 * @throws Error con mensaje `MISSING_SUPABASE_ENV` si faltan las variables
 * NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export function getSupabase(): SupabaseClient<Database> {
  if (client) return client

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(MISSING_SUPABASE_ENV)
  }

  client = createClient<Database>(url, anonKey)
  return client
}

/**
 * Indica si un error corresponde a la ausencia de variables de entorno
 * de Supabase, para poder mostrar un mensaje claro en lugar de un fallo.
 *
 * @param error - Error capturado en un bloque try/catch.
 * @returns `true` si el error proviene de variables de entorno faltantes.
 */
export function isMissingSupabaseEnv(error: unknown): boolean {
  return error instanceof Error && error.message === MISSING_SUPABASE_ENV
}
