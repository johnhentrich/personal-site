import { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import { readFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { PageLayout } from '@/components/template/PageLayout'

export const metadata: Metadata = {
  title: 'About | John Hentrich',
  description: 'Learn about John Hentrich\'s professional background, experience, and core expertise in business operations and growth strategy.',
}

async function getAboutContent() {
  const fullPath = join(process.cwd(), 'data', 'about.md')
  const fileContents = readFileSync(fullPath, 'utf8')
  const { content } = matter(fileContents)
  return content
}

export default async function AboutPage() {
  const aboutContent = await getAboutContent()

  return (
    <PageLayout currentPage="about">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-secondary p-8 lg:p-12">
            <header className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
                About Me
              </h1>
              <p className="text-lg text-gray-600">
                Professional background and expertise
              </p>
            </header>

            <div className="prose prose-lg prose-gray max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mt-8 mb-4 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h2: ({ children }) => (
                    <h3 className="text-xl font-heading font-bold text-gray-900 mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  h3: ({ children }) => (
                    <h4 className="text-lg font-heading font-semibold text-gray-900 mt-4 mb-2">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2 mb-4">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700 leading-relaxed flex items-start">
                      <span className="text-primary mr-3 mt-2">•</span>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),
                }}
              >
                {aboutContent}
              </ReactMarkdown>
            </div>
          </div>
    </PageLayout>
  )
}