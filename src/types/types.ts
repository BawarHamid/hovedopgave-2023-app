import { Database } from "./database.types";

type Db = Database["public"]["Tables"];

export type Profile = Db["profile"]["Row"];
export type ProfileInsert = Db["profile"]["Insert"];
export type ProfileUpdate = Db["profile"]["Update"];
export type Dish = Db["dish"]["Row"];
export type DishInsert = Db["dish"]["Insert"];
export type DishUpdate = Db["dish"]["Update"];
export type ProfileWithDish = Profile & {
  dish: Dish[];
};
