import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/mdx';
import { format } from 'date-fns';

interface BlogPostProps {
  source: any;
  frontMatter: {
    title: string;
    date: string;
    description: string;
    tags: string[];
  };
}

export default function BlogPost({ source, frontMatter }: BlogPostProps) {
  return (
    <Layout title={frontMatter.title} description={frontMatter.description}>
      <article className="py-20 max-w-3xl mx-auto">
        <header className="mb-12">
          <div className="flex gap-2 mb-6">
             {frontMatter.tags.map(tag => (
               <span key={tag} className="text-xs font-bold tracking-widest uppercase text-anthropic-accent">{tag}</span>
             ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium mb-6 leading-tight text-anthropic-text">{frontMatter.title}</h1>
          <p className="text-xl text-anthropic-secondary mb-6 leading-relaxed font-light">{frontMatter.description}</p>
          <div className="text-sm text-anthropic-secondary/60 font-medium">
            {format(new Date(frontMatter.date), 'MMMM d, yyyy')}
          </div>
        </header>

        <div className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-anthropic-accent hover:prose-a:text-anthropic-text prose-img:rounded-xl">
          <MDXRemote {...source} />
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const postData = await getPostData(params.slug);
  const mdxSource = await serialize(postData.content);
  
  return {
    props: {
      source: mdxSource,
      frontMatter: {
        title: postData.title,
        date: postData.date,
        description: postData.description,
        tags: postData.tags,
      },
    },
  };
}
