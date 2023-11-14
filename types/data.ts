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
  category?: string;
}

export interface RecipeIngredient extends Ingredient {
  recipeNumberOf?: number;
  recipeMeasurementUnit?: string;
  recipeId?: number;
  derivedCost?: number;
}

export interface DbRecipe {
  id?: number;
  name: string;
  method?: string;
  servings?: number;
}

export interface Recipe {
  id: number;
  name: string;
  method?: string;
  servings?: number;
  recipeIngredients?: RecipeIngredient[];
  costPerServe?: number;
  costAccuracy?: number;
}

export interface DbShoppingListRecipe {
  shopping_list_id?: number;
  recipe_id: number;
  recipe_name: string;
  shopping_list_servings: number;
  recipe_servings: number;
}

export interface ShoppingListRecipe {
  shoppingListId?: number;
  recipeId: number;
  servings: number;
}

export interface ShoppingListRecipeResponse {
  id: number;
  name: string;
  servings: number;
  recipeServings: number;
}

export interface DbShoppingListIngredient {
  id: number;
  name: string;
  category?: string;
  derivedCost?: number;
  numberOf: number;
  unit: string;
  recipeId: number;
}

export interface ShoppingListIngredient {
  id: number;
  name: string;
  category?: string;
  derivedCost?: number;
  numberOf: number;
  unit: string;
  recipeIds: number[];
}

export interface DbShoppingList {
  id: number;
  name: string;
  created_at: Date;
}

export interface ShoppingList {
  id?: number;
  name: string;
  shoppingListRecipes?: ShoppingListRecipe[];
  recipes?: Recipe[];
  createdAt?: Date;
}

export interface ShoppingListWithRecipes {
  id: number;
  name: string;
  recipes: ShoppingListRecipeResponse[];
  recipeIds: number[];
  totalServings: number;
}

export interface ShippingListResponse {
  // something
}
