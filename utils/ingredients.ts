import { PostgrestError } from "@supabase/supabase-js";
import { Ingredient } from "../types/types";
import { supabase } from "./database";

export const getIngredients = async (): Promise<Ingredient[] | PostgrestError> => {
  const { data, error } = await supabase.from('ingredient').select('*');
  
  if (data) return data;

  console.error(error);
  return error;
};

export const getIngredientById = async (id: string): Promise<Ingredient | PostgrestError> => {
  const { data, error } = await supabase
    .from('ingredient')
    .select('*')
    .eq('id', id)

  if (data) return data[0];

  console.error(error);
  return error;
}