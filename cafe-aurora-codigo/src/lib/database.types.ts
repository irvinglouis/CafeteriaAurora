export type ReservationStatus = "pending" | "confirmed" | "cancelled";

export type CustomerRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
};

export type CustomerInsert = {
  name: string;
  email: string;
  phone: string;
};

export type ReservationRow = {
  id: string;
  customer_id: string;
  reservation_date: string;
  reservation_time: string;
  people: number;
  status: ReservationStatus;
  notes: string | null;
  created_at: string;
};

export type ReservationInsert = {
  customer_id: string;
  reservation_date: string;
  reservation_time: string;
  people: number;
  status?: ReservationStatus;
  notes?: string | null;
};

export type Database = {
  public: {
    Tables: {
      customers: {
        Row: CustomerRow;
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      reservations: {
        Row: ReservationRow;
        Insert: {
          id?: string;
          customer_id: string;
          reservation_date: string;
          reservation_time: string;
          people: number;
          status?: ReservationStatus;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          reservation_date?: string;
          reservation_time?: string;
          people?: number;
          status?: ReservationStatus;
          notes?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_customer_id_fkey";
            columns: ["customer_id"];
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
