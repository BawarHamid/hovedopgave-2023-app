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
      dish: {
        Row: {
          description: string;
          id: number;
          profile_fk: string;
          recipe: string;
          recipe_picture: string;
          title: string;
        };
        Insert: {
          description: string;
          id?: number;
          profile_fk: string;
          recipe: string;
          recipe_picture: string;
          title: string;
        };
        Update: {
          description?: string;
          id?: number;
          profile_fk?: string;
          recipe?: string;
          recipe_picture?: string;
          title?: string;
        };
      };
      profile: {
        Row: {
          first_name: string;
          id: string;
          last_name: string;
          profile_picture: string;
          username: string;
        };
        Insert: {
          first_name: string;
          id: string;
          last_name: string;
          profile_picture: string;
          username: string;
        };
        Update: {
          first_name?: string;
          id?: string;
          last_name?: string;
          profile_picture?: string;
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
