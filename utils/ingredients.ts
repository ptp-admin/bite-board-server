import { PostgrestError } from '@supabase/supabase-js';
import { Ingredient, IngredientDto } from '../types/types';
import { supabase } from './database';
import { logAndReturn } from './error';

export const getIngredients = async (): Promise<
  IngredientDto[] | PostgrestError
> => {
  const { data: ingredients, error } = await supabase
    .from('ingredient')
    .select('*');
  if (error) return logAndReturn(error);

  return ingredients.map(
    ({
      cost_per,
      measurement_unit,
      number_of,
      ...rest
    }: Ingredient): IngredientDto => {
      return {
        ...rest,
        costPer: cost_per,
        measurementUnit: measurement_unit,
        numberOf: number_of,
      };
    }
  );
};

export const getIngredientById = async (
  id: string
): Promise<IngredientDto | PostgrestError> => {
  const { data: ingredient, error } = await supabase
    .from('ingredient')
    .select('*')
    .eq('id', id);
  if (error) return logAndReturn(error);
  const { cost_per, measurement_unit, number_of, ...rest } = ingredient[0];
  return {
    ...rest,
    costPer: cost_per,
    measurementUnit: measurement_unit,
    numberOf: number_of,
  };
};
