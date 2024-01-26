import { RecipeIngredient } from './data';
import { Database } from './database';

// Database types
export type Ingredient = Database['public']['Tables']['ingredients']['Row'];
export type Recipe = Database['public']['Tables']['recipes']['Row'];

// DTO (Data Transfer Object) types
export interface RecipeDto {
  id: number;
  name: string;
  method?: string;
  servings?: number;
  recipeIngredients?: RecipeIngredient[];
  costPerServe?: number;
  costAccuracy?: number;
}

export interface CostPerServeAccumulator {
  total: number;
  costedIngredientsCount: number;
}

export interface RecipeCostPerServe {
  costPerServe?: number;
  costAccuracy?: number;
}