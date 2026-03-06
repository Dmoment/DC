import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import BlogCard from '../components/BlogCard';
import Experience from '../components/Experience';
import { getSortedPostsData } from '../lib/mdx';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  allPostsData: {
    id: string;
    date: string;
    title: string;
    description: string;
    tags: string[];
  }[];
}

const Home: NextPage<HomeProps> = ({ allPostsData }) => {
  const recentPosts = allPostsData.slice(0, 2);

  return (
    <Layout>
      <Hero />
      
      <Experience />

      <section className="py-20">
        <div className="flex justify-between items-end mb-12 border-b border-black/5 pb-6">
          <h2 className="text-3xl font-serif font-medium">Featured Projects</h2>
          <Link href="/projects">
            <a className="text-anthropic-secondary hover:text-anthropic-text transition-colors flex items-center gap-1 text-sm font-medium">
              View all <ArrowRight size={16} />
            </a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <ProjectCard
             title="KhataTrack"
             description="AI-powered financial management for Indian businesses. Bank statement analysis, automatic categorization, and GST-compliant invoicing."
             tags={['AI/ML', 'Fintech', 'SaaS']}
             link="https://khatatrack.com"
           />
           <ProjectCard
             title="LensLedger"
             description="MVP for film production companies—payroll, expense management, and more. Sole engineer on the backend."
             tags={['Ruby on Rails', 'PostgreSQL', 'System Design']}
             link="https://lensledger.vercel.app"
           />
        </div>
      </section>

      <section className="py-20">
        <div className="flex justify-between items-end mb-12 border-b border-black/5 pb-6">
          <h2 className="text-3xl font-serif font-medium">Recent Writings</h2>
          <Link href="/blog">
             <a className="text-anthropic-secondary hover:text-anthropic-text transition-colors flex items-center gap-1 text-sm font-medium">
              View all <ArrowRight size={16} />
            </a>
          </Link>
        </div>

        <div className="space-y-2">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <BlogCard key={post.id} post={{ ...post, slug: post.id }} />
            ))
          ) : (
            <p className="text-anthropic-secondary">No blog posts found.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default Home;
