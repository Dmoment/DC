import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Floating code/math symbols
const symbols = ['{ }', '< />', '( )', '[ ]', '&&', '||', '=>', '::'];
const mathSymbols = ['\u222B', '\u2211', '\u221E', '\u03C0', '\u0394', '\u03BB', '\u2207', '\u2202'];

// Particle for the network effect
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function BauhausBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  const [isClient, setIsClient] = useState(false);
  const [binaryLines, setBinaryLines] = useState<string[]>([]);

  // Handle client-side only rendering to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setBinaryLines(
      Array.from({ length: 8 }, () =>
        Array.from({ length: 12 }, () => Math.round(Math.random())).join('')
      )
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 50;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let animationId: number;

    const animate = () => {
      if (!ctx || !canvas) return;

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);
      timeRef.current += 0.01;

      // Draw sine wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(200, 100, 80, 0.15)';
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 2) {
        const y = height * 0.3 + Math.sin(x * 0.01 + timeRef.current) * 40 + Math.sin(x * 0.02 + timeRef.current * 1.5) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw second wave (phase shifted)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(100, 100, 120, 0.1)';
      for (let x = 0; x < width; x += 2) {
        const y = height * 0.7 + Math.cos(x * 0.015 + timeRef.current * 0.8) * 30 + Math.sin(x * 0.008 + timeRef.current) * 50;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Lissajous curve
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(200, 100, 80, 0.08)';
      ctx.lineWidth = 1.5;
      const centerX = width * 0.75;
      const centerY = height * 0.5;
      const a = 3, b = 4;
      for (let t = 0; t < Math.PI * 2; t += 0.02) {
        const x = centerX + Math.sin(a * t + timeRef.current) * 80;
        const y = centerY + Math.sin(b * t) * 80;
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw particles and connections
      const particles = particlesRef.current;
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(60, 60, 70, 0.3)';
        ctx.fill();

        // Draw connections
        particles.forEach((other, j) => {
          if (i >= j) return;
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(200, 100, 80, ${0.15 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // Draw orbital rings
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(100, 100, 120, 0.08)';
      ctx.lineWidth = 1;
      ctx.ellipse(width * 0.15, height * 0.4, 100, 40, timeRef.current * 0.2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(width * 0.15, height * 0.4, 100, 40, timeRef.current * 0.2 + Math.PI / 3, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(width * 0.15, height * 0.4, 100, 40, timeRef.current * 0.2 + (2 * Math.PI) / 3, 0, Math.PI * 2);
      ctx.stroke();

      // Draw orbiting dot
      const orbitX = width * 0.15 + Math.cos(timeRef.current * 2) * 100;
      const orbitY = height * 0.4 + Math.sin(timeRef.current * 2) * 40;
      ctx.beginPath();
      ctx.arc(orbitX, orbitY, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200, 100, 80, 0.4)';
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Canvas for physics animations */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
        style={{ pointerEvents: 'auto' }}
      />

      {/* Floating math symbols */}
      {mathSymbols.map((symbol, i) => (
        <motion.div
          key={`math-${i}`}
          className="absolute text-2xl md:text-3xl font-light select-none"
          style={{
            left: `${10 + (i * 12) % 80}%`,
            top: `${15 + (i * 17) % 70}%`,
            color: 'rgba(200, 100, 80, 0.15)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Floating code symbols */}
      {symbols.map((symbol, i) => (
        <motion.div
          key={`code-${i}`}
          className="absolute text-sm md:text-base font-mono select-none"
          style={{
            right: `${5 + (i * 11) % 40}%`,
            bottom: `${10 + (i * 13) % 50}%`,
            color: 'rgba(60, 60, 70, 0.12)',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          {symbol}
        </motion.div>
      ))}

      {/* Binary stream effect - only render on client */}
      {isClient && (
        <motion.div
          className="absolute right-8 top-1/4 font-mono text-xs leading-tight select-none"
          style={{ color: 'rgba(60, 60, 70, 0.08)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {binaryLines.map((line, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.05, 0.12, 0.05] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Euler's identity - subtle math equation */}
      <motion.div
        className="absolute bottom-20 left-10 text-lg md:text-xl font-serif italic select-none"
        style={{ color: 'rgba(200, 100, 80, 0.1)' }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 2, delay: 1 }}
      >
        e<sup>i\u03C0</sup> + 1 = 0
      </motion.div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
        }}
      />
    </div>
  );
}
