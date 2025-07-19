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

function CompanyExperience({ company, positions }: { company: string, positions: WorkExperience[] }) {
  const companyUrl = positions[0].url
  const totalYears = Math.ceil((new Date().getTime() - new Date(positions[positions.length - 1].startDate).getTime()) / (1000 * 60 * 60 * 24 * 365))
  
  // Company-specific styling and logos
  const getCompanyStyle = (companyName: string) => {
    switch (companyName.toLowerCase()) {
      case 'ford motor company':
        return {
          background: 'bg-blue-50 border-l-4 border-l-blue-500',
          dotColor: 'bg-blue-500',
          logo: '🚗',
          textColor: 'text-blue-700'
        }
      case 'vantage point advisors':
        return {
          background: 'bg-green-50 border-l-4 border-l-green-500',
          dotColor: 'bg-green-500',
          logo: '📊',
          textColor: 'text-green-700'
        }
      case 'cabrillo advisors':
        return {
          background: 'bg-purple-50 border-l-4 border-l-purple-500',
          dotColor: 'bg-purple-500',
          logo: '💼',
          textColor: 'text-purple-700'
        }
      case 'beyondtrust':
        return {
          background: 'bg-orange-50 border-l-4 border-l-orange-500',
          dotColor: 'bg-orange-500',
          logo: '🔒',
          textColor: 'text-orange-700'
        }
      default:
        return {
          background: 'bg-gray-50 border-l-4 border-l-gray-400',
          dotColor: 'bg-gray-400',
          logo: '🏢',
          textColor: 'text-gray-700'
        }
    }
  }

  const style = getCompanyStyle(company)
  
  return (
    <div className="border-l-2 border-primary/20 pl-6 pb-8 last:pb-0">
      <div className="relative">
        <div className={`absolute -left-8 top-0 w-4 h-4 ${style.dotColor} rounded-full border-4 border-white`}></div>
        <div className={`${style.background} rounded-lg p-6`}>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{style.logo}</span>
              <h3 className="text-xl font-heading font-bold text-gray-900">
                <a 
                  href={companyUrl} 
                  className={`hover:${style.textColor} transition-colors`}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {company}
                </a>
              </h3>
            </div>
            <p className="text-sm text-gray-600 font-medium ml-11">
              {positions.length > 1 ? `${totalYears} years total` : `${dayjs(positions[0].startDate).format('YYYY')} - ${positions[0].endDate ? dayjs(positions[0].endDate).format('YYYY') : 'PRESENT'}`}
            </p>
          </div>
          
          <div className="space-y-6">
            {positions.map((position, index) => (
              <div key={index} className={`${index > 0 ? 'border-t border-gray-200 pt-6' : ''}`}>
                <div className="mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{position.position}</h4>
                  <p className="text-sm text-gray-600">
                    {dayjs(position.startDate).format('MMM YYYY')} - {position.endDate ? dayjs(position.endDate).format('MMM YYYY') : 'Present'}
                  </p>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  {position.summary}
                </p>
                
                <div>
                  <ul className="space-y-2">
                    {position.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="text-sm text-gray-700 flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillBar({ skill }: { skill: Skill }) {
  const percentage = (skill.competency / 5) * 100
  
  // Different colors based on skill level for visual variety
  const getBarColor = (competency: number) => {
    if (competency >= 4) return 'bg-gradient-to-r from-green-500 to-green-400'
    if (competency >= 3) return 'bg-gradient-to-r from-blue-500 to-blue-400'
    return 'bg-gradient-to-r from-yellow-500 to-yellow-400'
  }

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{skill.title}</span>
        <span className="text-xs text-gray-500">{skill.competency}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`${getBarColor(skill.competency)} h-2.5 rounded-full transition-all duration-1000 ease-out`}
          style={{ 
            width: `${percentage}%`,
            animationDelay: '0.2s'
          }}
        ></div>
      </div>
    </div>
  )
}

function SkillsSection({ category }: { category: SkillCategory }) {
  // Different background colors for variety
  const getCategoryColor = (title: string) => {
    if (title.toLowerCase().includes('technical') || title.toLowerCase().includes('programming')) {
      return 'bg-blue-50 border-l-4 border-l-blue-400'
    }
    if (title.toLowerCase().includes('business') || title.toLowerCase().includes('strategy')) {
      return 'bg-green-50 border-l-4 border-l-green-400'
    }
    if (title.toLowerCase().includes('leadership') || title.toLowerCase().includes('communication')) {
      return 'bg-purple-50 border-l-4 border-l-purple-400'
    }
    return 'bg-gray-50 border-l-4 border-l-gray-400'
  }

  return (
    <div className={`${getCategoryColor(category.title)} rounded-lg p-6`}>
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

  // Group work experience by company
  const groupedExperience = workExperience.reduce((acc, job) => {
    if (!acc[job.name]) {
      acc[job.name] = []
    }
    acc[job.name].push(job)
    return acc
  }, {} as Record<string, WorkExperience[]>)

  return (
    <PageLayout currentPage="resume">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-success p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            Resume
          </h1>
          <p className="text-lg text-gray-600">
            Experience, education, and skills
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
                Experience
              </h2>
              <div className="space-y-0">
                {Object.entries(groupedExperience).map(([company, positions]) => (
                  <CompanyExperience key={company} company={company} positions={positions} />
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
                Education
              </h2>
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-l-blue-600 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🐻</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      University of California, Berkeley - Haas School of Business
                    </h3>
                  </div>
                  <p className="text-gray-600 font-medium ml-11">MBA, General Management</p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-l-red-600 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🔴</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      University of Pennsylvania
                    </h3>
                  </div>
                  <p className="text-gray-600 font-medium ml-11">MCIT, Computer and Information Sciences</p>
                </div>
                
                <div className="bg-green-50 border-l-4 border-l-green-600 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">🌲</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Dartmouth College
                    </h3>
                  </div>
                  <p className="text-gray-600 font-medium ml-11">BA, Economics</p>
                </div>
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
              Skills
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