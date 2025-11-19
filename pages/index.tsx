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
             title="Tavus Clone"
             description="A recreation of the Tavus landing page using Next.js, Tailwind CSS, and Framer Motion."
             tags={['Next.js', 'Tailwind', 'Framer Motion']}
             link="https://example.com"
             github="https://github.com"
           />
           <ProjectCard 
             title="AI Agent Platform"
             description="An autonomous agent platform built for enterprise scale."
             tags={['Python', 'LangChain', 'React']}
             link="https://example.com"
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
