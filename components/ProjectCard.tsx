import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string; // Placeholder for now
}

export default function ProjectCard({ title, description, tags, link, github }: ProjectProps) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="group p-8 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-serif font-medium group-hover:text-anthropic-accent transition-colors">{title}</h3>
        <div className="flex gap-3">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-anthropic-secondary hover:text-anthropic-text transition-colors">
              <Github size={20} />
            </a>
          )}
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-anthropic-secondary hover:text-anthropic-text transition-colors">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      
      <p className="text-anthropic-secondary mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 text-xs font-medium bg-anthropic-bg text-anthropic-secondary rounded-full border border-black/5">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
