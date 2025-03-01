import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://enhhoiwwqhngfvveqqib.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaGhvaXd3cWhuZ2Z2dmVxcWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4MTAxNzIsImV4cCI6MjA1NjM4NjE3Mn0.NCiqY__Z_ClHlNlEW9wTi86s8MQj4PapoF4oZ6VW2mw";
export const supabase = createClient(supabaseUrl, supabaseKey);