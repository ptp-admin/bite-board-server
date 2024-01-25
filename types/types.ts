import { Database } from './database';

export type Ingredient = Database['public']['Tables']['ingredients']['Row'];
export type Recipe = Database['public']['Tables']['recipes']['Row'];

export interface CostPerServeAccumulator {
  total: number;
  costedIngredientsCount: number;
}

export interface RecipeCostPerServe {
  costPerServe?: number;
  costAccuracy?: number;
}