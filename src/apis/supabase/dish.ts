import { DishInsert } from "../../types/types";
// import { uploadProfilePicture } from "../services/uploadFile.service";
import { supabase } from "./supabaseClient";

export const insertNewDish = async (dish: DishInsert) =>
  await supabase.from("dish").insert(dish);

export const getDish = async (uid: string) =>
  await supabase.from("dish").select("*").eq("profile_fk", uid).single();
