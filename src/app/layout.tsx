import './globals.css'
import { Inter, Roboto_Mono } from 'next/font/google'
import React from "react";
import { Metadata } from 'next'

const roboto = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://counter.studio'),
  title: 'counter.studio - create and share your counters',
  description: 'create and share counters with your friends. free, anonymous, real time and open source.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
