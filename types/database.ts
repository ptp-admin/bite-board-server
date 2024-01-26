export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      ingredient: {
        Row: {
          category: string | null
          cost_per: number | null
          id: string
          measurement_unit: string | null
          name: string
          number_of: number | null
        }
        Insert: {
          category?: string | null
          cost_per?: number | null
          id?: string
          measurement_unit?: string | null
          name: string
          number_of?: number | null
        }
        Update: {
          category?: string | null
          cost_per?: number | null
          id?: string
          measurement_unit?: string | null
          name?: string
          number_of?: number | null
        }
        Relationships: []
      }
      recipe: {
        Row: {
          id: string
          method: string | null
          name: string
          servings: number | null
        }
        Insert: {
          id?: string
          method?: string | null
          name: string
          servings?: number | null
        }
        Update: {
          id?: string
          method?: string | null
          name?: string
          servings?: number | null
        }
        Relationships: []
      }
      recipe_ingredient: {
        Row: {
          ingredient_id: string
          measurement_unit: string | null
          number_of: number | null
          recipe_id: string
        }
        Insert: {
          ingredient_id: string
          measurement_unit?: string | null
          number_of?: number | null
          recipe_id: string
        }
        Update: {
          ingredient_id?: string
          measurement_unit?: string | null
          number_of?: number | null
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredient_ingredient_id_fkey"
            columns: ["ingredient_id"]
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredient_ingredient_id_fkey"
            columns: ["ingredient_id"]
            referencedRelation: "recipe_ingredient_joined"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredient_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredient_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "shopping_list_recipe_joined"
            referencedColumns: ["recipeId"]
          }
        ]
      }
      shopping_list: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      shopping_list_recipe: {
        Row: {
          recipe_id: string
          servings: number
          shopping_list_id: string
        }
        Insert: {
          recipe_id: string
          servings: number
          shopping_list_id: string
        }
        Update: {
          recipe_id?: string
          servings?: number
          shopping_list_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_recipe_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_list_recipe_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "shopping_list_recipe_joined"
            referencedColumns: ["recipeId"]
          },
          {
            foreignKeyName: "shopping_list_recipe_shopping_list_id_fkey"
            columns: ["shopping_list_id"]
            referencedRelation: "shopping_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_list_recipe_shopping_list_id_fkey"
            columns: ["shopping_list_id"]
            referencedRelation: "shopping_list_joined"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      recipe_ingredient_joined: {
        Row: {
          category: string | null
          costPer: number | null
          id: string | null
          measurementUnit: string | null
          name: string | null
          numberOf: number | null
          recipeId: string | null
          recipeMeasurementUnit: string | null
          recipeNumberOf: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredient_recipe_id_fkey"
            columns: ["recipeId"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredient_recipe_id_fkey"
            columns: ["recipeId"]
            referencedRelation: "shopping_list_recipe_joined"
            referencedColumns: ["recipeId"]
          }
        ]
      }
      shopping_list_joined: {
        Row: {
          id: string | null
          name: string | null
          servings: number | null
        }
        Relationships: []
      }
      shopping_list_recipe_joined: {
        Row: {
          name: string | null
          recipeId: string | null
          recipeServings: number | null
          scaleMultiplier: number | null
          servings: number | null
          shoppingListId: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_recipe_shopping_list_id_fkey"
            columns: ["shoppingListId"]
            referencedRelation: "shopping_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_list_recipe_shopping_list_id_fkey"
            columns: ["shoppingListId"]
            referencedRelation: "shopping_list_joined"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

