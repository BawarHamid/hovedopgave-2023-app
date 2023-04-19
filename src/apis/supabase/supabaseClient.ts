import { createClient } from "@supabase/supabase-js";
import { Database } from "../../types/database.types";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// // Gives the type of single elements from an array
// export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

// // Typed Usage Example
// type Profiles = Awaited<ReturnType<typeof fetchProfile>>['data'];
// type Profile = ArrayElement<Profiles>;
// const fetchProfile = async () => await supabase.from('profile').select('*');
