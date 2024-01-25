import { DbRecipeIngredientDetailed, RecipeIngredient } from "../types/data";
import { CostPerServeAccumulator, RecipeCostPerServe } from "../types/types";
const convert = require('convert-units');

export const deriveCost = ({
  recipe_measurement_unit,
  recipe_number_of,
  measurement_unit,
  number_of,
  cost_per,
}: DbRecipeIngredientDetailed) => {
  try {
    if (recipe_number_of && number_of && cost_per) {
      if (recipe_measurement_unit === measurement_unit)
        return (recipe_number_of / number_of) * cost_per;

      const scaleMulitplier = convert(1)
        .from(recipe_measurement_unit)
        .to(measurement_unit);
      return ((recipe_number_of * scaleMulitplier) / number_of) * cost_per;
    }

    return undefined;
  } catch (Error) {
    return undefined;
  }
};

export const costPerServe = (
  servings: number,
  recipe_ingredients: Array<RecipeIngredient>
): RecipeCostPerServe => {
  const { total, costedIngredientsCount } = recipe_ingredients.reduce(
    (
      { total, costedIngredientsCount }: CostPerServeAccumulator,
      ingredient
    ) => {
      return {
        total: total + (ingredient.derivedCost || 0),
        costedIngredientsCount: ingredient.derivedCost
          ? (costedIngredientsCount += 1)
          : costedIngredientsCount,
      };
    },
    { total: 0, costedIngredientsCount: 0 }
  );

  return {
    costPerServe: formatAsFloat2DecimalPlaces(total / servings),
    costAccuracy: formatAsFloat2DecimalPlaces(
      costedIngredientsCount / recipe_ingredients.length
    ),
  };
};

export const formatAsFloat2DecimalPlaces = (num: Number) => {
  if (!num) return 0;
  return Number(Math.round(parseFloat(num + 'e2')) + 'e-2');
};