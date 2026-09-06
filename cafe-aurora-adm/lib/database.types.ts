/**
 * Tipos TypeScript del esquema `public` de Supabase (Cafe Aurora).
 *
 * ESTADO ACTUAL: refleja unicamente las tablas usadas hasta el Laboratorio 03
 * (customers y reservations). Las tablas de ventas -products, orders,
 * order_items y payments- todavia NO estan reflejadas aqui.
 *
 * Este archivo debe regenerarse desde el esquema real en el PASO E del
 * Laboratorio 04. No lo edite a mano ni cree archivos de tipos duplicados.
 */

export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export type CustomerRow = {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
}

export type ReservationRow = {
  id: string
  customer_id: string
  reservation_date: string
  reservation_time: string
  people: number
  status: ReservationStatus
  notes: string | null
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: CustomerRow
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          created_at?: string
        }
        Relationships: []
      }
      reservations: {
        Row: ReservationRow
        Insert: {
          id?: string
          customer_id: string
          reservation_date: string
          reservation_time: string
          people: number
          status?: ReservationStatus
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          reservation_date?: string
          reservation_time?: string
          people?: number
          status?: ReservationStatus
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reservations_customer_id_fkey'
            columns: ['customer_id']
            referencedRelation: 'customers'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
