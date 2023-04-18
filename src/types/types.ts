import { Database } from "./database.types";

type Db = Database["public"]["Tables"];

export type Profile = Db["profile"]["Row"];
export type ProfileInsert = Db["profile"]["Insert"];
export type ProfileUpdate = Db["profile"]["Update"];
