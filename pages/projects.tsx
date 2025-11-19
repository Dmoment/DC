import type { NextPage } from 'next';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

const clientProjects = [
  {
    title: "E-Commerce Redesign",
    description: "Complete overhaul of a major fashion retailer's frontend architecture.",
    tags: ["Next.js", "Shopify", "Vercel"],
    link: "https://example.com",
  },
  {
    title: "Fintech Dashboard",
    description: "Real-time trading dashboard for a boutique investment firm.",
    tags: ["React", "WebSocket", "D3.js"],
    link: "https://example.com",
  }
];

const personalProjects = [
  {
    title: "Personal Blog",
    description: "This website! Built with Next.js and Tailwind CSS.",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    github: "https://github.com",
  },
  {
    title: "CLI Task Manager",
    description: "A Rust-based command line tool for managing productivity.",
    tags: ["Rust", "CLI"],
    github: "https://github.com",
  }
];

const Projects: NextPage = () => {
  return (
    <Layout title="Projects | Deepak Chauhan" description="Showcase of my client work and personal projects.">
      <div className="py-20">
        <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 text-anthropic-text">Projects</h1>
        <p className="text-xl text-anthropic-secondary max-w-2xl mb-20 leading-relaxed">
          A collection of work spanning from enterprise web applications to experimental side projects.
        </p>
        
        <div className="mb-24">
          <h2 className="text-2xl font-serif font-medium mb-8 pb-4 border-b border-black/5">Client Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {clientProjects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-medium mb-8 pb-4 border-b border-black/5">Personal Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {personalProjects.map((project, i) => (
              <ProjectCard key={i} {...project} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
