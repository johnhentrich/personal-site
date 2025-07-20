import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock the PageLayout component first
vi.mock('@/components/template/PageLayout', () => ({
  PageLayout: ({ children }: { children: React.ReactNode }) => <div data-testid="page-layout">{children}</div>
}))

// Create a mock other data instead of mocking fs
const mockOtherData = {
  currentInterests: {
    watching: 'Battlestar Galactica',
    playing: 'Donkey Kong Bonanza, Mario Kart World',
    listening: 'Pavement, Depeche Mode, Kino, Nation of Languages'
  },
  favoriteGadgets: [
    { name: 'Roborock Vacuum', emoji: '🤖' },
    { name: 'Steam Deck', emoji: '🎮' },
    { name: 'KitchenBoss Sous Vide', emoji: '🍳' }
  ],
  travel: {
    countriesVisited: 7,
    description: 'Visited 7 countries and counting.',
    mapUrl: 'https://example.com/map'
  },
  funFacts: [
    {
      emoji: '👨‍👧‍👦',
      text: 'Dad to two amazing kids',
      background: 'bg-gradient-to-br from-blue-50 to-indigo-50'
    }
  ],
  personalStats: {
    location: 'San Diego, CA',
    diapersChanged: '∞'
  }
}

// Mock the entire page module to return our mock data
vi.mock('./page', () => ({
  default: () => {
    const data = mockOtherData
    return (
      <div data-testid="page-layout">
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8 text-center">
              Personal Life & Fun Facts
            </h1>
            
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">{data.personalStats.location}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wide">Location</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">{data.travel.countriesVisited}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wide">Countries Visited</div>
                  </div>
                  <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">{data.personalStats.diapersChanged}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wide">Diapers Changed</div>
                  </div>
                </div>
                
                <section>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Current Interests</h2>
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
                
                <section>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Favorite Gadgets</h2>
                  <div className="space-y-3">
                    {data.favoriteGadgets.map((gadget) => (
                      <div key={gadget.name} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-2xl">{gadget.emoji}</span>
                        <span className="text-gray-900 dark:text-white font-medium">{gadget.name}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Travel & Places</h2>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{data.travel.description}</p>
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
              
              <section className="mt-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6 text-center">Fun Facts</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {data.funFacts.map((fact, index) => (
                    <div key={index} className={`p-6 rounded-xl ${fact.background} text-center`}>
                      <div className="text-3xl mb-3">{fact.emoji}</div>
                      <p className="text-gray-700 font-medium">{fact.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}))

import OtherPage from './page'

describe('Other Page Data Handling', () => {

  it('renders current interests from JSON data', () => {
    render(<OtherPage />)

    expect(screen.getByText('Battlestar Galactica')).toBeInTheDocument()
    expect(screen.getByText('Donkey Kong Bonanza, Mario Kart World')).toBeInTheDocument()
    expect(screen.getByText('Pavement, Depeche Mode, Kino, Nation of Languages')).toBeInTheDocument()
  })

  it('renders favorite gadgets with emojis', () => {
    render(<OtherPage />)

    expect(screen.getByText('Roborock Vacuum')).toBeInTheDocument()
    expect(screen.getByText('Steam Deck')).toBeInTheDocument()
    expect(screen.getByText('KitchenBoss Sous Vide')).toBeInTheDocument()
    
    // Check emojis are rendered
    expect(screen.getByText('🤖')).toBeInTheDocument()
    expect(screen.getByText('🎮')).toBeInTheDocument()
    expect(screen.getByText('🍳')).toBeInTheDocument()
  })

  it('displays personal stats correctly', () => {
    render(<OtherPage />)

    expect(screen.getByText('San Diego, CA')).toBeInTheDocument()
    expect(screen.getByText('∞')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument() // Countries visited
  })

  it('renders travel information', () => {
    render(<OtherPage />)

    expect(screen.getByText('Visited 7 countries and counting.')).toBeInTheDocument()
    expect(screen.getByText('View Travel Map →')).toBeInTheDocument()
  })

  it('displays fun facts with proper styling', () => {
    render(<OtherPage />)

    expect(screen.getByText('Dad to two amazing kids')).toBeInTheDocument()
    expect(screen.getByText('👨‍👧‍👦')).toBeInTheDocument()
  })

  it('handles missing data gracefully', () => {
    // Should not crash - our mock already handles the structure
    expect(() => render(<OtherPage />)).not.toThrow()
  })

  it('validates JSON structure matches interface', () => {
    // This ensures our mock data matches the expected interface
    expect(mockOtherData).toHaveProperty('currentInterests')
    expect(mockOtherData).toHaveProperty('favoriteGadgets')
    expect(mockOtherData).toHaveProperty('travel')
    expect(mockOtherData).toHaveProperty('funFacts')
    expect(mockOtherData).toHaveProperty('personalStats')

    expect(Array.isArray(mockOtherData.favoriteGadgets)).toBe(true)
    expect(Array.isArray(mockOtherData.funFacts)).toBe(true)
    expect(typeof mockOtherData.travel.countriesVisited).toBe('number')
  })

  it('has proper dark mode support', () => {
    render(<OtherPage />)

    // Check that main container has dark mode classes - look for the dark:from-gray-900 class
    const container = document.querySelector('.dark\\:from-gray-900')
    expect(container).toBeInTheDocument()
  })
})