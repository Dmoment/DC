import Link from 'next/link';
import { format } from 'date-fns';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a className="block group">
        <article className="py-8 border-b border-black/10 group-hover:bg-white/50 transition-colors -mx-4 px-4 rounded-lg">
          <div className="flex items-center gap-3 text-sm text-anthropic-secondary mb-3 font-medium">
            <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
            <span className="text-black/10">•</span>
            <div className="flex gap-2">
               {post.tags.map(tag => (
                 <span key={tag} className="uppercase tracking-wider text-xs">{tag}</span>
               ))}
            </div>
          </div>
          <h3 className="text-2xl font-serif font-medium mb-3 group-hover:text-anthropic-accent transition-colors">
            {post.title}
          </h3>
          <p className="text-anthropic-secondary leading-relaxed max-w-2xl">
            {post.description}
          </p>
        </article>
      </a>
    </Link>
  );
}
