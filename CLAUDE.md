# Claude.md

**Next.js 15 Portfolio Site** - Production-ready static portfolio with comprehensive security, performance, and reliability improvements.

## 🎯 Quick Reference

**Tech Stack**: Next.js 15 + Tailwind + TypeScript + Vitest  
**Status**: Production-ready with 235+ passing tests and enterprise-grade security  
**Deployment**: GitHub Pages with automated CI/CD  
**Test Coverage**: Comprehensive testing with error boundaries and security validation

### Essential Commands
```bash
npm run dev      # Development server
npm run build    # Production build with validation
npm run test     # Run comprehensive test suite  
npm run deploy   # Deploy to GitHub Pages
npm run lint     # TypeScript and ESLint validation
```

---

## 📝 Commit Guidelines

When making commits to this project:

```bash
# Feature additions
git commit -m "Add new portfolio section for projects"
git commit -m "Implement dark mode toggle"
git commit -m "Add contact form validation"

# Bug fixes
git commit -m "Fix responsive layout on mobile"
git commit -m "Resolve accessibility issues in navigation"

# Updates and maintenance
git commit -m "Update dependencies and security patches"
git commit -m "Improve SEO metadata and performance"
git commit -m "Enhance test coverage for components"
```

**Note**: Keep commit messages descriptive and focused on the change being made. Avoid referencing AI tools or external services in commit messages.

### Key Constraints & Best Practices
- **Security**: No dangerouslySetInnerHTML, XSS protection, secure client-side initialization
- **Performance**: Async file operations only, centralized data fetching with caching
- **Reliability**: Application-level error boundaries, graceful fallbacks for all data loading
- **Production**: Environment-guarded console logging, clean production builds
- **Content**: Static file-based content (JSON/Markdown), TypeScript interfaces for all data

## 🏗️ Architecture Overview

### Recently Completed Major Improvements ✅

**🔒 Security Enhancements**
- Eliminated dangerouslySetInnerHTML XSS vulnerability in dark mode initialization
- Implemented secure client-side DarkModeInitializer component
- Added comprehensive security testing and validation

**⚡ Performance Optimizations**
- Replaced all synchronous file I/O with async operations
- Centralized data fetching utility (`src/lib/dataFetcher.ts`) with error handling
- Development-mode caching for faster data access
- Non-blocking file operations across all pages

**🛡️ Reliability & Error Handling**
- Application-level error boundaries (`src/components/ErrorBoundary.tsx`)
- Next.js error page (`src/app/error.tsx`) for graceful error handling  
- Comprehensive error testing and fallback UI
- Resilient data loading with fallback data for all JSON sources

**🔧 Code Quality**
- Environment-guarded console logging (development-only)
- Enhanced TypeScript type safety throughout codebase
- Improved component coordination (dark mode initialization)
- Production-ready logging and error reporting

## 🧪 Testing Infrastructure

**Current Status**: 235+ tests passing with comprehensive coverage

### Test Categories
- ✅ **Security Tests**: XSS prevention, safe initialization patterns
- ✅ **Error Boundary Tests**: Component error handling, fallback UI, accessibility
- ✅ **Performance Tests**: Async operations, data fetching reliability
- ✅ **Component Tests**: All UI components with user interactions
- ✅ **Integration Tests**: Page rendering, navigation, dark mode coordination
- ✅ **Hook Tests**: Dark mode persistence, localStorage handling, SSR compatibility
- ✅ **Data Tests**: JSON validation, error handling, malformed data scenarios

### Testing Framework Details
```
src/
├── test/
│   ├── setup.ts                          # Global test configuration
│   ├── error-boundary-*.test.tsx         # Error handling tests
│   ├── layout-security.test.tsx          # Security validation tests
│   ├── error-scenarios.test.tsx          # Comprehensive error handling
│   └── integration.test.tsx              # Cross-component integration
├── components/
│   ├── ErrorBoundary.test.tsx            # Error boundary component tests
│   ├── DarkModeInitializer.test.tsx      # Secure initialization tests
│   └── **/*.test.tsx                     # All component unit tests
└── lib/
    └── dataFetcher.test.ts               # Centralized data fetching tests
```

## 🛠️ Project Structure & Components

### Core Architecture
```
src/
├── app/                           # Next.js App Router (async pages)
│   ├── error.tsx                  # Next.js error boundary page
│   ├── layout.tsx                 # Root layout with ErrorBoundary
│   ├── about/page.tsx             # Async markdown content loading
│   ├── blog/[slug]/page.tsx       # Async dynamic blog posts
│   ├── projects/page.tsx          # Async JSON data loading
│   └── resume/page.tsx            # Async multi-file data loading
├── components/
│   ├── ErrorBoundary.tsx          # Application error boundary
│   ├── DarkModeInitializer.tsx    # Secure dark mode initialization
│   ├── template/                  # Layout components
│   └── ui/                        # UI components
├── lib/
│   ├── dataFetcher.ts             # Centralized async data loading
│   └── utils.ts                   # Utility functions
├── hooks/
│   └── useDarkMode.ts             # Dark mode state management
└── contexts/
    └── ThemeContext.tsx           # Theme provider context
```

### Key Components Enhanced

**ErrorBoundary** (`src/components/ErrorBoundary.tsx`)
- Class component for catching JavaScript errors
- Fallback UI with user-friendly error messages
- Development vs production error details
- Accessibility-compliant error states
- Higher-order component wrapper available

**DarkModeInitializer** (`src/components/DarkModeInitializer.tsx`)
- Secure replacement for dangerouslySetInnerHTML
- Client-side theme initialization without XSS risks
- Coordination with existing theme context
- SSR-compatible with proper hydration

