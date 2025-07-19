# Claude.md

This project is a full-stack blog and portfolio site built with Next.js 15, Tailwind CSS, and markdown/JSON content. Claude Code will be used to scaffold and enhance all major features.

## Claude Usage Goals
## Constraints
- No external UI libraries (except Tailwind CSS)
- All content must be static or file-based (markdown or JSON)
- API routes must access only the local filesystem (no remote DB)
- Codebase must use TypeScript and React functional components only

> 💡 Run `/reset` in long sessions to reload claude.md.


- Use Claude Code CLI to generate boilerplate, components, and API routes.
- Claude should follow Tailwind best practices and avoid third-party UI kits.
- Use only file-based data storage via JSON and markdown.

> ⚠️ Run each prompt one at a time. Modify output and adjust prompts as needed.

## Style and Behavior Preferences

- Output clean, well-commented TypeScript and React code.
- Prefer clarity over cleverness.
- Provide brief explanations only when necessary.

## 🛠️ Initial Project Setup – Scaffolds app structure

Create a new Next.js 15 project with TypeScript and Tailwind CSS. Set up the basic folder structure with an app directory, and create a data folder for JSON and markdown files. Include a basic responsive homepage.

## 📂 Data Setup – Local content via JSON and markdown

Create a data management system using JSON files and markdown. Set up folders for /data/posts (markdown blog posts), /data/projects.json, and /data/config.json. Create sample data files with proper frontmatter for markdown posts.

## 🔌 API Layer – File-based JSON/Markdown endpoints

Create Next.js API routes to read JSON files and markdown files from the data folder. Set up GET endpoints for /api/posts, /api/projects, and /api/config. Handle file system operations with proper error handling.

## 🎨 UI Components – Tailwind-based responsive UI

Create responsive React components using Tailwind CSS. Build a Header component, BlogPost card component, and Project showcase component. Make them mobile-first responsive with proper grid layouts.

## 📰 Blog System – Markdown-driven blog with routing

Build a complete blog system that reads markdown files, parses frontmatter, converts to HTML, and displays in a responsive layout. Include blog post listing page and individual post pages with dynamic routing.

## 💾 Local Storage – Custom hooks for user prefs

Add local storage functionality for user preferences like dark mode toggle, reading progress, and favorite posts. Create custom React hooks to manage localStorage state.

## 🧑‍💼 Admin Panel – Write posts/projects from interface

Create an admin interface that can add new blog posts and projects by writing to JSON/markdown files. Include form validation and file system write operations through API routes.

## ⚙️ Usage Instructions for Long Sessions

- **Throttle Requests**: Add a `setTimeout` or sleep delay between prompts if scripting.
- **Batch Tasks**: Group related prompts into a single request when possible to reduce call volume.
- **Avoid Polling**: Don’t loop or retry failed calls rapidly.
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