create table "public"."ingredient" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "category" text,
    "cost_per" numeric(10,2),
    "number_of" numeric,
    "measurement_unit" text
);


create table "public"."recipe_ingredient" (
    "recipe_id" uuid not null,
    "ingredient_id" uuid not null,
    "number_of" numeric,
    "measurement_unit" text
);


create table "public"."recipe" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "method" text,
    "servings" numeric
);


create table "public"."shopping_list_recipe" (
    "shopping_list_id" uuid not null,
    "recipe_id" uuid not null,
    "servings" numeric not null
);


create table "public"."shopping_list" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP
);


CREATE UNIQUE INDEX ingredient_pkey ON public.ingredient USING btree (id);

CREATE UNIQUE INDEX recipe_ingredient_pkey ON public.recipe_ingredient USING btree (recipe_id, ingredient_id);

CREATE UNIQUE INDEX recipe_pkey ON public.recipe USING btree (id);

CREATE UNIQUE INDEX shopping_list_recipe_pkey ON public.shopping_list_recipe USING btree (shopping_list_id, recipe_id);

CREATE UNIQUE INDEX shopping_list_pkey ON public.shopping_list USING btree (id);

alter table "public"."ingredient" add constraint "ingredient_pkey" PRIMARY KEY using index "ingredient_pkey";

alter table "public"."recipe_ingredient" add constraint "recipe_ingredient_pkey" PRIMARY KEY using index "recipe_ingredient_pkey";

alter table "public"."recipe" add constraint "recipe_pkey" PRIMARY KEY using index "recipe_pkey";

alter table "public"."shopping_list_recipe" add constraint "shopping_list_recipe_pkey" PRIMARY KEY using index "shopping_list_recipe_pkey";

alter table "public"."shopping_list" add constraint "shopping_list_pkey" PRIMARY KEY using index "shopping_list_pkey";

alter table "public"."recipe_ingredient" add constraint "recipe_ingredient_ingredient_id_fkey" FOREIGN KEY (ingredient_id) REFERENCES ingredient(id) not valid;

alter table "public"."recipe_ingredient" validate constraint "recipe_ingredient_ingredient_id_fkey";

alter table "public"."recipe_ingredient" add constraint "recipe_ingredient_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipe(id) not valid;

alter table "public"."recipe_ingredient" validate constraint "recipe_ingredient_recipe_id_fkey";

alter table "public"."shopping_list_recipe" add constraint "shopping_list_recipe_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipe(id) not valid;

alter table "public"."shopping_list_recipe" validate constraint "shopping_list_recipe_recipe_id_fkey";

alter table "public"."shopping_list_recipe" add constraint "shopping_list_recipe_shopping_list_id_fkey" FOREIGN KEY (shopping_list_id) REFERENCES shopping_list(id) not valid;

alter table "public"."shopping_list_recipe" validate constraint "shopping_list_recipe_shopping_list_id_fkey";


