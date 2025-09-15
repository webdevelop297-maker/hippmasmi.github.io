// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fbiccnhleqbhsrjgmpgh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiaWNjbmhsZXFiaHNyamdtcGdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjY5MzUsImV4cCI6MjA3MzQ0MjkzNX0.riZBDDZxg4t9ixiSEw7QmM2XWXkTFWB3GpgihCaaAQY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
