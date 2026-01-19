import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error(`Could not fetch cabins - ${error.message}`);
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    throw new Error(`Could not delete cabin - ${error.message}`);
  }
  return data;
};

export const createCabin = async (cabin) => {
  // https://wioeoqkvzdrzynpavdvv.supabase.co/storage/v1/object/public/cabin-images/
  const randomNum = String(Math.random()).replace("0.", "");
  const imageName = `${randomNum}-${cabin.image_link.name}`.replaceAll("/", "");

  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image_link: imageUrl }])
    .select();
  if (error) {
    throw new Error(`Could not create cabin - ${error.message}`);
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image_link);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      `Could not create cabin due to image - ${storageError.message}`,
    );
  }

  return data;
};
