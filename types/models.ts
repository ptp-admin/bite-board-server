interface Ingredient {
	id: number,
	name: string, 
	category: string,
	cost_per: number,
	number_of: number,
	measurement_unit: string
}

interface RecipeIngredient extends Ingredient {
	derived_cost: number,
	ingredient_cost_per: number
}

interface Recipe {
	id: 1,
	name: string,
	method: string,
	servings: number,
	ingredients: RecipeIngredient[]
}