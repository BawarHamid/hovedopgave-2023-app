import { DishInsert } from "../../types/types";
// import { uploadProfilePicture } from "../services/uploadFile.service";
import { supabase } from "./supabaseClient";

export const insertNewDish = async (dish: DishInsert) =>
  await supabase.from("dish").insert(dish);

export const getAllDishes = async () => await supabase.from("dish").select("*");
