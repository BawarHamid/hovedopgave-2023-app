import { create } from "zustand";

type ProfileSetupStore = {
  first_name: string;
  last_name: string;
  username: string;
  profile_picture: string;

  setProfileInformation: (
    first_name: string,
    last_name: string,
    username: string
  ) => void;

  setProfilePicture: (profile_picture: string) => void;
};

export const useProfileSetup = create<ProfileSetupStore>()((set) => ({
  first_name: "",
  last_name: "",
  username: "",
  biography: "",
  profile_picture: "",
  setProfileInformation: (first_name, last_name, username) =>
    set({ first_name, last_name, username }),
  setProfilePicture: (profile_picture) => set({ profile_picture }),
}));
