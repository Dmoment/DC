import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import { getAllSystemDesignIds, getSystemDesignData } from '../../lib/mdx';
import { format } from 'date-fns';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';

interface SystemDesignPostProps {
  source: any;
  frontMatter: {
    title: string;
    date: string;
    description: string;
    tags: string[];
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: string;
  };
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

export default function SystemDesignPost({ source, frontMatter }: SystemDesignPostProps) {
  return (
    <Layout title={frontMatter.title} description={frontMatter.description}>
      <article className="py-12 max-w-4xl mx-auto">
        <Link href="/system-designs">
          <a className="inline-flex items-center gap-2 text-anthropic-secondary hover:text-anthropic-accent transition-colors mb-8 text-sm">
            <ArrowLeft size={16} />
            Back to System Designs
          </a>
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(frontMatter.difficulty)}`}>
              {frontMatter.difficulty}
            </span>
            <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
              {frontMatter.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6 leading-tight text-anthropic-text">
            {frontMatter.title}
          </h1>

          <p className="text-xl text-anthropic-secondary mb-6 leading-relaxed font-light">
            {frontMatter.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-anthropic-secondary/60">
            <span>{format(new Date(frontMatter.date), 'MMMM d, yyyy')}</span>
          </div>

          {frontMatter.tags && frontMatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {frontMatter.tags.map(tag => (
                <span key={tag} className="text-xs px-3 py-1 bg-anthropic-bg border border-black/5 rounded-full text-anthropic-secondary">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-anthropic-accent hover:prose-a:text-anthropic-text prose-img:rounded-xl prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-anthropic-accent prose-code:before:content-none prose-code:after:content-none prose-table:border prose-th:bg-gray-50 prose-th:p-3 prose-td:p-3 prose-td:border prose-th:border">
          <MDXRemote {...source} />
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllSystemDesignIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const designData = await getSystemDesignData(params.slug);
  const mdxSource = await serialize(designData.content);

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        title: designData.title,
        date: designData.date,
        description: designData.description,
        tags: designData.tags,
        difficulty: designData.difficulty,
        category: designData.category,
      },
    },
  };
}
