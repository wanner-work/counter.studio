'use client'

import Header from '@/components/layout/Header'
import Container from '@/components/layout/Container'
import React, { useEffect, useState } from 'react'
import ShareCode from '@/components/share/ShareCode'
import { useSearchParams } from 'next/navigation'
import { Counter } from '@/types/Counter.types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import CounterWidget from '@/components/counter/CounterWidget'

let once = false

export default function SharePage () {
  const searchParams = useSearchParams()

  const [counters, setCounters] = useState<Counter[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClientComponentClient()

  useEffect(() => {
    if (once) {
      return
    }
    once = true
    void fetchCounters(searchParams.getAll('c'))
  }, [searchParams])

  const fetchCounters = async (ids: string[]) => {
    const counters: Counter[] = []

    for (const id of ids) {
      const { data } = await supabase.from('COUNTER').select('*').eq('id', id).single() as PostgrestSingleResponse<Counter>

      if (data) {
        if (!counters.find((c) => c.id === data.id)) {
          counters.push(data)
        }
      }
    }

    setCounters(counters)
    setLoading(false)
  }

  if (searchParams.has('c')) {
    return <>
      <Header hideDescription />
      <Container variant="small">
        <div className="">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">
              counters shared with you
            </h2>
            <p className="text-gray-500">
              all the counters that have been shared with you.
            </p>

            {loading && <div className="w-full mt-4 rounded-xl gap-4 p-4 bg-gray-500/10 border border-gray-300/10 text-gray-500">
                loading...
            </div>}
          </div>
        </div>
      </Container>
      <Container variant="wide">
        <div className="grid md:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-4">
          {counters.map((counter) => <CounterWidget key={counter.id} {...counter} />)}
        </div>
      </Container>
    </>
  }

  return <>
    <Header hideDescription />
    <Container variant="small">
      <div className="pb-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            share your counters
          </h2>
          <p className="text-gray-500">
            share all your counters with a url or a qr code. if the url is opened on a different device, the counters will be added to it.
          </p>
        </div>

        <ShareCode />
      </div>
    </Container>
  </>
}
