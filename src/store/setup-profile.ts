import { create } from "zustand";

type ProfileSetupStore = {
  first_name: string;
  last_name: string;
  username: string;
  profile_picture: string;
  setProfileFull: (
    first_name: string,
    last_name: string,
    username: string,
    profile_picture: string
  ) => void;
};

export const useProfileSetup = create<ProfileSetupStore>()((set) => ({
  first_name: "",
  last_name: "",
  username: "",
  profile_picture: "",
  setProfileFull: (first_name, last_name, username, profile_picture) =>
    set({ first_name, last_name, username, profile_picture }),
}));
