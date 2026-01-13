import supabase from "./supabase";

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
  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: cabin.name,
        max_capacity: cabin.max_capacity,
        regular_price: cabin.regular_price,
        discount: cabin.discount,
        description: cabin.description,
        image_link: cabin.image_link,
      },
    ])
    .select();
  if (error) {
    throw new Error(`Could not create cabin - ${error.message}`);
  }

  return data;
};
