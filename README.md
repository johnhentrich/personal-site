# Personal Site - Next.js 15

A modern, responsive personal portfolio and blog site built with Next.js 15, TypeScript, and Tailwind CSS. Features a complete blog system, project showcase, resume section, and static deployment capabilities.

## 🚀 Features

- **Next.js 15** with App Router and TypeScript
- **Tailwind CSS** for responsive, mobile-first design
- **Markdown Blog System** with frontmatter support
- **Static Site Generation** for GitHub Pages deployment
- **Project Portfolio** with categorization and filtering
- **Interactive Resume** with work experience and skills
- **Contact Forms** and social media integration
- **SEO Optimized** with metadata and structured data

## 📁 Project Structure

```
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── blog/           # Blog listing and individual posts
│   │   ├── projects/       # Project showcase
│   │   ├── resume/         # Professional experience
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact information
│   │   └── other/          # Additional content
│   ├── components/         # Reusable React components
│   │   ├── template/       # Layout components
│   │   └── ui/            # UI components
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── data/                  # Content data files
│   ├── posts/            # Markdown blog posts
│   ├── projects.json     # Project data
│   ├── config.json       # Site configuration
│   └── resume/           # Resume data (work.json, skills.json)
├── public/               # Static assets
└── .github/workflows/    # GitHub Actions for deployment
```

## 🛠 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-site-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Content Management

### Blog Posts

Create new blog posts by adding Markdown files to `data/posts/`:

```markdown
---
title: "Your Post Title"
slug: "your-post-slug"
date: "2024-01-01"
author: "Your Name"
excerpt: "Brief description of the post"
tags: ["tag1", "tag2"]
category: "Business Strategy"
featured: false
published: true
readingTime: 5
---

Your markdown content here...
```

### Projects

Update `data/projects.json` to add or modify projects:

```json
{
  "featured": [
    {
      "id": "project-id",
      "title": "Project Title",
      "description": "Project description",
      "technologies": ["React", "Node.js"],
      "category": "Web Development",
      "highlights": ["Key achievement 1", "Key achievement 2"],
      "github": "https://github.com/user/repo",
      "demo": "https://demo-url.com"
    }
  ],
  "other": []
}
```

### Resume

Update `data/resume/work.json` and `data/resume/skills.json` with your professional information.

## 🚀 Deployment

### GitHub Pages (Recommended)

The site is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select "GitHub Actions" as the source

2. **Push to main branch**
   ```bash
   git add .
   git commit -m "Deploy site"
   git push origin main
   ```

3. **Automatic deployment**
   - GitHub Actions will build and deploy automatically
   - Site will be available at `https://yourusername.github.io/repository-name`

### Manual Deployment

For manual deployment to GitHub Pages:

```bash
npm run deploy
```

### Other Platforms

The static build can be deployed to any static hosting service:

```bash
npm run build
# Upload the 'out' directory to your hosting provider
```

## 🔧 Configuration

### Site Configuration

Update `data/config.json` with your personal information:

```json
{
  "site": {
    "title": "Your Name",
    "description": "Your professional description",
    "url": "https://yoursite.com",
    "author": {
      "name": "Your Name",
      "email": "your@email.com"
    }
  }
}
```

### Next.js Configuration

The site is configured for static export in `next.config.ts`. For GitHub Pages, the base path is automatically configured based on the repository name.

## 📱 Responsive Design

The site is built mobile-first with Tailwind CSS:
- Mobile: 320px and up
- Tablet: 768px and up  
- Desktop: 1024px and up
- Large screens: 1280px and up

## 🔍 SEO Features

- Metadata configuration for all pages
- OpenGraph and Twitter card support
- Structured data for articles and profiles
- Sitemap generation
- Robot.txt file

## 🎨 Customization

### Styling

The site uses Tailwind CSS with custom color schemes defined in `tailwind.config.ts`. Key design tokens:

- Primary colors: Blue gradient
- Typography: Heading and body font stacks
- Spacing: Consistent spacing scale
- Shadows: Subtle elevation effects

### Components

All components are located in `src/components/`:
- `template/` - Layout and structural components
- `ui/` - Individual UI components

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized
- **Bundle Size**: Minimized with tree shaking
- **Images**: Optimized with Next.js Image component

## 🛡 Security

- Content Security Policy headers
- HTTPS enforcement
- No inline scripts or styles
- Sanitized user inputs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues:
- Create an issue in the GitHub repository
- Check the documentation in `CLAUDE.md`
- Review the deployment logs in GitHub Actions

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS