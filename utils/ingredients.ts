import { PostgrestError } from "@supabase/supabase-js";
import { DbIngredient } from "../types/types";
import { supabase } from "./database";

export const getIngredients = async (): Promise<DbIngredient[] | PostgrestError> => {
  const { data, error } = await supabase.from('ingredients').select('*');
  
  if (data) return data;

  console.error(error);
  return error;
};

export const getIngredientById = async (id: string): Promise<DbIngredient | PostgrestError> => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .eq('id', id);

  if (data) return data[0];

  console.error(error);
  return error;
}