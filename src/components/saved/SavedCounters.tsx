'use client'

import { useLocal } from '@/hooks/local'
import React from 'react'
import Container from '@/components/layout/Container'
import CounterWidget from '@/components/counter/CounterWidget'

export default function SavedCounters () {
  const { counters, loading } = useLocal()

  if (loading) {
    return <Container variant="small">
      <div className="w-full rounded-xl gap-4 p-4 bg-gray-500/10 border border-gray-300/10 text-gray-500">
        loading...
      </div>
    </Container>
  }

  if (counters.length === 0) {
    return <Container variant="small">
      <div className="w-full rounded-xl gap-4 p-4 bg-gray-500/10 border border-gray-300/10 text-gray-500">
        no counters saved yet
      </div>
    </Container>
  }

  return <div className="grid md:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-4">
    {counters.map((counter) => <CounterWidget key={counter.id} {...counter} />)}
  </div>
}