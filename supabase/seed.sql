-- Seed the ingredient table
INSERT INTO public.ingredient (id, name, category, cost_per, number_of, measurement_unit)
VALUES 
  (uuid_generate_v4(), 'Potatoes', 'Vegetables', 3.50, 1, 'kg'),
  (uuid_generate_v4(), 'Apricots', 'Fruit', 4.13, 1, 'lb'),
  (uuid_generate_v4(), 'Organic Wholemeal Flour', 'Baking', 5.69, 500, 'g'),
  (uuid_generate_v4(), 'Vanilla Bean Paste', 'Baking', 14.00, 1, 'tsp'),
  (uuid_generate_v4(), 'Kangaroo Mince', 'Meat', 12.50, 1, 'kg');

-- Seed the recipe table
INSERT INTO public.recipe (id, name, method, servings)
VALUES 
  (uuid_generate_v4(), 'Recipe 1', 'Method 1', 10),
  (uuid_generate_v4(), 'Recipe 2', 'Method 2', 8),
  (uuid_generate_v4(), 'Recipe 3', 'Method 3', 6),
  (uuid_generate_v4(), 'Recipe 4', 'Method 4', 10),
  (uuid_generate_v4(), 'Recipe 5', 'Method 5', 6);

-- Seed the recipe_ingredient table
INSERT INTO public.recipe_ingredient (recipe_id, ingredient_id, number_of, measurement_unit)
VALUES 
  ((SELECT id FROM public.recipe LIMIT 1), (SELECT id FROM public.ingredient LIMIT 1), 500, 'g'),
  ((SELECT id FROM public.recipe LIMIT 1), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 1), 1, 'kg'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 1), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 1), 2, 'kg'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 3), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 2), 4, 'cup'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 2), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 2), 1, 'kg'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 3), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 3), 4, 'cup'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 4), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 4), 500, 'g'),
  ((SELECT id FROM public.recipe LIMIT 1 OFFSET 2), (SELECT id FROM public.ingredient LIMIT 1 OFFSET 4), 500, 'g');

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
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 1), (SELECT id FROM public.recipe LIMIT 1), 2),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 2), (SELECT id FROM public.recipe LIMIT 1 OFFSET 3), 3),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 2), (SELECT id FROM public.recipe LIMIT 1 OFFSET 2), 3),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 3), (SELECT id FROM public.recipe LIMIT 1 OFFSET 2), 4),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 3), (SELECT id FROM public.recipe LIMIT 1 OFFSET 3), 4),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 3), (SELECT id FROM public.recipe LIMIT 1 OFFSET 4), 4),
  ((SELECT id FROM public.shopping_list LIMIT 1 OFFSET 4), (SELECT id FROM public.recipe LIMIT 1 OFFSET 4), 5);