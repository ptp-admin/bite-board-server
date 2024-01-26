import { PostgrestError } from "@supabase/supabase-js";
import { Ingredient } from "../types/types";
import { supabase } from "./database";
import { logAndReturn } from "./error";

export const getIngredients = async (): Promise<Ingredient[] | PostgrestError> => {
  const { data, error } = await supabase.from('ingredient').select('*');
  if (error) return logAndReturn(error);

  return data;
};

export const getIngredientById = async (id: string): Promise<Ingredient | PostgrestError> => {
  const { data, error } = await supabase
    .from('ingredient')
    .select('*')
    .eq('id', id)
  if (error) return logAndReturn(error);

  return data[0];
}