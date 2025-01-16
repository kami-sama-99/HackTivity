import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hacktivity - Code Performance Tracker',
  description: 'Track and improve your coding performance over time',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy-900 text-white`}>
        <main>{children}</main>
      </body>
    </html>
  )
}

