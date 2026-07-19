"use client";

import React, { useEffect, useRef } from "react";

interface DiaryParticlesProps {
  phase: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
  decay: number;
}

export default function DiaryParticles({ phase }: DiaryParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initial ambient dust particles
    const ambientCount = 35;
    for (let i = 0; i < ambientCount; i++) {
      particlesRef.current.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.3 - 0.1,
        alpha: Math.random() * 0.5 + 0.1,
        size: Math.random() * 2 + 1,
        color: "214, 189, 137", // Parchment gold
        decay: 0,
      });
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Apply decay for puff particles, loop ambient particles
        if (p.decay > 0) {
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }
        } else {
          // Ambient particles wrap around
          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -10 || p.x > canvas.width + 10) {
            p.x = Math.random() * canvas.width;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Trigger a puff of dust particles when landing
  useEffect(() => {
    if (phase === "landing") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Create a burst of dust/wood particles radiating outwards
      const puffCount = 80;
      for (let i = 0; i < puffCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particlesRef.current.push({
          x: centerX + (Math.random() - 0.5) * 400,
          y: centerY + 100, // around the bottom of the landing book
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.3 - 0.5, // expand flatly + rise
          alpha: Math.random() * 0.6 + 0.4,
          size: Math.random() * 3 + 1,
          color: "118, 83, 46", // Darker wood/dust brown
          decay: Math.random() * 0.015 + 0.01,
        });
      }
    }
  }, [phase]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[490]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
