create table "public"."ingredients" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "category" text not null,
    "recipe_number_of" integer,
    "recipe_measurement_unit" text,
    "recipe_id" uuid
);


create table "public"."recipe_ingredients" (
    "id" uuid not null default uuid_generate_v4(),
    "recipe_id" uuid,
    "ingredient_id" uuid,
    "derived_cost" numeric(10,2),
    "number_of" integer
);


create table "public"."recipes" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP
);


create table "public"."shopping_list_recipes" (
    "id" uuid not null default uuid_generate_v4(),
    "shopping_list_id" uuid,
    "recipe_id" uuid
);


create table "public"."shopping_lists" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP
);


CREATE UNIQUE INDEX ingredients_pkey ON public.ingredients USING btree (id);

CREATE UNIQUE INDEX recipe_ingredients_pkey ON public.recipe_ingredients USING btree (id);

CREATE UNIQUE INDEX recipes_pkey ON public.recipes USING btree (id);

CREATE UNIQUE INDEX shopping_list_recipes_pkey ON public.shopping_list_recipes USING btree (id);

CREATE UNIQUE INDEX shopping_lists_pkey ON public.shopping_lists USING btree (id);

alter table "public"."ingredients" add constraint "ingredients_pkey" PRIMARY KEY using index "ingredients_pkey";

alter table "public"."recipe_ingredients" add constraint "recipe_ingredients_pkey" PRIMARY KEY using index "recipe_ingredients_pkey";

alter table "public"."recipes" add constraint "recipes_pkey" PRIMARY KEY using index "recipes_pkey";

alter table "public"."shopping_list_recipes" add constraint "shopping_list_recipes_pkey" PRIMARY KEY using index "shopping_list_recipes_pkey";

alter table "public"."shopping_lists" add constraint "shopping_lists_pkey" PRIMARY KEY using index "shopping_lists_pkey";

alter table "public"."ingredients" add constraint "fk_ingredients_recipes" FOREIGN KEY (recipe_id) REFERENCES recipes(id) not valid;

alter table "public"."ingredients" validate constraint "fk_ingredients_recipes";

alter table "public"."recipe_ingredients" add constraint "recipe_ingredients_ingredient_id_fkey" FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) not valid;

alter table "public"."recipe_ingredients" validate constraint "recipe_ingredients_ingredient_id_fkey";

alter table "public"."recipe_ingredients" add constraint "recipe_ingredients_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(id) not valid;

alter table "public"."recipe_ingredients" validate constraint "recipe_ingredients_recipe_id_fkey";

alter table "public"."shopping_list_recipes" add constraint "shopping_list_recipes_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(id) not valid;

alter table "public"."shopping_list_recipes" validate constraint "shopping_list_recipes_recipe_id_fkey";

alter table "public"."shopping_list_recipes" add constraint "shopping_list_recipes_shopping_list_id_fkey" FOREIGN KEY (shopping_list_id) REFERENCES shopping_lists(id) not valid;

alter table "public"."shopping_list_recipes" validate constraint "shopping_list_recipes_shopping_list_id_fkey";


