# Claude.md

**Next.js 15 Portfolio Site** - Production-ready static portfolio with enterprise-grade security, performance, and reliability.

## 🎯 Quick Reference

**Tech Stack**: Next.js 15 + Tailwind + TypeScript + Vitest  
**Status**: Production-ready with 270+ passing tests  
**Deployment**: GitHub Pages with automated CI/CD  
**Latest Achievement**: Complete theme system refactor with comprehensive testing

### Essential Commands
```bash
npm run dev      # Development server
npm run build    # Production build with validation
npm run test     # Run comprehensive test suite  
npm run deploy   # Deploy to GitHub Pages
npm run lint     # TypeScript and ESLint validation
```

### Build Troubleshooting Commands
```bash
npm run build && npm run lint && npm run test:run  # Full validation pipeline
```

---

## 📝 Commit Guidelines

**Note**: Keep commit messages descriptive and focused on the change being made. Avoid referencing AI tools or external services in commit messages.

```bash
# Feature additions
git commit -m "Add new portfolio section for projects"
git commit -m "Implement theme system with SSR support"
git commit -m "Add contact form validation"

# Bug fixes
git commit -m "Fix responsive layout on mobile"
git commit -m "Resolve accessibility issues in navigation"

# Updates and maintenance
git commit -m "Update dependencies and security patches"
git commit -m "Improve SEO metadata and performance"
git commit -m "Enhance test coverage for components"
```

### Key Constraints & Best Practices
- **Security**: No dangerouslySetInnerHTML, XSS protection, secure client-side initialization
- **Performance**: Async file operations only, centralized data fetching with caching
- **Reliability**: Application-level error boundaries, graceful fallbacks for all data loading
- **Production**: Environment-guarded console logging, clean production builds
- **Testing**: Comprehensive coverage including security, performance, and error scenarios

## 🏗️ Architecture Overview

### Current Status ✅

**🔒 Security Enhancements**
- Eliminated all XSS vulnerabilities including theme initialization
- Secure script injection without dangerouslySetInnerHTML
- Comprehensive security testing and validation

**⚡ Performance Optimizations**
- All file I/O operations are async and non-blocking
- Centralized data fetching utility with error handling and caching
- SSR-safe theme system preventing FOUC
- Optimized component re-renders and state management

**🛡️ Reliability & Error Handling**
- Application-level error boundaries with fallback UI
- Comprehensive error testing for all failure scenarios
- Resilient data loading with fallback data for all sources
- Graceful degradation for localStorage and system errors

**🧪 Complete Theme System Refactor**
- **37 comprehensive tests** for theme functionality
- **Zero FOUC** with SSR-safe initialization
- **Bulletproof state management** with single source of truth
- **Universal compatibility** across all environments and edge cases

## 🧪 Testing Infrastructure

**Current Status**: 270+ tests passing with comprehensive coverage

### Test Categories
- ✅ **Security Tests**: XSS prevention, safe initialization patterns
- ✅ **Error Boundary Tests**: Component error handling, fallback UI, accessibility
- ✅ **Performance Tests**: Async operations, data fetching reliability
- ✅ **Component Tests**: All UI components with user interactions
- ✅ **Integration Tests**: Page rendering, navigation, cross-component coordination
- ✅ **Theme System Tests**: 37 focused tests covering all functionality and edge cases
- ✅ **Data Tests**: JSON validation, error handling, malformed data scenarios

## 🛠️ Core Architecture

```
src/
├── app/                           # Next.js App Router (async pages)
│   ├── error.tsx                  # Next.js error boundary page
│   ├── layout.tsx                 # Root layout with ErrorBoundary & Theme
│   └── */page.tsx                 # All pages with async data loading
├── components/
│   ├── ErrorBoundary.tsx          # Application error boundary
│   ├── ThemeScript.tsx            # SSR-safe theme initialization
│   ├── template/                  # Layout components (Header, Footer)
│   └── ui/
│       └── ThemeToggle.tsx        # Modern theme toggle components
├── lib/
│   ├── dataFetcher.ts             # Centralized async data loading
│   ├── theme.ts                   # Core theme utilities
│   └── utils.ts                   # Utility functions
├── hooks/
│   └── useTheme.ts                # Theme state management hook
├── contexts/
│   └── ThemeProvider.tsx          # Theme context provider
└── test/                          # Comprehensive test suites
```

## 🌙 Theme System (Complete Refactor)

### Architecture Highlights
- **Complete Rewrite**: Built from scratch with test-first approach
- **37 comprehensive tests**: Full coverage including error scenarios
- **Bulletproof State Management**: Single source of truth, no race conditions
- **Zero FOUC**: SSR-safe initialization prevents visual glitches
- **Universal Compatibility**: Works across all browsers and environments

### Core Components
- `src/lib/theme.ts` - Browser-safe theme utilities with graceful fallbacks
- `src/hooks/useTheme.ts` - React hook with proper SSR handling
- `src/contexts/ThemeProvider.tsx` - Optimized context provider
- `src/components/ThemeScript.tsx` - Secure script injection for early theme
- `src/components/ui/ThemeToggle.tsx` - Accessible toggle components

