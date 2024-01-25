create table "public"."ingredients" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "category" text,
    "cost_per" double precision,
    "number_of" numeric,
    "measurement_unit" text
);


create table "public"."recipe_ingredients" (
    "recipe_id" uuid not null,
    "ingredient_id" uuid not null,
    "number_of" numeric(10,2),
    "measurement_unit" text
);


create table "public"."recipes" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "method" text,
    "servings" numeric
);


create table "public"."shopping_list_recipes" (
    "shopping_list_id" uuid not null,
    "recipe_id" uuid not null,
    "servings" numeric not null
);


create table "public"."shopping_lists" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP
);


CREATE UNIQUE INDEX ingredients_pkey ON public.ingredients USING btree (id);

CREATE UNIQUE INDEX recipe_ingredients_pkey ON public.recipe_ingredients USING btree (recipe_id, ingredient_id);

CREATE UNIQUE INDEX recipes_pkey ON public.recipes USING btree (id);

CREATE UNIQUE INDEX shopping_list_recipes_pkey ON public.shopping_list_recipes USING btree (shopping_list_id, recipe_id);

CREATE UNIQUE INDEX shopping_lists_pkey ON public.shopping_lists USING btree (id);

alter table "public"."ingredients" add constraint "ingredients_pkey" PRIMARY KEY using index "ingredients_pkey";

alter table "public"."recipe_ingredients" add constraint "recipe_ingredients_pkey" PRIMARY KEY using index "recipe_ingredients_pkey";

alter table "public"."recipes" add constraint "recipes_pkey" PRIMARY KEY using index "recipes_pkey";

alter table "public"."shopping_list_recipes" add constraint "shopping_list_recipes_pkey" PRIMARY KEY using index "shopping_list_recipes_pkey";

alter table "public"."shopping_lists" add constraint "shopping_lists_pkey" PRIMARY KEY using index "shopping_lists_pkey";

alter table "public"."recipe_ingredients" add constraint "recipe_ingredients_ingredient_id_fkey" FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) not valid;

alter table "public"."recipe_ingredients" validate constraint "recipe_ingredients_ingredient_id_fkey";

alter table "public"."recipe_ingredients" add constraint "recipe_ingredients_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(id) not valid;

alter table "public"."recipe_ingredients" validate constraint "recipe_ingredients_recipe_id_fkey";

alter table "public"."shopping_list_recipes" add constraint "shopping_list_recipes_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(id) not valid;

alter table "public"."shopping_list_recipes" validate constraint "shopping_list_recipes_recipe_id_fkey";

alter table "public"."shopping_list_recipes" add constraint "shopping_list_recipes_shopping_list_id_fkey" FOREIGN KEY (shopping_list_id) REFERENCES shopping_lists(id) not valid;

alter table "public"."shopping_list_recipes" validate constraint "shopping_list_recipes_shopping_list_id_fkey";


