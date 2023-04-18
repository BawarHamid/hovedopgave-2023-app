import { nanoid } from "nanoid";
import { supabase } from "../supabase/supabaseClient";

const publicBucket = "foodzilla-bucket";

// TODO: maybe not finished.
export const uploadFile = async (folder: "profilePicture", file: File) => {
  const { data: userData } = await supabase.auth.getUser();
  const fileType = file.type.split("/")[1];
  if (userData.user) {
    const { data, error } = await supabase.storage
      .from(publicBucket)
      .upload(`${userData.user.id}/${folder}/${nanoid()}.${fileType}`, file);
    if (data) {
      const { data: image } = supabase.storage
        .from(publicBucket)
        .getPublicUrl(data?.path);
      return { data: { ...data, url: image.publicUrl }, error };
    }
  }
};

export const uploadProfilePicture = async (file: File) => {
  const { data: userData } = await supabase.auth.getUser();
  if (userData.user) {
    const { data, error } = await supabase.storage
      .from(publicBucket)
      .upload(`${userData.user.id}/profilePicture`, file, { upsert: true });
    if (data) {
      const { data: image } = supabase.storage
        .from(publicBucket)
        .getPublicUrl(data?.path);
      return { data: { ...data, url: image.publicUrl }, error };
    }
  }
};
