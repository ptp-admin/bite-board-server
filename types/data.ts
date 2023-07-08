export interface DbIngredient {
  id?: number;
  name: string;
  category: string;
  cost_per: number;
  number_of: number;
  measurement_unit?: string;
}

export interface Ingredient {
  id?: number;
  name: string;
  category?: string;
  costPer?: number;
  numberOf?: number;
  measurementUnit?: string;
}

export interface DbRecipeIngredient {
  ingredient_id: number;
  recipe_id: number;
  number_of?: number;
  measurement_unit?: string;
}

export interface DbRecipeIngredientDetailed extends DbRecipeIngredient {
  name: string;
  cost_per: number;
  recipe_number_of: number;
  recipe_measurement_unit: string;
}

export interface RecipeIngredient extends Ingredient {
  recipeNumberOf?: number;
  recipeMeasurementUnit?: string;
  recipeId?: number;
  derivedCost?: number;
}

export interface Recipe {
  id: number;
  name: string;
  method?: string;
  servings?: number;
  recipeIngredients?: RecipeIngredient[];
  costPerServe?: number;
}
