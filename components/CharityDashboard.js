"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function CharityDashboard({ userId }) {
    const [coinBalance, setCoinBalance] = useState(0);
    const [contribution, setContribution] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from("users").select("*").eq("user_id", userId).single();
            setCoinBalance(data.coin_balance);
            setContribution(data.total_spent); // Assuming all $ spent goes to charity
        };
        fetchData();
    }, [userId]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-blue-100 rounded">
            <h1 className="text-3xl font-bold">Your Coins: {coinBalance}</h1>
            <p>Charity Contribution: ${contribution.toFixed(2)}</p>
        </motion.div>
    );
}