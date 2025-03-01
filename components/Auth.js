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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome to Layali Games</h1>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}
                    <div className="flex space-x-4">
                        <button
                            onClick={signup}
                            disabled={isLoading}
                            className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </button>
                        <button
                            onClick={login}
                            disabled={isLoading}
                            className={`w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {isLoading ? "Logging In..." : "Login"}
                        </button>
                    </div>
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center">
                    For Gmail users: Use an existing account. Passwords must include letters and be 6+ characters.
                </p>
            </div>
        </div>
    );
}