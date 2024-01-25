-- Seed the recipes table
INSERT INTO recipes (id, name, created_at)
VALUES 
  (uuid_generate_v4(), 'Recipe 1', NOW()),
  (uuid_generate_v4(), 'Recipe 2', NOW()),
  (uuid_generate_v4(), 'Recipe 3', NOW()),
  (uuid_generate_v4(), 'Recipe 4', NOW()),
  (uuid_generate_v4(), 'Recipe 5', NOW());

-- Seed the ingredients table
INSERT INTO ingredients (id, name, category, recipe_number_of, recipe_measurement_unit, recipe_id)
VALUES 
  (uuid_generate_v4(), 'Ingredient 1', 'Category 1', 1, 'Unit 1', (SELECT id FROM recipes LIMIT 1)),
  (uuid_generate_v4(), 'Ingredient 2', 'Category 2', 2, 'Unit 2', (SELECT id FROM recipes LIMIT 1 OFFSET 1)),
  (uuid_generate_v4(), 'Ingredient 3', 'Category 3', 3, 'Unit 3', (SELECT id FROM recipes LIMIT 1 OFFSET 2)),
  (uuid_generate_v4(), 'Ingredient 4', 'Category 4', 4, 'Unit 4', (SELECT id FROM recipes LIMIT 1 OFFSET 3)),
  (uuid_generate_v4(), 'Ingredient 5', 'Category 5', 5, 'Unit 5', (SELECT id FROM recipes LIMIT 1 OFFSET 4));

-- Seed the shopping_lists table
INSERT INTO shopping_lists (id, name, created_at)
VALUES 
  (uuid_generate_v4(), 'Shopping List 1', NOW()),
  (uuid_generate_v4(), 'Shopping List 2', NOW()),
  (uuid_generate_v4(), 'Shopping List 3', NOW()),
  (uuid_generate_v4(), 'Shopping List 4', NOW()),
  (uuid_generate_v4(), 'Shopping List 5', NOW());

-- Seed the shopping_list_recipes table
INSERT INTO shopping_list_recipes (id, shopping_list_id, recipe_id)
VALUES 
  (uuid_generate_v4(), (SELECT id FROM shopping_lists LIMIT 1), (SELECT id FROM recipes LIMIT 1)),
  (uuid_generate_v4(), (SELECT id FROM shopping_lists LIMIT 1 OFFSET 1), (SELECT id FROM recipes LIMIT 1 OFFSET 1)),
  (uuid_generate_v4(), (SELECT id FROM shopping_lists LIMIT 1 OFFSET 2), (SELECT id FROM recipes LIMIT 1 OFFSET 2)),
  (uuid_generate_v4(), (SELECT id FROM shopping_lists LIMIT 1 OFFSET 3), (SELECT id FROM recipes LIMIT 1 OFFSET 3)),
  (uuid_generate_v4(), (SELECT id FROM shopping_lists LIMIT 1 OFFSET 4), (SELECT id FROM recipes LIMIT 1 OFFSET 4));

-- Seed the recipe_ingredients table
INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, derived_cost, number_of)
VALUES 
  (uuid_generate_v4(), (SELECT id FROM recipes LIMIT 1), (SELECT id FROM ingredients LIMIT 1), 1.00, 1),
  (uuid_generate_v4(), (SELECT id FROM recipes LIMIT 1 OFFSET 1), (SELECT id FROM ingredients LIMIT 1 OFFSET 1), 2.00, 2),
  (uuid_generate_v4(), (SELECT id FROM recipes LIMIT 1 OFFSET 2), (SELECT id FROM ingredients LIMIT 1 OFFSET 2), 3.00, 3),
  (uuid_generate_v4(), (SELECT id FROM recipes LIMIT 1 OFFSET 3), (SELECT id FROM ingredients LIMIT 1 OFFSET 3), 4.00, 4),
  (uuid_generate_v4(), (SELECT id FROM recipes LIMIT 1 OFFSET 4), (SELECT id FROM ingredients LIMIT 1 OFFSET 4), 5.00, 5);