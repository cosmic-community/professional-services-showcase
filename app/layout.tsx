import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Don\'t Starve - Survival Game',
  description: 'A browser-based survival game inspired by Don\'t Starve. Gather resources, craft items, and survive in a mysterious world.',
  keywords: 'survival game, don\'t starve, browser game, javascript game, survival',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen bg-gray-900 text-white">
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}