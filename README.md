# Personal Portfolio Site

Enterprise-grade personal portfolio built with Next.js 15, featuring comprehensive security, performance optimizations, and reliability improvements.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✨ Key Features

- 🔒 **Enterprise Security** - XSS protection, secure initialization, comprehensive error boundaries
- ⚡ **Performance Optimized** - Async data loading, centralized fetching utility, development caching  
- 🛡️ **Production Ready** - Error boundaries, graceful fallbacks, environment-guarded logging
- 🌙 **Complete Theme System** - Bulletproof dark mode with 37 comprehensive tests, zero FOUC
- 📱 **Responsive Design** - Mobile-first Tailwind CSS with smooth transitions
- 🧪 **Comprehensive Testing** - 270+ tests with security, theme system, and integration coverage
- 🚀 **Automated Deployment** - GitHub Pages with CI/CD pipeline

## 🛠️ Tech Stack

- **Next.js 15** - App Router with async server components, TypeScript, static export
- **React 19** - Latest React with modern patterns and error boundaries
- **Tailwind CSS 4** - Utility-first styling with dark mode support
- **Vitest** - Lightning-fast testing with React Testing Library
- **TypeScript** - Strict type safety throughout the application
- **Security First** - XSS prevention, input validation, secure client-side patterns

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages (all async)
│   ├── error.tsx                 # Next.js error boundary page
│   ├── layout.tsx                # Root layout with ErrorBoundary wrapper
│   ├── about/page.tsx            # Async markdown content
│   ├── blog/[slug]/page.tsx      # Dynamic blog posts with async data
│   ├── contact/page.tsx          # Contact information and social links
│   ├── other/page.tsx            # Personal interests with async JSON
│   ├── projects/page.tsx         # Portfolio showcase with async data
│   └── resume/page.tsx           # Professional experience with async loading
├── components/
│   ├── ErrorBoundary.tsx         # Application-level error boundary
│   ├── ThemeScript.tsx           # SSR-safe theme initialization
│   ├── template/                 # Layout components (Header, Hero, PageLayout)
│   └── ui/
│       └── ThemeToggle.tsx       # Modern theme toggle components
├── lib/
│   ├── dataFetcher.ts            # Centralized async data loading utility
│   ├── theme.ts                  # Core theme utilities with error handling
│   └── utils.ts                  # Utility functions and helpers
├── hooks/
│   └── useTheme.ts               # Theme state management hook
├── contexts/
│   └── ThemeProvider.tsx         # Optimized theme context provider
└── test/                         # Test utilities and integration tests

data/
├── projects.json                 # Portfolio projects (deduplicated)
├── other.json                    # Personal interests and statistics
├── about.md                      # About page markdown content
├── resume/                       # Professional data
│   ├── work.json                 # Work experience
│   ├── education.json            # Educational background
│   └── skills.json               # Technical and soft skills
└── posts/                        # Blog posts (Markdown with frontmatter)
```

## 🔒 Security Enhancements

### Recently Implemented
- ✅ **XSS Prevention** - Eliminated `dangerouslySetInnerHTML` usage
- ✅ **Secure Initialization** - Safe client-side dark mode setup
- ✅ **Input Validation** - Comprehensive JSON parsing with error handling
- ✅ **Error Boundaries** - Application-level error catching and recovery
- ✅ **Production Logging** - Environment-guarded console statements

### Security Testing
```bash
npm run test             # Includes security test suites
npm run build            # Validates secure production build
```

## ⚡ Performance Optimizations

### Async Data Loading
All data operations use the centralized async utility:

```typescript
// Example page pattern
export default async function ProjectsPage() {
  const fallbackData = { featured: [], other: [], categories: [] }
  const data = await fetchJsonData<ProjectsData>('projects.json', fallbackData)
  // Renders with data or safe fallbacks
}
```

### Key Improvements
- **Non-blocking I/O** - All file operations are async
- **Centralized Fetching** - Consistent error handling and caching
- **Development Caching** - Faster iteration during development
- **Graceful Degradation** - Fallback data for all external sources

## 🛡️ Reliability Features

### Error Handling Strategy
- **Error Boundaries** - Catch component errors with user-friendly fallbacks
- **Data Fallbacks** - Safe defaults for all external data sources  
- **Graceful Degradation** - Pages never break due to data issues
- **Development Debugging** - Detailed error information in development mode

### Error Boundary Usage
```tsx
// Automatic in root layout
<ErrorBoundary>
  <ThemeProvider>
    {children}
  </ThemeProvider>
</ErrorBoundary>

// Manual wrapping for specific components
const SafeComponent = withErrorBoundary(MyComponent, fallbackUI, onError)
```

## 🌙 Theme System (Complete Refactor)

### Architecture Highlights
- **Complete Rewrite** - Built from scratch with test-first approach
- **37 Comprehensive Tests** - Full coverage including error scenarios and edge cases
- **Zero FOUC** - SSR-safe initialization prevents any visual glitches
- **Bulletproof State** - Single source of truth with no race conditions
- **Universal Compatibility** - Works across all browsers and environments

### Core Components
```typescript
// Core theme utilities
src/lib/theme.ts           // Browser-safe operations with graceful fallbacks

// React integration
src/hooks/useTheme.ts      // State management hook with SSR handling
src/contexts/ThemeProvider.tsx  // Optimized context provider

