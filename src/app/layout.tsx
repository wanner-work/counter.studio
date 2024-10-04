import { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'

import Box from '@wanner.work/box'
import '../styles/globals.css'

const poppins = Poppins({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {
  metadataBase: new URL('https://counter.studio'),
  title: 'counter.studio - create and share your counters',
  description:
    'create and share counters with your friends. free, anonymous, real time and open source.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="">
      <body className={poppins.className}>
        <Box width="small" align="center">
          {children}
        </Box>
      </body>
    </html>
  )
}
