import { Metadata } from 'next'
import { PageLayout } from '@/components/template/PageLayout'

export const metadata: Metadata = {
  title: 'Resume | John Hentrich',
  description: 'View my professional experience, education, and technical skills in detail.',
}

export default function ResumePage() {
  return (
    <PageLayout currentPage="resume">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 border-l-success p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Resume
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Experience, education, and skills
          </p>
        </header>

        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>Resume content is being fixed. Please check back shortly.</p>
        </div>
      </div>
    </PageLayout>
  )
}