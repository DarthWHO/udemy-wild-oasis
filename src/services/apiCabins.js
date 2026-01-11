import supabase from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("Error fetching cabins:", error);
    throw new Error("Could not fetch cabins");
  }
  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log("Error deleting cabin:", error);
    throw new Error("Could not delete cabin");
  }
  return data;
};
