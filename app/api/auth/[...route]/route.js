import { supabase } from "@/lib/supabase";

export async function POST(req) {
    const url = new URL(req.url);
    const route = url.pathname.split("/").slice(3); // Extract segments after /api/auth/
    const { email, password } = await req.json();

    if (route[0] === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (!error) {
            await supabase.from("users").insert({ email, user_id: data.user.id, coin_balance: 0 });
        }
        return new Response(JSON.stringify({ data, error }), { status: error ? 400 : 200 });
    }

    if (route[0] === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        return new Response(JSON.stringify({ data, error }), { status: error ? 400 : 200 });
    }

    return new Response(JSON.stringify({ error: "Invalid route" }), { status: 404 });
}
// export async function GET() {
//     return new Response(JSON.stringify({ message: "Use POST for signup/login" }), { status: 405 });
// }