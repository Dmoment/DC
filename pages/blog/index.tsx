import type { NextPage } from 'next';
import Layout from '../../components/Layout';
import BlogCard from '../../components/BlogCard';
import { getSortedPostsData } from '../../lib/mdx';

interface BlogIndexProps {
  allPostsData: {
    id: string;
    date: string;
    title: string;
    description: string;
    tags: string[];
  }[];
}

const BlogIndex: NextPage<BlogIndexProps> = ({ allPostsData }) => {
  return (
    <Layout title="Blog | Deepak Chauhan" description="Engineering and philosophical writings.">
      <div className="py-20">
        <h1 className="text-4xl md:text-6xl font-serif font-medium mb-12 text-anthropic-text">Writings</h1>
        
        <div className="space-y-4">
          {allPostsData.map((post) => (
            <BlogCard key={post.id} post={{ ...post, slug: post.id }} />
          ))}
        </div>
      </div>
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

export default BlogIndex;
