import { Metadata } from 'next'
import { PageLayout } from '@/components/template/PageLayout'

export const metadata: Metadata = {
  title: 'Contact | John Hentrich',
  description: 'Get in touch with John Hentrich for business opportunities, collaborations, or professional discussions.',
}

function ContactMethod({ 
  icon, 
  title, 
  description, 
  link, 
  linkText 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  link: string
  linkText: string
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          <a 
            href={link}
            className="text-primary hover:text-primary-dark font-medium"
            target={link.startsWith('http') ? '_blank' : undefined}
            rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {linkText} →
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <PageLayout currentPage="contact">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-warning p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I&apos;m always interested in discussing business opportunities, growth strategy, 
            digital transformation, or potential collaborations. Feel free to reach out!
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <ContactMethod
            icon={
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Email"
            description="Best way to reach me for professional inquiries and business discussions."
            link="mailto:hello@johnhentrich.com"
            linkText="hello@johnhentrich.com"
          />

          <ContactMethod
            icon={
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            }
            title="LinkedIn"
            description="Connect with me professionally and view my detailed work history."
            link="https://www.linkedin.com/in/johnhentrich"
            linkText="linkedin.com/in/johnhentrich"
          />

          <ContactMethod
            icon={
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            }
            title="GitHub"
            description="Explore my technical projects and open source contributions."
            link="https://github.com/johnhentrich"
            linkText="github.com/johnhentrich"
          />

          <ContactMethod
            icon={
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 0V3" />
              </svg>
            }
            title="Personal Website"
            description="You're here! This site showcases my work, experience, and interests."
            link="https://johnhentrich.com"
            linkText="johnhentrich.com"
          />
        </div>

        {/* Professional Focus Areas */}
        <section className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8 text-center">
            Areas of Interest
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Growth Strategy</h3>
              <p className="text-sm text-gray-600">Scaling digital products and services through data-driven insights</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Digital Transformation</h3>
              <p className="text-sm text-gray-600">Modernizing business processes and technology infrastructure</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Data & Analytics</h3>
              <p className="text-sm text-gray-600">Leveraging data to drive business decisions and product improvements</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}