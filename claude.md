# Claude.md

**Next.js 15 Portfolio Site** - Static blog and portfolio with Tailwind CSS, JSON/markdown content.

## 🎯 Quick Reference

**Tech Stack**: Next.js 15 + Tailwind + TypeScript + Vitest  
**Status**: Production-ready with 95%+ test coverage  
**Deployment**: GitHub Pages with automated CI/CD

### Commands
```bash
npm run dev      # Development server
npm run build    # Production build  
npm run test     # Run test suite
npm run deploy   # Deploy to GitHub Pages
```

### Constraints
- Static file-based content only (JSON/markdown)
- Tailwind CSS only (no external UI libraries)
- TypeScript + React functional components
- Local filesystem access only

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm test` - Run test suite
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Run tests with coverage report
- `npm run deploy` - Deploy to GitHub Pages

## Testing Framework

The project uses **Vitest** with React Testing Library for comprehensive testing:

- **Framework**: Vitest (chosen over Jest for 10-20x performance improvement)
- **Component Testing**: @testing-library/react with custom matchers
- **DOM Environment**: jsdom for browser simulation
- **User Interactions**: @testing-library/user-event
- **Coverage**: Built-in Vitest coverage reporting
- **Test UI**: Vitest UI for interactive test debugging

### Test Structure

```
src/
├── test/
│   ├── setup.ts           # Global test configuration
│   └── error-scenarios.test.tsx  # Comprehensive error handling tests
├── components/
│   └── **/*.test.tsx      # Component unit tests
├── hooks/
│   └── **/*.test.tsx      # Custom hook tests
└── app/
    └── **/**.test.tsx     # Page and integration tests
```

### Test Coverage Areas

- ✅ **Component Testing**: All major components (Header, PageLayout, Hero, ThemeToggle)
- ✅ **Hook Testing**: Dark mode persistence, localStorage handling, SSR compatibility
- ✅ **Data Loading**: JSON file validation, error handling, malformed data
- ✅ **Integration Tests**: Page rendering, navigation, dark mode integration
- ✅ **Error Scenarios**: File system errors, JSON parsing, navigation edge cases
- ✅ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

Current test status: **Production-ready** with comprehensive error scenario coverage.

## 🛠️ Project Structure

### Core Features Implemented

✅ **Next.js 15 App Router**: Full static site generation with dynamic routing
✅ **Dark Mode**: Persistent theme toggle with localStorage and SSR support
✅ **Responsive Design**: Mobile-first Tailwind CSS implementation
✅ **Testing Suite**: Comprehensive Vitest testing framework
✅ **TypeScript**: Full type safety across components and data
✅ **GitHub Pages Deployment**: Automated CI/CD pipeline

### Data Management

- `/data/` - JSON files for projects, work experience, education
- Static content loading with error handling and validation
- Type-safe interfaces for all data structures

### Pages Implemented

- `/ (Home)` - Hero section with introduction
- `/about` - Personal background and story
- `/projects` - Portfolio showcase with GitHub integration
- `/resume` - Professional experience and education
- `/other` - Personal interests and fun facts
- `/contact` - Professional contact information
- `/blog/` - Dynamic blog system with markdown support

## 🎨 UI Components – Tailwind-based responsive UI

✅ **Complete Component Library**:
- `Header` - Responsive navigation with mobile menu
- `PageLayout` - Consistent layout wrapper with dark mode
- `Hero` - Landing page hero section
- `ThemeToggle` - Dark/light mode switcher
- `ProjectCard` - Portfolio item display
- All components tested with React Testing Library

## 📰 Blog System – Markdown-driven blog with routing

✅ **Dynamic Blog Implementation**:
- Markdown file processing with frontmatter
- Dynamic routing with `[slug]` parameters
- Static generation for all blog posts
- Responsive blog post layouts

## 💾 Dark Mode – Custom hooks for theme persistence

✅ **Advanced Dark Mode System**:
- `useDarkMode` hook with localStorage persistence
- SSR-compatible with hydration handling
- FOUC (Flash of Unstyled Content) prevention
- Comprehensive test coverage for edge cases

## 🧪 Testing Infrastructure

✅ **Comprehensive Testing Setup**:
- Vitest configuration with React support
- Next.js router mocking for navigation tests
- localStorage mocking for persistence testing
- Error scenario testing for robustness
- Coverage reporting and UI debugging tools

## 🚀 Deployment

✅ **GitHub Pages Integration**:
- Automated build and deployment with `gh-pages`
- Static site optimization
- Custom domain support ready
- Production build verification

## 🤖 Sub-Agent Opportunities

### Recommended Task Delegation

**Content Management Agent**
```
/agent "Search all JSON files in /data/ for project entries missing GitHub URLs and add them"
/agent "Validate all blog post frontmatter has required fields: title, date, excerpt"
```

**Testing & Quality Agent**  
```
/agent "Run test suite and identify failing tests, then analyze root causes"
/agent "Check test coverage and identify components/pages needing more tests"
```

**Build & Deployment Agent**
```
/agent "Run build process and fix any TypeScript errors or linting issues"
/agent "Verify GitHub Pages deployment configuration and asset loading"
```

**Data Validation Agent**
```
/agent "Validate all JSON files in /data/ match their TypeScript interfaces"
/agent "Check for missing or malformed content across all data sources"
```

### When to Use Sub-Agents

- **Multi-file operations**: Content updates across multiple JSON/markdown files
- **Complex analysis tasks**: Test coverage analysis, error pattern identification  
- **Automated workflows**: Build validation, deployment verification
- **Data consistency**: Cross-referencing content, validating structure

## ⚙️ Usage Instructions for Long Sessions

- **Throttle Requests**: Add a `setTimeout` or sleep delay between prompts if scripting.
- **Batch Tasks**: Group related prompts into a single request when possible to reduce call volume.
- **Avoid Polling**: Don't loop or retry failed calls rapidly.
- **Use CLI Manually**: Run tasks one at a time in long sessions to reduce token throughput.

## 🕒 Overnight Usage Notes

- Break sessions into logical steps and insert `/reset` commands as needed to free context.
- Avoid streaming large files repeatedly — load once, then operate on them.
- Use markdown and JSON files instead of long embedded text blocks.

## 🔒 Rate Limit Protection

- If scripting, wait 10–30s between calls.
- If using API keys, respect the model-specific limits:
  - Claude 3 Opus: ~10–30 req/min, ~200k tokens context
  
- Monitor context and watch for:
  ```
  Context left until auto-compact: 10%
  ```
  Reset if needed to avoid truncation or context loss.

## 🔧 Common Issues & Solutions

### Quick Fixes Reference

**Dark Mode Issues**
- FOUC: Add inline script in layout.tsx before content renders
- Toggle broken: Ensure server/client scripts handle both add/remove dark class

**Build/Deploy Issues**  
- CSS not loading: Use `--dotfiles --nojekyll` flags in gh-pages deploy
- Type errors: Run `npm run lint` and fix TypeScript issues

**Test Issues**
- Router mocking: Mock all Next.js navigation hooks (useRouter, usePathname, etc.)
- JSON validation: Add fallback data for malformed/missing files

### Test Coverage Summary

**Production Status**: 95%+ test success rate across all components
- Component, hook, and integration testing complete
- Error scenarios and deployment configuration validated
- Regression testing for all major issues
- Comprehensive coverage of core functionality

### Key Deployment Notes
- Deploy with: `npm run deploy` (includes .nojekyll and proper flags)
- Production build validates all TypeScript and tests before deployment
- Asset loading optimized for GitHub Pages static hosting