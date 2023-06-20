'use client'

import Header from '@/components/layout/Header'
import React, { useEffect, useState } from 'react'
import Container from '@/components/layout/Container'
import QRCode from 'react-qr-code'
import { useLocal } from '@/hooks/local'

export default function ShareCode () {
  const { counters, loading } = useLocal()
  const [url, setURL] = useState('')

  useEffect(() => {
    const urlSearchParams = new URLSearchParams()

    for (const counter of counters) {
      urlSearchParams.append('c', counter.id)
    }

    setURL(`https://counter.studio/share?${urlSearchParams.toString()}`)
  }, [counters])

  return <>
    <div className="rounded-xl p-8 bg-gray-500/10 border border-gray-300/10">
      <div className="bg-white p-2 rounded">
        <QRCode className="w-full h-full" value={url} />
      </div>

      <p className="pt-4 text-gray-500 break-all">{url}</p>
    </div>
  </>
}
