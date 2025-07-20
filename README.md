# Personal Site

Modern personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS featuring dark mode, comprehensive testing, and responsive design.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✨ Features

- 🌙 **Dark Mode** - Persistent theme toggle with localStorage
- 📱 **Responsive Design** - Mobile-first Tailwind CSS
- ⚡ **Fast Testing** - Vitest with React Testing Library
- 📊 **Dynamic Data** - JSON-driven content management
- 🎨 **Modern UI** - Clean design with smooth transitions
- 🚀 **GitHub Pages** - Automated deployment

## Stack

- **Next.js 15** - App Router, TypeScript, Static Export
- **React 19** - Latest React with modern hooks
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vitest** - Fast unit testing with React Testing Library
- **TypeScript** - Full type safety
- **Markdown** - Blog posts with gray-matter frontmatter

## Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── about/          # About page with markdown content
│   ├── contact/        # Contact information and social links
│   ├── other/          # Personal interests and hobbies
│   ├── projects/       # Technical projects showcase
│   ├── resume/         # Professional experience and skills
│   └── layout.tsx      # Root layout with theme provider
├── components/          # Reusable React components
│   ├── template/       # Layout components (Header, Hero, PageLayout)
│   └── ui/             # UI components (ThemeToggle)
├── contexts/           # React context providers
├── hooks/              # Custom React hooks (useDarkMode)
├── lib/                # Utility functions
├── test/               # Test setup and utilities
└── types/              # TypeScript type definitions

data/
├── posts/              # Markdown blog posts with frontmatter
├── resume/             # Professional data
│   ├── work.json       # Work experience
│   ├── skills.json     # Technical and soft skills
│   └── education.json  # Educational background
├── other.json          # Personal interests and stats
├── projects.json       # Project portfolio data
├── config.json         # Site configuration
└── about.md            # About page content
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
Edit JSON files in `data/resume/`:
- `work.json` - Professional experience
- `skills.json` - Technical and soft skills  
- `education.json` - Educational background

### Personal Data
Update `data/other.json` with personal interests, stats, and hobbies.

## 🌙 Dark Mode

The site features a persistent dark mode that:
- Defaults to dark theme
- Stores preference in localStorage
- Syncs across page navigation
- Prevents flash of unstyled content (FOUC)
- Supports all pages and components

Toggle button is located in the navigation bar.

## 🧪 Testing

Comprehensive test suite powered by Vitest:

```bash
# Run tests in watch mode
npm run test

# Run tests once  
npm run test:run

# Generate coverage report
npm run test:coverage

# Open visual test UI
npm run test:ui
```

**Test Coverage:**
- ✅ Component rendering and props
- ✅ Dark mode functionality and persistence
- ✅ User interactions and event handling
- ✅ Hook behavior and state management
- ✅ Integration between components
- ✅ Accessibility and semantic HTML
- ✅ Data handling and utilities

## Deployment

### GitHub Pages
Push to main branch - GitHub Actions handles deployment automatically.

### Manual
```bash
npm run build
npm run deploy
```

## 🛠️ Development

### Local Development
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
npm run test         # Run tests in watch mode
npm run build        # Build for production
```

### Adding New Features
1. **Components** - Add to `src/components/` with corresponding tests
2. **Pages** - Create in `src/app/` using App Router
3. **Data** - Update JSON files in `data/` directory
4. **Styling** - Use Tailwind classes with dark mode variants
5. **Tests** - Follow existing patterns in `*.test.tsx` files

## Configuration

### Site Configuration
Update `data/config.json` with:
- Personal information
- Social media links  
- Site metadata
- Feature toggles (dark mode, etc.)

### GitHub Pages Setup
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch triggers deployment

## License

MIT