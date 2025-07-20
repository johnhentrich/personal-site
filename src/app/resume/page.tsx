import { Metadata } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import { PageLayout } from '@/components/template/PageLayout'

export const metadata: Metadata = {
  title: 'Resume | John Hentrich',
  description: 'View my professional experience, education, and technical skills in detail.',
}

interface WorkExperience {
  name: string
  position: string
  url: string
  startDate: string
  endDate: string | null
  summary: string
  highlights: string[]
}

interface Education {
  institution: string
  degree: string
  startDate: string
  endDate: string
  logo?: string
  color?: string
  url?: string
}

interface Skills {
  title: string
  skills: {
    title: string
    competency: number
  }[]
}

async function getResumeData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'resume')
    
    const [workData, educationData, skillsData] = await Promise.all([
      fs.readFile(path.join(dataPath, 'work.json'), 'utf8'),
      fs.readFile(path.join(dataPath, 'education.json'), 'utf8'),
      fs.readFile(path.join(dataPath, 'skills.json'), 'utf8'),
    ])

    return {
      work: JSON.parse(workData) as WorkExperience[],
      education: JSON.parse(educationData) as Education[],
      skills: JSON.parse(skillsData) as Skills[],
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error loading resume data:', error)
    }
    return {
      work: [],
      education: [],
      skills: [],
    }
  }
}

export default async function ResumePage() {
  const { work, education, skills } = await getResumeData()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.getFullYear().toString()
  }

  // Group work experience by company
  const groupedWork = work.reduce((acc, job) => {
    if (!acc[job.name]) {
      acc[job.name] = []
    }
    acc[job.name].push(job)
    return acc
  }, {} as Record<string, WorkExperience[]>)

  return (
    <PageLayout currentPage="resume">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Resume
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional experience, education, and technical skills
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Work Experience */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                Professional Experience
              </h2>
              
              <div className="space-y-10">
                {Object.entries(groupedWork).map(([companyName, jobs], companyIndex) => (
                  <div key={companyIndex} className="relative">
                    {/* Company Header */}
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                      <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {companyName}
                      </h3>
                      <p className="text-blue-600 dark:text-blue-400">
                        {formatDate(jobs[jobs.length - 1].startDate)} - {jobs[0].endDate ? formatDate(jobs[0].endDate) : 'Present'}
                      </p>
                    </div>
                    
                    {/* Positions at this company */}
                    <div className="space-y-6 ml-4">
                      {jobs.map((job, jobIndex) => (
                        <div key={jobIndex} className="relative pl-8 border-l-2 border-blue-300 dark:border-blue-600">
                          <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                          
                          <div className="mb-4">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {job.position}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : 'Present'}
                            </p>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-4">
                            {job.summary}
                          </p>
                          
                          <ul className="space-y-2">
                            {job.highlights.map((highlight, highlightIndex) => (
                              <li key={highlightIndex} className="flex items-start">
                                <span className="text-blue-500 mr-2 mt-1">•</span>
                                <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                Education
              </h2>
              
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-green-500 pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-500 rounded-full"></div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-lg text-green-600 dark:text-green-400 font-medium">
                      {edu.institution}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-8 space-y-6">
              {/* Skills */}
              <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Skills & Expertise
                </h2>
                
                <div className="space-y-6">
                  {skills.map((skillCategory, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {skillCategory.title}
                      </h3>
                      <div className="space-y-3">
                        {skillCategory.skills.map((skill, skillIndex) => (
                          <div key={skillIndex}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {skill.title}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {skill.competency}/5
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(skill.competency / 5) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Info */}
              <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-200 dark:border-gray-600">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Let&apos;s Connect
                </h3>
                <div className="space-y-3">
                  <a 
                    href="mailto:hello@johnhentrich.com"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <span className="mr-2">📧</span>
                    hello@johnhentrich.com
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/johnhentrich"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <span className="mr-2">💼</span>
                    LinkedIn Profile
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}