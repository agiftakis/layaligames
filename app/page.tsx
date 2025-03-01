"use client";
import { useState } from "react";
import Auth from "@/components/Auth";
import CharityDashboard from "@/components/CharityDashboard";
import Poker from "@/components/Poker";
import Roulette from "@/components/Roulette";
import FlappyBird from "@/components/FlappyBird";

export default function Home() {
  const [userId, setUserId] = useState(null);

  return (
    <div className="p-4">
      {!userId ? (
        <Auth setUserId={setUserId} />
      ) : (
        <>
          <CharityDashboard userId={userId} />
          <Poker userId={userId} />
          <Roulette userId={userId} />
          <FlappyBird userId={userId} />
        </>
      )}
    </div>
  );
}