import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FileText } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import ResumeModal from './ResumeModal';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'System Design', path: '/system-designs' },
  { name: 'LeetCode', path: '/leetcode' },
];

export default function Navbar() {
  const router = useRouter();
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-black/5 bg-[#f4f1ed]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <a className="text-xl font-serif font-bold tracking-tighter hover:text-anthropic-accent transition-colors">
              DC
            </a>
          </Link>

          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = router.pathname === item.path || (item.path !== '/' && router.pathname.startsWith(item.path));
              return (
                <Link key={item.path} href={item.path}>
                  <a className={cn(
                    "text-sm font-medium transition-colors relative",
                    isActive ? "text-anthropic-text" : "text-anthropic-secondary hover:text-anthropic-text"
                  )}>
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-anthropic-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </Link>
              );
            })}

            {/* Resume Button */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-anthropic-text text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              <FileText size={16} />
              <span className="hidden sm:inline">Resume</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </>
  );
}
