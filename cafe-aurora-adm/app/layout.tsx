import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const _inter = Inter({ subsets: ['latin'] })
const _playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Café Aurora · Panel de administración',
  description:
    'Panel administrativo de Café Aurora: reservas, pedidos, ingresos y clientes en tiempo real.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FDFAF6' },
    { media: '(prefers-color-scheme: dark)', color: '#17100C' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
