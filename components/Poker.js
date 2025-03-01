"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Poker({ userId }) {
    const [/*coins,*/ setCoins] = useState(0);

    const play = async () => {
        const bet = 10;
        const win = Math.random() > 0.5; // Simple RNG
        const change = win ? 20 : -bet;
        const res = await fetch("/api/coins", {
            method: "POST",
            body: JSON.stringify({ user_id: userId, change }),
        });
        const { balance } = await res.json();
        setCoins(balance);
    };

    return (
        <div>
            <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                Card 1
            </motion.div>
            <button onClick={play}>Play Poker (10 coins)</button>
        </div>
    );
}