### Key Achievements
1. **Eliminated timing issues** - No more race conditions or coordination problems
2. **Enhanced error handling** - Graceful fallbacks for all failure scenarios
3. **Improved performance** - Reduced re-renders, optimized state updates
4. **Security hardened** - No unsafe HTML injection, secure script handling
5. **Comprehensive testing** - 37 tests covering normal and edge cases

## 📊 Data Management

### Async Data Loading Pattern
```typescript
export default async function PageName() {
  const fallbackData = { /* safe defaults */ }
  const data = await fetchJsonData<DataType>('filename.json', fallbackData)
  return <PageComponent data={data} />
}
```

### Data Sources
- `/data/projects.json` - Portfolio projects
- `/data/resume/` - Professional experience data
- `/data/other.json` - Personal interests and statistics
- `/data/posts/` - Markdown blog posts with frontmatter
- `/data/about.md` - About page content

### Error Handling Strategy
- **Primary**: Load actual data from files
- **Fallback**: Use provided safe defaults
- **Logging**: Development-only error information
- **UI**: Graceful degradation, never broken pages

## 🚀 Deployment & Production

### GitHub Pages Configuration
- **Automated deployment** on push to main branch
- **Full validation** with TypeScript and comprehensive test suite
- **Optimized builds** with static site generation
- **Custom domain ready** with proper asset handling

### Production Features
- Environment-specific console logging (development only)
- Async operations for optimal performance
- Error boundaries preventing cascade failures
- Comprehensive error handling for edge cases

### Deployment Troubleshooting (Lessons Learned)

**Common Build Failures:**
1. **JSX Namespace Issues** - Next.js 15 requires `React.JSX.Element` instead of `JSX.Element`
2. **TypeScript Strict Mode** - Remove unused variables, avoid `as any` type assertions
3. **ESLint Violations** - Clean up test files, remove unused imports

**Resolution Process:**
1. Always test build locally first: `npm run build`
2. Fix TypeScript/ESLint errors before committing
3. Verify `out/` directory generation with all static assets
4. Commit fixes to trigger new GitHub Actions deployment
5. Monitor workflow status in GitHub Actions tab

**Prevention:**
- Run full validation pipeline before commits: `npm run build && npm run lint && npm run test:run`
- Set up pre-commit hooks for automatic validation
- Keep dependencies updated to avoid compatibility issues

## 🔧 Development Workflows

### Feature Development Process
1. **Security First**: Validate inputs, avoid unsafe HTML injection
2. **Async Operations**: Use dataFetcher utility for file operations
3. **Error Handling**: Implement error boundaries and fallbacks
4. **Testing**: Write comprehensive tests including error scenarios
5. **Type Safety**: Strict TypeScript with proper interfaces

### Quality Assurance Checklist
- [ ] No dangerouslySetInnerHTML usage
- [ ] All file operations are async
- [ ] Error boundaries implemented where needed
- [ ] Console logging is development-only
- [ ] Tests cover security and error scenarios
- [ ] Fallback data provided for all external data
- [ ] TypeScript strict mode compliance

## 🔒 Security Guidelines

### Mandatory Practices
- **No unsafe HTML injection** - Always use secure alternatives
- **Input validation** - JSON parsing with proper error handling
- **Environment-specific logging** - No sensitive data in production
- **Error boundary coverage** - Graceful handling of component failures
- **Data sanitization** - Validate all external data sources

### Security Testing
- XSS prevention validation
- Error boundary failure scenarios
- Malformed data handling
- Client-side script security
- Storage error handling

## 📈 Performance Best Practices

### Data Loading
- Use `fetchJsonData` utility for consistent error handling
- Provide fallback data for every async operation
- Cache data in development mode for faster iteration
- Handle errors without breaking page rendering

### Component Optimization
- Async page components for non-blocking loading
- Error boundaries to prevent failure cascades
- Proper TypeScript interfaces for better DX
- Environment-specific feature flags

## 💡 Key Technical Insights

### Critical Solutions Implemented
1. **Theme System Reliability**: Complete rewrite eliminated all timing and state issues
2. **Security Hardening**: Removed XSS vulnerabilities while maintaining functionality
3. **Performance Optimization**: Async patterns and proper caching throughout
4. **Error Resilience**: Multi-layered error handling with graceful degradation

### Best Practices Established
- **Defense in Depth**: Error boundaries, fallbacks, and comprehensive logging
- **Security by Design**: Secure alternatives preferred over convenience
- **Performance by Default**: Async operations and optimized state management
- **Quality Assurance**: Comprehensive testing including security and edge cases

## 🎯 Current Status

This codebase represents production-ready quality with:
- **270+ passing tests** with comprehensive coverage
- **Zero known security vulnerabilities**
- **Optimized performance** with async operations throughout
- **Complete theme system** with bulletproof state management
- **Enterprise-grade reliability** with comprehensive error handling

The system is ready for production deployment and ongoing feature development.