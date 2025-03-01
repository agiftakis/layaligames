"use client"; // Mark as client component
import { useState, useEffect, useRef } from "react";
//import { Game, Sprite } from "react-game-kit";
import p5 from "p5";

export default function FlappyBird({ userId }) {
    const [score, setScore] = useState(0);
    const canvasRef = useRef();

    useEffect(() => {
        console.log("Initializing p5.js for FlappyBird"); // Debug log
        const sketch = (p) => {
            let birdY = 300;
            let velocity = 0;
            let pipes = [];

            p.setup = () => {
                p.createCanvas(400, 600);
                pipes.push({ x: 400, gap: 200 });
            };

            p.draw = () => {
                p.background(220);
                birdY += velocity;
                velocity += 0.5;
                p.ellipse(50, birdY, 20, 20);

                pipes.forEach((pipe, i) => {
                    pipe.x -= 2;
                    p.rect(pipe.x, 0, 50, pipe.gap);
                    p.rect(pipe.x, pipe.gap + 150, 50, 600);
                    if (pipe.x < -50) pipes.splice(i, 1);
                    if (pipe.x === 50) setScore((s) => s + 1);
                });

                if (p.frameCount % 100 === 0) pipes.push({ x: 400, gap: p.random(100, 300) });
            };

            p.mousePressed = () => (velocity = -10);
        };

        const p5Instance = new p5(sketch, canvasRef.current);

        // Cleanup to avoid multiple instances
        return () => {
            p5Instance.remove();
            if (score > 0 && score % 10 === 0) {
                fetch("/api/coins", {
                    method: "POST",
                    body: JSON.stringify({ user_id: userId, change: score }),
                });
            }
        };
    }, [score, userId]);

    return (
        <div>
            <div ref={canvasRef} />
            <p>Score: {score}</p>
        </div>
    );
}