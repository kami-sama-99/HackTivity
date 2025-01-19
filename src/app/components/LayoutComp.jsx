'use client'

import { SessionProvider } from 'next-auth/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function LayoutComp({children}) {
    return (<SessionProvider>
            <html lang="en">
            <body className={`${inter.className} bg-navy-900 text-white`}>
            <main>{children}</main>
            </body>
        </html>
    </SessionProvider>)
}