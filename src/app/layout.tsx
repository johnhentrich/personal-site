import type { Metadata } from 'next'
import { Inter, Raleway } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const raleway = Raleway({ 
  subsets: ['latin'],
  variable: '--font-raleway'
})

export const metadata: Metadata = {
  title: 'John Hentrich',
  description: 'Business Operations & Growth Strategy Professional with 15 years of experience in analytics and scaling digital services.',
  keywords: ['business operations', 'growth strategy', 'analytics', 'Ford', 'digital transformation'],
  authors: [{ name: 'John Hentrich' }],
  openGraph: {
    title: 'John Hentrich',
    description: 'Business Operations & Growth Strategy Professional',
    url: 'https://johnhentrich.com',
    siteName: 'John Hentrich',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'John Hentrich',
    description: 'Business Operations & Growth Strategy Professional',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable}`}>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
