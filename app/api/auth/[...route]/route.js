import { supabase } from "@/lib/supabase";

export async function POST(req) {
    try {
        const url = new URL(req.url);
        const route = url.pathname.split("/").slice(3);
        const { email, password } = await req.json();

        console.log(`Processing ${route[0]} for email: ${email}`); // Debug log

        if (route[0] === "signup") {
            const { data, error } = await supabase.auth.signUp({ email, password });
            console.log("Signup response:", { data, error }); // Log raw response
            if (error) throw error; // Ensure error is caught
            await supabase.from("users").insert({ email, user_id: data.user.id, coin_balance: 0 });
            return new Response(JSON.stringify({ data, error: null }), { status: 200 });
        }

        if (route[0] === "login") {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            console.log("Login response:", { data, error });
            if (error) throw error;
            return new Response(JSON.stringify({ data, error: null }), { status: 200 });
        }

        return new Response(JSON.stringify({ error: "Invalid route" }), { status: 404 });
    } catch (error) {
        console.error("API error:", error.message || error); // Detailed error log
        return new Response(JSON.stringify({ error: error.message || "Something went wrong" }), { status: 400 });
    }
}

export async function GET() {
    return new Response(JSON.stringify({ message: "Use POST for signup/login" }), { status: 405 });
}