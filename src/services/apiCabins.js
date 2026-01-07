import supabase from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("Error fetching cabins:", error);
    throw new Error("Could not fetch cabins");
  }
  return data;
};
