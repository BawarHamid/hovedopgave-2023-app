import { DishInsert } from "../../types/types";
// import { uploadProfilePicture } from "../services/uploadFile.service";
import { supabase } from "./supabaseClient";

export const insertNewDish = async (dish: DishInsert) =>
  await supabase.from("dish").insert(dish);

export const getAllDishes = async () => await supabase.from("dish").select("*");

export const getDishByID = async (id: number) =>
  await supabase.from("dish").select("*").eq("id", id).single();

export const DeleteDishByID = async (id: number) =>
  await supabase.from("dish").delete().eq("id", id);