// UI components
src/components/ThemeScript.tsx   // Secure early initialization
src/components/ui/ThemeToggle.tsx // Accessible toggle components
```

### Key Achievements
1. **Eliminated timing issues** - No more race conditions or coordination problems
2. **Enhanced error handling** - Graceful fallbacks for localStorage and system errors
3. **Improved performance** - Reduced re-renders and optimized state management
4. **Security hardened** - No unsafe HTML injection, secure script handling
5. **Comprehensive testing** - 37 tests covering all scenarios including failures

## 🧪 Testing Infrastructure

### Comprehensive Coverage (270+ Tests)
- 🌙 **Theme System Tests** - 37 focused tests covering all functionality and edge cases
- 🔒 **Security Tests** - XSS prevention, safe initialization patterns
- 🛡️ **Error Boundaries** - Component error handling, fallback UI, accessibility
- ⚡ **Performance** - Async operations, data fetching reliability
- 🎯 **Components** - All UI components with user interactions
- 🔗 **Integration** - Page rendering, navigation, cross-component coordination
- 🪝 **Hooks** - Theme persistence, localStorage handling, SSR compatibility
- 📊 **Data Handling** - JSON validation, error scenarios, malformed data

### Test Commands
```bash
npm run test              # Run tests in watch mode
npm run test:run          # Run tests once
npm run test:coverage     # Generate coverage report  
npm run test:ui           # Visual test interface
npm run lint              # TypeScript and ESLint validation
```

## 📊 Content Management

### Blog Posts
Add Markdown files to `data/posts/` with frontmatter:

```markdown
---
title: "Post Title"
date: "2024-01-01" 
author: "Author Name"
excerpt: "Brief description"
slug: "url-slug"
published: true
---

Content here...
```

### Project Portfolio
Update `data/projects.json`:
```json
{
  "featured": [],
  "other": [
    {
      "id": "unique-project-id",
      "title": "Project Name",
      "description": "Project description",
      "technologies": ["Next.js", "TypeScript"],
      "category": "Web Development",
      "github": "https://github.com/user/repo",
      "highlights": ["Feature 1", "Feature 2"]
    }
  ]
}
```

### Professional Data
Edit files in `data/resume/`:
- `work.json` - Professional experience with companies, roles, achievements
- `education.json` - Educational background and certifications
- `skills.json` - Technical skills, tools, and proficiency levels

### Personal Content
Update `data/other.json` with interests, statistics, and hobbies.

## 🚀 Deployment

### Automatic (Recommended)
Push to main branch - GitHub Actions handles deployment automatically.

### Manual Deployment
```bash
npm run build            # Validate and build
npm run deploy           # Deploy to GitHub Pages
```

### GitHub Pages Setup
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Configure custom domain (optional)

### Build Troubleshooting

If GitHub Pages deployment fails, common issues and solutions:

**TypeScript/ESLint Errors:**
- JSX namespace issues: Use `React.JSX.Element` instead of `JSX.Element`
- Unused variables in tests: Remove or prefix with underscore
- Type assertions: Use proper TypeScript types instead of `as any`

**Build Process:**
```bash
npm run build            # Test build locally first
npm run lint             # Validate TypeScript/ESLint compliance
npm run test:run         # Ensure all tests pass
```

**Debug Steps:**
1. Check local build success with `npm run build`
2. Verify `out/` directory is generated with all static files
3. Commit and push fixes to trigger new deployment
4. Monitor GitHub Actions workflow for deployment status

## 🔧 Development

### Local Development
```bash
npm run dev              # Start development server with hot reload
npm run build            # Production build with validation
npm run lint             # Run ESLint and TypeScript checks
npm run test             # Comprehensive test suite
```

### Adding New Features

1. **Security First** - Avoid `dangerouslySetInnerHTML`, validate inputs
2. **Async Operations** - Use `fetchJsonData` utility for file operations
3. **Error Handling** - Provide fallback data, wrap in error boundaries
4. **Testing** - Write security and error scenario tests
5. **Type Safety** - Define strict TypeScript interfaces

### Quality Checklist
- [ ] No security vulnerabilities (XSS, unsafe HTML)
- [ ] All file operations are async with error handling
- [ ] Error boundaries implemented for component failures
- [ ] Console logging is development-only
- [ ] Tests cover normal, error, and security scenarios
- [ ] TypeScript strict mode compliance
- [ ] Fallback data provided for all external data sources

## 🎯 Architecture Highlights

### Enterprise-Grade Patterns
- **Defense in Depth** - Multiple layers of error handling
- **Security by Design** - Secure alternatives preferred over shortcuts  
- **Performance by Default** - Async operations and efficient caching
- **Reliability First** - Graceful degradation and comprehensive fallbacks

### Modern React Patterns
- Server components with async data loading
- Error boundaries with user-friendly fallbacks
- Context providers with type-safe hooks
- Comprehensive testing with realistic scenarios

## 📈 Performance Metrics

- **Build Time** - Fast compilation with TypeScript validation
- **Test Suite** - 270+ tests running efficiently with Vitest
- **Bundle Size** - Optimized static site generation with theme system
- **Runtime** - Non-blocking async operations throughout
- **Theme Performance** - Zero FOUC with optimized state management
- **Error Recovery** - Graceful fallbacks prevent application crashes

## 🤝 Contributing

This is a personal portfolio, but the patterns and architecture can serve as a reference for:
- Security-first React development
- Comprehensive error handling strategies
- Performance-optimized data loading
- Enterprise-grade testing practices

## 📄 License

MIT - Feel free to use the patterns and architecture for your own projects.