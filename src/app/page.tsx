import Link from 'next/link'
import { Header } from '@/components/template/Header'
import { Hero } from '@/components/template/Hero'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <Hero />
          
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Link 
              href="/about" 
              className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/40"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👋</span>
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                About Me
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Professional background and expertise in business operations and growth strategy.
              </p>
            </Link>

            <Link 
              href="/projects" 
              className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-info/20 dark:hover:border-info/40"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-info to-blue-400 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-info transition-colors">
                Technical Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Software development, infrastructure, and data science projects.
              </p>
            </Link>

            <Link 
              href="/resume" 
              className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-success/20 dark:hover:border-success/40"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-success to-green-400 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-success transition-colors">
                Resume
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Professional experience, education, and technical skills.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
