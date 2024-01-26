import { RecipeIngredient } from './data';
import { Database } from './database';

// Database types
export type Ingredient = Database['public']['Tables']['ingredient']['Row'];
export type Recipe = Database['public']['Tables']['recipe']['Row'];

// DTO (Data Transfer Object) types
export interface IngredientDto {
  id?: number;
  name: string;
  category?: string;
  costPer?: number;
  numberOf?: number;
  measurementUnit?: string;
}
export interface RecipeIngredientDto extends IngredientDto {
  recipeNumberOf?: number;
  recipeMeasurementUnit?: string;
  recipeId?: number;
  derivedCost?: number;
}
export interface RecipeDto {
  id: number;
  name: string;
  method?: string;
  servings?: number;
  recipeIngredients?: RecipeIngredientDto[];
  costPerServe?: number;
  costAccuracy?: number;
}

// utility types
export interface CostPerServeAccumulator {
  total: number;
  costedIngredientsCount: number;
}
export interface RecipeCostPerServe {
  costPerServe?: number;
  costAccuracy?: number;
}