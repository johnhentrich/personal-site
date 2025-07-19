# Personal Site

Modern personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Stack

- **Next.js 15** - App Router, TypeScript
- **Tailwind CSS** - Styling and responsive design
- **Markdown** - Blog posts with frontmatter
- **Static Export** - GitHub Pages deployment

## Structure

```
src/
├── app/                 # Pages (blog, projects, resume, about)
├── components/          # React components
├── lib/                 # Utilities
└── types/              # TypeScript types

data/
├── posts/              # Markdown blog posts
├── projects.json       # Project data
├── config.json         # Site configuration
└── resume/             # Work experience and skills
```

## Content

### Blog Posts
Add Markdown files to `data/posts/` with frontmatter:

```markdown
---
title: "Post Title"
date: "2024-01-01"
author: "Author Name"
excerpt: "Brief description"
---

Content here...
```

### Projects
Update `data/projects.json` with project information.

### Resume
Edit `data/resume/work.json` and `data/resume/skills.json`.

## Deployment

### GitHub Pages
Push to main branch - GitHub Actions handles deployment automatically.

### Manual
```bash
npm run build
npm run deploy
```

## Configuration

Update personal information in `data/config.json`.

For GitHub Pages, configure repository settings to use GitHub Actions as source.

## License

MIT