**DataFetcher Utility** (`src/lib/dataFetcher.ts`)
- Centralized async file operations
- Consistent error handling patterns
- Development-mode caching for performance
- Type-safe data loading with fallbacks
- Support for multiple file loading

## 📊 Data Management

### Async Data Loading Pattern
```typescript
// All pages now use this pattern:
export default async function PageName() {
  const fallbackData = { /* safe defaults */ }
  const data = await fetchJsonData<DataType>('filename.json', fallbackData)
  // Page renders with data or fallbacks
}
```

### Data Sources
- `/data/projects.json` - Portfolio projects (deduplicated)
- `/data/resume/` - Professional data (work, education, skills)
- `/data/other.json` - Personal interests and statistics
- `/data/posts/` - Markdown blog posts with frontmatter
- `/data/about.md` - About page content

### Error Handling Strategy
- **Primary**: Try to load actual data
- **Fallback**: Use provided fallback data
- **Logging**: Development-only error logging
- **UI**: Graceful degradation, no broken pages

## 🌙 Dark Mode System

### Secure Implementation
- **Initialization**: Client-side component (no XSS risk)
- **Coordination**: Prevents conflicts between server script and React
- **Storage**: localStorage with error handling
- **SSR**: Proper hydration without FOUC
- **Testing**: Comprehensive coverage of edge cases

### Components
- `DarkModeInitializer` - Secure early initialization
- `useDarkMode` - Hook for state management  
- `ThemeContext` - React context provider
- `ThemeToggle` - User interface component

## 🚀 Deployment & Production

### GitHub Pages Configuration
- **Workflow**: Automated deployment on push to main
- **Build**: Full TypeScript and test validation
- **Assets**: Optimized static site generation
- **Domain**: Ready for custom domain configuration

### Production Optimizations
- Environment-guarded logging (no console spam)
- Async operations for better performance
- Error boundaries for reliability
- Proper error handling for edge cases

## 🔧 Development Workflows

### Adding New Features
1. **Security First**: Avoid dangerouslySetInnerHTML, validate all inputs
2. **Async Operations**: Use dataFetcher utility for file operations
3. **Error Handling**: Wrap components in error boundaries, provide fallbacks
4. **Testing**: Write tests first, ensure security and error scenarios
5. **Type Safety**: Define interfaces, use TypeScript strictly

### Quality Assurance Checklist
- [ ] No dangerouslySetInnerHTML usage
- [ ] All file operations are async
- [ ] Error boundaries implemented where needed
- [ ] Console logging is development-only
- [ ] Tests cover security and error scenarios
- [ ] Fallback data provided for all external data
- [ ] TypeScript strict mode compliance

## 🤖 Sub-Agent Opportunities

### Code Quality & Security Agent
```
/agent "Scan codebase for security vulnerabilities like XSS, unsafe HTML, or exposed secrets"
/agent "Check all console.log statements are properly guarded for production"
```

### Performance Analysis Agent
```
/agent "Identify any remaining synchronous file operations that should be async"
/agent "Analyze bundle size and identify optimization opportunities"
```

### Testing Enhancement Agent
```
/agent "Check test coverage and identify untested error scenarios"
/agent "Validate all error boundaries are properly tested with user interactions"
```

### Data Validation Agent
```
/agent "Validate all JSON files match their TypeScript interfaces"
/agent "Check for missing fallback data in async data loading functions"
```

## 🔒 Security Guidelines

### Mandatory Security Practices
- **Never use dangerouslySetInnerHTML** - Use secure alternatives
- **Validate all external data** - JSON parsing with try/catch
- **Environment-specific logging** - No sensitive data in production logs
- **Error boundary coverage** - Catch and handle component errors gracefully
- **Input sanitization** - Validate all user inputs and data sources

### Security Testing Requirements
- XSS prevention testing
- Error boundary failure scenarios
- Malformed data handling
- Client-side script security
- localStorage error handling

## 📈 Performance Best Practices

### Data Loading
- Use `fetchJsonData` utility for all file operations
- Provide fallback data for every async operation
- Cache data in development mode for faster iteration
- Handle errors gracefully without breaking page rendering

### Component Optimization
- Async page components for non-blocking loading
- Error boundaries to prevent cascade failures
- Proper TypeScript types for development experience
- Environment-specific feature flags

## 🎯 Future Improvements (Pending)

Based on architectural analysis, remaining improvements include:

### Medium Priority
- **Runtime Type Validation**: Add Zod schemas for JSON data validation
- **Loading States**: Implement proper loading UI for async operations
- **Component Refactoring**: Extract reusable patterns, improve organization
- **Accessibility**: Add skip links, focus management, ARIA landmarks

### Implementation Notes
These improvements can build on the solid foundation now established:
- Security vulnerabilities eliminated
- Performance optimized with async operations
- Reliability ensured with error boundaries
- Production logging cleaned up

## 💡 Key Learnings & Insights

### Critical Issues Addressed
1. **Security**: XSS vulnerabilities can hide in seemingly innocent places like theme scripts
2. **Performance**: Synchronous file operations block the event loop and hurt user experience
3. **Reliability**: Applications need comprehensive error handling at multiple levels
4. **Production**: Console logging can expose sensitive information and clutter production logs

### Best Practices Established
- **Defense in Depth**: Multiple layers of error handling (boundaries, fallbacks, logging)
- **Security by Design**: Secure alternatives preferred over convenience shortcuts
- **Performance by Default**: Async operations and proper caching patterns
- **Quality Assurance**: Comprehensive testing including security and error scenarios

This codebase now represents enterprise-grade quality with systematic attention to security, performance, and reliability.