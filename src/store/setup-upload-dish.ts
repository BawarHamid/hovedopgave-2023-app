import { create } from "zustand";

type CreateDishStore = {
  title: string;
  description: string;
  recipe: string;
  recipe_picture: string;
  profile_fk: string;

  setDishRecipe: (recipe: string) => void;

  setRecipePicture: (recipe_picture: string) => void;

  setDishInfo: (title: string, description: string, profile_fk: string) => void;
};

export const useDishSetup = create<CreateDishStore>()((set) => ({
  title: "",
  description: "",
  recipe: "",
  recipe_picture: "",
  profile_fk: "",

  setDishInfo: (title, description, profile_fk) =>
    set({ title, description, profile_fk }),
  setDishRecipe: (recipe) => set({ recipe }),
  setRecipePicture: (recipe_picture) => set({ recipe_picture }),
}));
