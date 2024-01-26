import { PostgrestError } from "@supabase/supabase-js";

export const logAndReturn = (error: PostgrestError, returnValue?: any) => {
  console.log(error);
  return returnValue ?? error;
};