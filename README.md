# Personal Portfolio & Blog

This is a personal website built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Framer Motion](https://www.framer.com/motion/).

## Features

- **Blog**: MDX-powered blog system with categories and tags.
- **Projects**: Showcase for client and personal projects.
- **Design**: Modern, dark-themed aesthetic with smooth animations.
- **SEO**: optimized for search engines.

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding Content

### Blogs

Add `.mdx` files to the `content/blogs` directory. The file name will be used as the slug.

**Frontmatter format:**

```yaml
---
title: "Your Post Title"
date: "YYYY-MM-DD"
description: "A brief description of the post."
tags: ["Tag1", "Tag2"]
---
```

### Projects

Edit `pages/projects.tsx` to add or update projects in the `clientProjects` or `personalProjects` arrays.

## Deployment

This project is ready to be deployed on [Vercel](https://vercel.com/).
