import { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'
import dayjs from 'dayjs'
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

interface Skill {
  title: string
  competency: number
}

interface SkillCategory {
  title: string
  skills: Skill[]
}

function getWorkExperience(): WorkExperience[] {
  try {
    const fullPath = join(process.cwd(), 'data', 'resume', 'work.json')
    const fileContents = readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading work experience:', error)
    return []
  }
}

function getSkills(): SkillCategory[] {
  try {
    const fullPath = join(process.cwd(), 'data', 'resume', 'skills.json')
    const fileContents = readFileSync(fullPath, 'utf8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading skills:', error)
    return []
  }
}

function ExperienceItem({ job }: { job: WorkExperience }) {
  return (
    <div className="border-l-2 border-primary/20 pl-6 pb-8 last:pb-0">
      <div className="relative">
        <div className="absolute -left-8 top-0 w-4 h-4 bg-primary rounded-full border-4 border-white"></div>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="text-lg font-heading font-bold text-gray-900">
              <a 
                href={job.url} 
                className="hover:text-primary transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                {job.name}
              </a> - {job.position}
            </h3>
            <p className="text-sm text-gray-600 font-medium">
              {dayjs(job.startDate).format('YYYY')} - {job.endDate ? dayjs(job.endDate).format('YYYY') : 'PRESENT'}
            </p>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            {job.summary}
          </p>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements:</h4>
            <ul className="space-y-2">
              {job.highlights.map((highlight, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillBar({ skill }: { skill: Skill }) {
  const percentage = (skill.competency / 5) * 100

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{skill.title}</span>
        <span className="text-xs text-gray-500">{skill.competency}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

function SkillsSection({ category }: { category: SkillCategory }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-heading font-bold text-gray-900 mb-4">
        {category.title}
      </h3>
      <div className="space-y-3">
        {category.skills.map((skill) => (
          <SkillBar key={skill.title} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export default function ResumePage() {
  const workExperience = getWorkExperience()
  const skills = getSkills()

  return (
    <PageLayout currentPage="resume">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-success p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            Resume
          </h1>
          <p className="text-lg text-gray-600">
            Professional experience, education, and technical skills
          </p>
        </header>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Experience Section */}
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 flex items-center">
                <span className="bg-primary/10 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                  </svg>
                </span>
                Professional Experience
              </h2>
              <div className="space-y-0">
                {workExperience.map((job, index) => (
                  <ExperienceItem key={index} job={job} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 flex items-center">
                <span className="bg-primary/10 p-2 rounded-lg mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                Education & Continuous Learning
              </h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  I believe in continuous learning and staying current with industry trends. My expertise has been 
                  developed through a combination of formal education, professional experience, and self-directed 
                  learning in areas such as:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="text-gray-700 flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    Advanced data analysis and visualization techniques
                  </li>
                  <li className="text-gray-700 flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    Cloud computing platforms and modern web technologies
                  </li>
                  <li className="text-gray-700 flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    Business strategy frameworks and methodologies
                  </li>
                  <li className="text-gray-700 flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    Product management and user experience principles
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Skills Section */}
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 flex items-center">
              <span className="bg-primary/10 p-2 rounded-lg mr-3">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              Skills & Expertise
            </h2>
            <div className="space-y-6">
              {skills.map((category) => (
                <SkillsSection key={category.title} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}