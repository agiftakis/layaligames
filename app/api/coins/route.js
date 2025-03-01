import { supabase } from "@/lib/supabase";

export async function POST(req) {
    const { user_id, change } = await req.json();
    const { data, error } = await supabase
        .from("users")
        .select("coin_balance")
        .eq("user_id", user_id)
        .single();

    if (!error) {
        const newBalance = Math.max(0, data.coin_balance + change); // Prevent negative balance
        await supabase.from("users").update({ coin_balance: newBalance }).eq("user_id", user_id);
        return new Response(JSON.stringify({ balance: newBalance }), { status: 200 });
    }
    return new Response(JSON.stringify({ error }), { status: 400 });
}