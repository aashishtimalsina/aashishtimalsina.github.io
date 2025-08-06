import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
const SUPABASE_URL = "https://kbpdsbdkvprjiifcwzgs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticGRzYmRrdnByamlpZmN3emdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4MDM3OTQsImV4cCI6MjA1ODM3OTc5NH0.0ouXplWBYoY45sE3DO9aT58cSvzTW0A5gGgGA_IsPCs";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);