"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Auth({ setUserId }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const signup = async () => {
        setErrorMessage("");
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const { data, error } = await res.json();
            if (!error) {
                console.log("Signup successful:", data);
                setUserId(data.user.id);
            } else {
                throw new Error(typeof error === "string" ? error : error.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err.message);
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async () => {
        setErrorMessage("");
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const { data, error } = await res.json();
            if (!error) {
                console.log("Login successful:", data);
                setUserId(data.user.id);
            } else {
                throw new Error(typeof error === "string" ? error : error.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err.message);
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f3f4f6" }}>
            <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "100%", maxWidth: "28rem" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", textAlign: "center", color: "#1f2937", marginBottom: "1.5rem" }}>
                    Welcome to Layali Games
                </h1>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label htmlFor="email" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            style={{ marginTop: "0.25rem", width: "100%", padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", outline: "none" }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            style={{ marginTop: "0.25rem", width: "100%", padding: "0.5rem 1rem", border: "1px solid #d1d5db", borderRadius: "0.375rem", outline: "none" }}
                        />
                    </div>
                    {errorMessage && (
                        <p style={{ color: "#ef4444", fontSize: "0.875rem", textAlign: "center" }}>{errorMessage}</p>
                    )}
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button
                            onClick={signup}
                            disabled={isLoading}
                            style={{
                                width: "100%", padding: "0.5rem 1rem", backgroundColor: "#2563eb", color: "white", borderRadius: "0.375rem",
                                border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? "0.5" : "1"
                            }}
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                        <button
                            onClick={login}
                            disabled={isLoading}
                            style={{
                                width: "100%", padding: "0.5rem 1rem", backgroundColor: "#16a34a", color: "white", borderRadius: "0.375rem",
                                border: "none", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? "0.5" : "1"
                            }}
                        >
                            {isLoading ? "Logging In..." : "Login"}
                        </button>
                    </div>
                </div>
                <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6b7280", textAlign: "center" }}>
                    For Gmail users: Use an existing account. Passwords must include letters and be 6+ characters.
                </p>
            </div>
        </div>
    );
}