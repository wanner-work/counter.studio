import './globals.css'
import { Inter, Roboto_Mono } from 'next/font/google'
import React from "react";
import { Metadata } from 'next'

const roboto = Roboto_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'counter.studio - create and share your counters',
  description: 'create and share counters with your friends. free, anonymous, real time and open source.',
  openGraph: {
    images: [
      {
        url: 'https://counter.studio/social.png',
      }
    ]
  }
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
