import { motion } from 'framer-motion';

export default function BauhausBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-60 pointer-events-none">
      {/* 1. Coding: The Logic/Structure (Square/Grid) */}
      <motion.div
        className="absolute top-10 right-10 md:top-20 md:right-20 w-40 h-40 md:w-64 md:h-64 border-[3px] border-anthropic-accent/40 rounded-none"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 12, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
       <motion.div
        className="absolute top-20 right-5 md:top-32 md:right-10 w-12 h-12 md:w-16 md:h-16 bg-anthropic-text/5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />

      {/* 2. Science: The Atom/Circle (Circle/Orbit) */}
      <motion.div
        className="absolute top-1/4 -left-10 md:-left-20 w-64 h-64 md:w-96 md:h-96 rounded-full border-[2px] border-anthropic-secondary/20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute top-1/3 left-5 md:left-10 w-16 h-16 md:w-24 md:h-24 rounded-full bg-anthropic-accent/20 mix-blend-multiply"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.2 }}
      />

      {/* 3. Philosophy: The Abstract/Flow (Triangle/Lines) */}
      <svg className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 opacity-40" viewBox="0 0 200 200">
         <motion.path
           d="M 100 20 L 180 180 L 20 180 Z"
           fill="none"
           stroke="currentColor"
           strokeWidth="2"
           className="text-anthropic-text"
           initial={{ pathLength: 0 }}
           animate={{ pathLength: 1 }}
           transition={{ duration: 3, ease: "easeInOut" }}
         />
      </svg>
       
       {/* Connecting Lines / Grid */}
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>
  );
}
