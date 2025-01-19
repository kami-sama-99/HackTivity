import LayoutComp from './components/LayoutComp'
import './globals.css'

export const metadata = {
  title: 'Hacktivity - Code Performance Tracker',
  description: 'Track and improve your coding performance over time',
}

export default function RootLayout({ children }) {
  return (
    <LayoutComp children={children} />
  )
}

