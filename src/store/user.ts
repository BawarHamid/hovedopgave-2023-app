import { User } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthUserStore = {
  authUser: User | null;
  setAuthUser: (authUser: User) => void;
  resetAuthUser: () => void;
};

export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (authUser) => set({ authUser }),
      resetAuthUser: () => set({ authUser: null }),
    }),
    {
      name: "auth-user-storage",
    }
  )
);
