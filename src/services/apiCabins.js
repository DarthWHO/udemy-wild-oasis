import supabase, { supabaseUrl } from "./supabase";

const generateImageData = (imageFile) => {
  if (typeof imageFile === "string") {
    return { imageName: null, imageUrl: imageFile };
  }

  const randomNum = String(Math.random()).replace("0.", "");
  const imageName = `${randomNum}-${imageFile.name}`.replaceAll("/", "");
  const imageUrl = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  return { imageName, imageUrl };
};

const uploadImage = async (imageName, id, imageLink) => {
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, imageLink);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", id);
    throw new Error(
      `Could not create cabin due to image - ${storageError.message}`,
    );
  }
};

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
  const { imageName, imageUrl } = generateImageData(cabin.image_link);

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...cabin, image_link: imageUrl }])
    .select();
  if (error) {
    throw new Error(`Could not create cabin - ${error.message}`);
  }

  await uploadImage(imageName, cabin.id, cabin.image_link);

  return data;
};

export const editCabin = async (cabin, id) => {
  const { imageName, imageUrl } = generateImageData(cabin.image_link);

  const { data, error } = await supabase
    .from("cabins")
    .update([{ ...cabin, image_link: imageUrl }])
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(`Could not update cabin - ${error.message}`);
  }

  if (imageName) {
    await uploadImage(imageName, id, cabin.image_link);
  }

  return data;
};
