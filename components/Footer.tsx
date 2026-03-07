import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[#f4f1ed] py-12 mt-20">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-anthropic-secondary text-sm">
          © {new Date().getFullYear()} Deepak Chauhan. All rights reserved.
        </div>
        
        <div className="flex gap-6">
          <a href="https://github.com/Dmoment" target="_blank" rel="noopener noreferrer" className="text-anthropic-secondary hover:text-anthropic-text transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/deepak-chauhan-a3426b11a/" target="_blank" rel="noopener noreferrer" className="text-anthropic-secondary hover:text-anthropic-text transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://x.com/rishudc119" target="_blank" rel="noopener noreferrer" className="text-anthropic-secondary hover:text-anthropic-text transition-colors">
            <Twitter size={20} />
          </a>
          <a href="mailto:rishudc119@gmail.com" className="text-anthropic-secondary hover:text-anthropic-text transition-colors">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
