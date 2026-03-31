import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blogs');
const systemDesignsDirectory = path.join(process.cwd(), 'content/system-designs');

export function getSortedPostsData() {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { date: string; title: string; description: string; tags: string[] }),
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as { date: string; title: string; description: string; tags: string[] }),
  };
}

// System Design functions
export function getSortedSystemDesignsData() {
  if (!fs.existsSync(systemDesignsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(systemDesignsDirectory);
  const allDesignsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, '');

    const fullPath = path.join(systemDesignsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as {
        date: string;
        title: string;
        description: string;
        tags: string[];
        difficulty: 'Easy' | 'Medium' | 'Hard';
        category: string;
      }),
    };
  });

  return allDesignsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllSystemDesignIds() {
  if (!fs.existsSync(systemDesignsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(systemDesignsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}

export async function getSystemDesignData(id: string) {
  const fullPath = path.join(systemDesignsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as {
      date: string;
      title: string;
      description: string;
      tags: string[];
      difficulty: 'Easy' | 'Medium' | 'Hard';
      category: string;
    }),
  };
}

