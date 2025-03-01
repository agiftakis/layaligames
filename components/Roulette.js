"use client";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
//import { Mesh } from "three";

export default function Roulette({ userId }) {
    const wheelRef = useRef();
    const [/*coins,*/ setCoins] = useState(0);

    const spin = async () => {
        const bet = 10;
        const win = Math.random() > 0.5;
        const change = win ? 30 : -bet;
        const res = await fetch("/api/coins", {
            method: "POST",
            body: JSON.stringify({ user_id: userId, change }),
        });
        const { balance } = await res.json();
        setCoins(balance);
    };

    return (
        <div>
            <Canvas>
                <mesh ref={wheelRef}>
                    <cylinderGeometry args={[5, 5, 1, 32]} />
                    <meshStandardMaterial color="red" />
                </mesh>
                <ambientLight />
            </Canvas>
            <button onClick={spin}>Spin Roulette (10 coins)</button>
        </div>
    );
}