import { Metadata } from 'next'
import { PageLayout } from '@/components/template/PageLayout'

export const metadata: Metadata = {
  title: 'Other | John Hentrich',
  description: 'Personal interests, hobbies, and other aspects of life outside of work.',
}

function StatsCounter({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="text-center p-6 bg-gray-50 rounded-lg">
      <div className="text-2xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-gray-600 uppercase tracking-wide">{label}</div>
    </div>
  )
}

export default function OtherPage() {
  // Calculate days since last update (this would be dynamic in a real app)
  const lastUpdate = new Date('2025-07-19')
  const today = new Date()
  const daysSince = Math.floor((today.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <PageLayout currentPage="other">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-warning p-8 lg:p-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-4">
            Other Interests
          </h1>
          <p className="text-lg text-gray-600">
            Personal interests, hobbies, and life outside of work
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Personal Stats */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
              Personal Stats
            </h2>
            <div className="grid gap-4 grid-cols-2">
              <StatsCounter value={daysSince} label="Days since site update" />
              <StatsCounter value="San Diego, CA" label="Current Location" />
              <StatsCounter value="7" label="Countries Visited" />
              <StatsCounter value="∞" label="Diapers Changed" />
            </div>
          </section>

          {/* Current Interests */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
              Current Interests
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">📺 Currently Watching</h3>
                <p className="text-gray-600">Battlestar Galactica</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🎮 Currently Playing</h3>
                <p className="text-gray-600">Donkey Kong Bonanza, Mario Kart World</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🎵 Currently Listening</h3>
                <p className="text-gray-600">Pavement, Depeche Mode, Kino, Nation of Languages</p>
              </div>
            </div>
          </section>

          {/* Favorite Gadgets */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
              Favorite Gadgets
            </h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">🤖</span>
                <div>
                  <h4 className="font-medium text-gray-900">Roborock Vacuum</h4>
                  <p className="text-sm text-gray-600">Automated cleaning perfection</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">🎮</span>
                <div>
                  <h4 className="font-medium text-gray-900">Steam Deck</h4>
                  <p className="text-sm text-gray-600">Portable gaming powerhouse</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl mr-3">🍳</span>
                <div>
                  <h4 className="font-medium text-gray-900">Anova Sous Vide</h4>
                  <p className="text-sm text-gray-600">Precision cooking made easy</p>
                </div>
              </div>
            </div>
          </section>

          {/* Travel */}
          <section>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">
              Travel & Places
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Visited 7 countries and counting.
              </p>
              <a 
                href="https://www.google.com/maps/d/u/0/edit?mid=1ms8A3SDGwsct3ENuw9SkugYzb1LsNUjG&usp=sharing"
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
          <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 text-center">
            Fun Facts
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <span className="text-3xl mb-2 block">👨‍👧‍👦</span>
              <p className="text-sm text-gray-700">Dad to two amazing kids who keep life interesting</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <span className="text-3xl mb-2 block">🛠️</span>
              <p className="text-sm text-gray-700">Love tinkering with home automation and smart home setups</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
              <span className="text-3xl mb-2 block">📊</span>
              <p className="text-sm text-gray-700">Data visualization nerd who finds patterns everywhere</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}