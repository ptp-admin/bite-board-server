export interface DbIngredient {
	id?: number,
  name: string,
  category: string,
	cost_per: number,
  number_of: number,
  measurement_unit: string,
}

export interface Ingredient {
	id?: number,
	name: string,
	category: string,
	costPer: number,
	numberOf: number,
	measurementUnit: string,
}