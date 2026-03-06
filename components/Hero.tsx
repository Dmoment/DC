import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BauhausBackground from './BauhausBackground';

export default function Hero() {
  return (
    <section className="relative py-12 md:py-28 overflow-hidden min-h-[600px] flex items-center">
      <BauhausBackground />
      
      <div className="max-w-3xl relative z-10 mx-auto w-full">
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-8 text-anthropic-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          I build things and share what I learn along the way.
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-anthropic-secondary mb-10 leading-relaxed font-sans font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          Hey, I&apos;m Deepak. I love exploring the unconventional, tackling problems the hard way, and diving deep into what fascinates me. The best part of this craft? We get to command machines to do remarkable things.
        </motion.p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <Link href="/projects">
            <a className="inline-flex items-center px-6 py-3 bg-anthropic-text text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
              View Work
            </a>
          </Link>
          <Link href="/blog">
            <a className="inline-flex items-center px-6 py-3 border border-anthropic-text/20 text-anthropic-text font-medium rounded-md hover:bg-black/5 transition-colors group">
              Read Blog
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
