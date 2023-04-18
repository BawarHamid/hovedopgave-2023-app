export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          first_name: string;
          id: string;
          last_name: string;
          profile_picture: string | null;
          username: string;
        };
        Insert: {
          first_name: string;
          id: string;
          last_name: string;
          profile_picture?: string | null;
          username: string;
        };
        Update: {
          first_name?: string;
          id?: string;
          last_name?: string;
          profile_picture?: string | null;
          username?: string;
        };
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
}
