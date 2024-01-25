-- Seed the ingredient table
INSERT INTO public.ingredient (id, name, category, cost_per, number_of, measurement_unit)
VALUES 
  (uuid_generate_v4(), 'Ingredient 1', 'Category 1', 1.00, 1, 'Unit 1'),
  (uuid_generate_v4(), 'Ingredient 2', 'Category 2', 2.00, 2, 'Unit 2'),
  (uuid_generate_v4(), 'Ingredient 3', 'Category 3', 3.00, 3, 'Unit 3'),
  (uuid_generate_v4(), 'Ingredient 4', 'Category 4', 4.00, 4, 'Unit 4'),
  (uuid_generate_v4(), 'Ingredient 5', 'Category 5', 5.00, 5, 'Unit 5');

-- Seed the recipe table
INSERT INTO public.recipe (id, name, method, servings)
VALUES 
  (uuid_generate_v4(), 'Recipe 1', 'Method 1', 1),
  (uuid_generate_v4(), 'Recipe 2', 'Method 2', 2),
  (uuid_generate_v4(), 'Recipe 3', 'Method 3', 3),
  (uuid_generate_v4(), 'Recipe 4', 'Method 4', 4),
  (uuid_generate_v4(), 'Recipe 5', 'Method 5', 5);

-- Seed the recipe_ingredient table
INSERT INTO public.recipe_ingredient (recipe_id, ingredient_id, number_of, measurement_unit)
VALUES 
  ((SELECT id FROM public.recipe LIMIT 1), (SELECT id FROM public.ingredient LIMIT 1), 1, 'Unit 1'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 1), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 1), 2, 'Unit 2'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 2), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 2), 3, 'Unit 3'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 3), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 3), 4, 'Unit 4'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 4), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 4), 5, 'Unit 5');

-- Seed the shopping_list table
INSERT INTO public.shopping_list (id, name)
VALUES 
  (uuid_generate_v4(), 'Shopping List 1'),
  (uuid_generate_v4(), 'Shopping List 2'),
  (uuid_generate_v4(), 'Shopping List 3'),
  (uuid_generate_v4(), 'Shopping List 4'),
  (uuid_generate_v4(), 'Shopping List 5');

-- Seed the shopping_list_recipe table
INSERT INTO public.shopping_list_recipe (shopping_list_id, recipe_id, servings)
VALUES 
  ((SELECT id FROM public.shopping_list LIMIT 1), (SELECT id FROM public.recipe LIMIT 1), 1),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 1), (SELECT id FROM public.recipe LIMIT 1 OFFSET 1), 2),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 2), (SELECT id FROM public.recipe LIMIT 1 OFFSET 2), 3),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 3), (SELECT id FROM public.recipe LIMIT 1 OFFSET 3), 4),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 4), (SELECT id FROM public.recipe LIMIT 1 OFFSET 4), 5);