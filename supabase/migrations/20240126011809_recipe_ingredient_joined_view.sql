create or replace view "public"."recipe_ingredient_joined" as  SELECT i.id,
    i.name,
    i.category,
    i.cost_per AS "costPer",
    i.number_of AS "numberOf",
    i.measurement_unit AS "measurementUnit",
    ri.recipe_id AS "recipeId",
    ri.number_of AS "recipeNumberOf",
    ri.measurement_unit AS "recipeMeasurementUnit"
   FROM (ingredient i
     LEFT JOIN recipe_ingredient ri ON ((i.id = ri.ingredient_id)));



