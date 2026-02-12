import supabase, { supabaseUrl } from "./supabase";

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  let query = supabase.from("cabins");

  // a). Create a new cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  // b). Update an existing cabin
  else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created/updated");
  }

  if (hasImagePath) {
    return data;
  }

  // Uploading image
  const { error: storageError } = await supabase.storage
    .from("cabins-images")
    .update(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Cabins not loaded");
  }
  return data;
}

export async function deleteCabin(cabinId) {
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);
  if (error) {
    console.error(error);
    throw new Error("Cabin not deleted");
  }
}
