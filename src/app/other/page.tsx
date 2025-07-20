import { Metadata } from 'next'
import { PageLayout } from '@/components/template/PageLayout'
import { fetchJsonData } from '@/lib/dataFetcher'

export const metadata: Metadata = {
  title: 'Other | John Hentrich',
  description: 'Personal interests, hobbies, and other aspects of life outside of work.',
}

interface CurrentInterests {
  watching: string
  playing: string
  listening: string
}

interface FavoriteGadget {
  name: string
  emoji: string
}

interface Travel {
  countriesVisited: number
  description: string
  mapUrl: string
}

interface FunFact {
  emoji: string
  text: string
  background: string
}

interface PersonalStats {
  location: string
  diapersChanged: string
}

interface OtherData {
  currentInterests: CurrentInterests
  favoriteGadgets: FavoriteGadget[]
  travel: Travel
  funFacts: FunFact[]
  personalStats: PersonalStats
}

async function getOtherData(): Promise<OtherData> {
  const fallbackData: OtherData = {
    currentInterests: { watching: '', playing: '', listening: '' },
    favoriteGadgets: [],
    travel: { countriesVisited: 0, description: '', mapUrl: '' },
    funFacts: [],
    personalStats: { location: '', diapersChanged: '' }
  }
  
  return await fetchJsonData<OtherData>('other.json', fallbackData)
}

function StatsCounter({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="text-2xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wide">{label}</div>
    </div>
  )
}

export default async function OtherPage() {
  const data = await getOtherData()
  
  // Calculate days since last update (this would be dynamic in a real app)
  const lastUpdate = new Date('2025-07-19')
  const today = new Date()
  const daysSince = Math.floor((today.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <PageLayout currentPage="other">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 border-l-4 border-l-warning p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Other Interests
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Personal interests, hobbies, and life outside of work
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Personal Stats */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Personal Stats
            </h2>
            <div className="grid gap-4 grid-cols-2">
              <StatsCounter value={daysSince} label="Days since site update" />
              <StatsCounter value={data.personalStats.location} label="Current Location" />
              <StatsCounter value={data.travel.countriesVisited} label="Countries Visited" />
              <StatsCounter value={data.personalStats.diapersChanged} label="Diapers Changed" />
            </div>
          </section>

          {/* Current Interests */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Current Interests
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📺 Currently Watching</h3>
                <p className="text-gray-600 dark:text-gray-300">{data.currentInterests.watching}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎮 Currently Playing</h3>
                <p className="text-gray-600 dark:text-gray-300">{data.currentInterests.playing}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎵 Currently Listening</h3>
                <p className="text-gray-600 dark:text-gray-300">{data.currentInterests.listening}</p>
              </div>
            </div>
          </section>

          {/* Favorite Gadgets */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Favorite Gadgets
            </h2>
            <div className="space-y-3">
              {data.favoriteGadgets.map((gadget) => (
                <div key={gadget.name} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-2xl mr-3">{gadget.emoji}</span>
                  <h4 className="font-medium text-gray-900 dark:text-white">{gadget.name}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* Travel */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
              Travel & Places
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {data.travel.description}
              </p>
              <a 
                href={data.travel.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
              >
                View Travel Map →
              </a>
            </div>
          </section>
        </div>

        {/* Fun Facts */}
        <section className="mt-12">
          <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">
            Fun Facts
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {data.funFacts.map((fact, index) => (
              <div key={index} className={`text-center p-6 ${fact.background} dark:bg-gray-700 rounded-lg`}>
                <span className="text-3xl mb-2 block">{fact.emoji}</span>
                <p className="text-sm text-gray-700 dark:text-gray-300">{fact.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  )
}