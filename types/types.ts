import { Database } from './database';

export type DbIngredient = Database['public']['Tables']['ingredients']['Row'];
export type DbRecipe = Database['public']['Tables']['recipes']['Row'];