import { Inter } from 'next/font/google'

import './globals.css'

// Components
import Navbar from '../components/Navbar'
import Providers from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Auctioneer',
  description: 'Experience the thrill of Auctioneer.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className='pt-24'>{children}</div>
        </Providers>
      </body>
    </html>
  )
}
