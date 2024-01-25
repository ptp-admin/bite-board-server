import { Database } from './database';

export type Ingredient = Database['public']['Tables']['ingredients']['Row'];
export type Recipe = Database['public']['Tables']['recipes']['Row'];