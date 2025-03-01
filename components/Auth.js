"use client";
import { useState } from "react";
//import { supabase } from "@/lib/supabase";

export default function Auth({ setUserId }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const { data, error } = await res.json();
        if (!error) setUserId(data.user.id);
    };

    const login = async () => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        const { data, error } = await res.json();
        if (!error) setUserId(data.user.id);
    };

    return (
        <div>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            <button onClick={signup}>Sign Up</button>
            <button onClick={login}>Login</button>
        </div>
    );
}