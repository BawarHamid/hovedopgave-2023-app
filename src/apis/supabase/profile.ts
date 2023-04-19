import { ProfileInsert } from "../../types/types";
import { uploadProfilePicture } from "../services/uploadFile.service";
import { supabase } from "./supabaseClient";

export const insertNewProfile = async (profile: ProfileInsert) =>
  await supabase.from("profile").insert(profile);

// export const updateAProfile = async (profile: ProfileUpdate) => await supabase_.from('profile').update(profile);

export const getProfile = async (uid: string) =>
  await supabase.from("profile").select("*").eq("id", uid).single();

export const updateProfile = async (
  uid: string,
  firstname: string,
  lastname: string,
  username: string,
  file?: File
) => {
  // upload file if there is one
  let newAvatarURL;
  if (file) {
    const uploadData = await uploadProfilePicture(file);
    if (uploadData && uploadData.error) throw new Error(uploadData.error);
    if (uploadData && uploadData.data) newAvatarURL = uploadData.data.url;
  }

  // update profile
  const { error: updateProfileError } = await supabase
    .from("profile")
    .update({
      first_name: firstname,
      last_name: lastname,
      username: username,
      profile_picture: newAvatarURL,
    })
    .eq("id", uid)
    .single();

  if (updateProfileError) throw new Error(updateProfileError.message);
};

export const checkUserHasProfile = async (uid: string) => {
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", uid);
  if (error) throw error;
  return data.length > 0;
};
