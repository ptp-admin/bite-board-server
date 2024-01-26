create or replace view "public"."shopping_list_joined" as  SELECT sl.id,
    sl.name,
    sum(slr.servings) AS servings
   FROM (shopping_list sl
     LEFT JOIN shopping_list_recipe slr ON ((sl.id = slr.shopping_list_id)))
  GROUP BY sl.id;


create or replace view "public"."shopping_list_recipe_joined" as  SELECT r.id,
    r.name,
    slr.servings,
    r.servings AS "recipeServings"
   FROM (shopping_list_recipe slr
     LEFT JOIN recipe r ON ((slr.recipe_id = r.id)));



