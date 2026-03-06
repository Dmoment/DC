import type { NextPage } from 'next';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

const clientProjects = [
  {
    title: "ReadyTech",
    description: "Building a new 'Admissions' application for ReadyTech's EdTech platform. Integrating functionality from their legacy 15-year-old Rails application into a modern system.",
    tags: ["Ruby on Rails", "Next.js", "React", "PostgreSQL"],
    link: "https://readytech.io",
  },
  {
    title: "Fullscript",
    description: "Optimized wholesale checkout and core GraphQL search queries, cutting response time from 20s to 2s. Managed Emerson Ecologies data migration with optimized SQL queries.",
    tags: ["Ruby on Rails", "GraphQL", "PostgreSQL", "React"],
    link: "https://fullscript.com",
  },
  {
    title: "Vendo",
    description: "Spearheaded third-party API integrations and Spree engine customization, resulting in 15% increase in average order value. Enhanced application performance by 30%.",
    tags: ["Ruby on Rails", "Spree Commerce", "API Integration"],
    link: "https://www.getvendo.com",
  },
  {
    title: "Mocingbird",
    description: "Developed a Ruby on Rails app enhancing US doctors' licensing processes with 40% rise in B2B applications. Built course recommendation using binary tree data structures.",
    tags: ["Ruby on Rails", "PostgreSQL", "TDD", "System Design"],
    link: "https://mocingbird.com",
  },
  {
    title: "LensLedger",
    description: "Building an MVP for payroll, expense management—everything a film production company needs. Sole engineer responsible for the entire backend stack.",
    tags: ["Ruby on Rails", "PostgreSQL", "System Design"],
    link: "https://lensledger.vercel.app",
  },
];

const personalProjects = [
  {
    title: "KhataTrack",
    description: "AI-powered financial management platform for Indian businesses. Features bank statement analysis from 20+ banks, automatic transaction categorization with 95% accuracy, and GST-compliant invoice generation.",
    tags: ["AI/ML", "Fintech", "SaaS", "India"],
    link: "https://khatatrack.com",
  },
];

const Projects: NextPage = () => {
  return (
    <Layout title="Projects | Deepak Chauhan" description="Showcase of my client work and personal projects.">
      <div className="py-20">
        <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 text-anthropic-text">Projects</h1>
        <p className="text-xl text-anthropic-secondary max-w-2xl mb-20 leading-relaxed">
          A collection of work spanning from enterprise web applications to personal SaaS products.
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
