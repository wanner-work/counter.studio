'use client'

import React, { useEffect, useState } from 'react'
import { Counter } from '@/types/Counter.types'
import { loadAll } from '@/methods/localstorage'
import SavedCounter from '@/components/saved/SavedCounter'
import Link from 'next/link'
import ShortNumber from '@/components/basic/ShortNumber'
import RelativeTime from '@/components/basic/RelativeTime'
import dayjs from 'dayjs'

type SavedCountersParams = {
  amount?: number
}

export default function SavedCounters({ amount }: SavedCountersParams) {
  const sortCounters = (a: Counter, b: Counter) => {
    if (a.modified > b.modified) {
      return -1
    }
    if (a.modified < b.modified) {
      return 1
    }
    return 0
  }

  const [counters, setCounters] = useState<Counter[]>([])

  useEffect(() => {
    const counters = loadAll().sort(sortCounters)

    if (amount) {
      setCounters(counters.slice(0, amount))
    } else {
      setCounters(counters)
    }

    console.log('counters', counters)
  }, [])

  return <>
    {counters.map((counter) =>
      <SavedCounter key={counter.id}
                    id={counter.id}
                    count={counter.count}
                    title={counter.title}
                    description={counter.description}
                    modified={counter.modified}
      />
    )}
    {counters.length === 0 && <div className="max-w-[300px] lg:min-w-[300px] rounded-xl p-6 bg-gray-500/10 border border-gray-300/10">
        <p className="text-center">no counters saved</p>
    </div>}
    {amount && counters.length + 1 > amount && <div className="col-span-2 w-full flex justify-center">
        <Link href={'/dashboard'}>
            <button className="px-3 py-2 p-5 text-gray-300 font-light bg-gray-500/10 border border-gray-300/10 flex justify-between items-center gap-2">
              <span>show all</span>
            </button>
        </Link>
    </div>}
  </>
}