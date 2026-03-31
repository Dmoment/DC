import type { NextPage, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Layers, Clock, Tag, ArrowRight } from 'lucide-react';
import { getSortedSystemDesignsData } from '../../lib/mdx';
import { format, parseISO } from 'date-fns';

interface SystemDesign {
  id: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

interface SystemDesignsPageProps {
  designs: SystemDesign[];
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-700';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'Hard':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

function SystemDesignCard({ design, index }: { design: SystemDesign; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/system-designs/${design.id}`}>
        <a className="block group">
          <article className="bg-white border border-black/5 rounded-xl p-6 hover:border-anthropic-accent/30 hover:shadow-lg transition-all duration-300">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(design.difficulty)}`}>
                {design.difficulty}
              </span>
              <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                {design.category}
              </span>
            </div>

            <h2 className="text-xl font-serif font-medium text-anthropic-text mb-2 group-hover:text-anthropic-accent transition-colors">
              {design.title}
            </h2>

            <p className="text-anthropic-secondary text-sm mb-4 line-clamp-2">
              {design.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-anthropic-secondary">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {format(parseISO(design.date), 'MMM d, yyyy')}
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm text-anthropic-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Read more <ArrowRight size={14} />
              </div>
            </div>

            {design.tags && design.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/5">
                {design.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-anthropic-bg border border-black/5 rounded-md text-anthropic-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        </a>
      </Link>
    </motion.div>
  );
}

const SystemDesignsPage: NextPage<SystemDesignsPageProps> = ({ designs }) => {
  // Group designs by category
  const categories = designs.reduce((acc, design) => {
    const cat = design.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(design);
    return acc;
  }, {} as Record<string, SystemDesign[]>);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Layers size={24} />
          </div>
          <h1 className="text-4xl font-serif font-medium text-anthropic-text">System Designs</h1>
        </div>

        <p className="text-anthropic-secondary mb-12 max-w-2xl">
          Deep dives into system design concepts and real-world architecture patterns.
          From URL shorteners to distributed databases, explore how large-scale systems are built.
        </p>

        {designs.length === 0 ? (
          <div className="text-center py-20 text-anthropic-secondary">
            <Layers size={48} className="mx-auto mb-4 opacity-50" />
            <p>No system design articles yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {designs.map((design, index) => (
              <SystemDesignCard key={design.id} design={design} index={index} />
            ))}
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const designs = getSortedSystemDesignsData();
  return {
    props: {
      designs,
    },
  };
};

export default SystemDesignsPage;
