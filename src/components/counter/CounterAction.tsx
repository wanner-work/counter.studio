'use client'

import RelativeTime from '@/components/basic/RelativeTime'
import Rectangle from '@/components/icons/Rectangle'
import useCounter from '@/hooks/useCounter'
import { Tables } from '@/interfaces/supabase/Database'

interface Props {
  counter: Tables<'COUNTER'>
}

export default function CounterAction({ counter }: Props) {
  const { count, increment, decrement } = useCounter(counter)

  return (
    <div className="h-dvh">
      <div className="">
        <h1 className="text-2xl font-bold">{counter.title}</h1>
        {counter.description && (
          <p className="font-light">{counter.description}</p>
        )}
      </div>

      <div className="mt-3">
        updated <RelativeTime date={counter.modified} />
      </div>

      <div className="mt-5">
        <p className="text-8xl">{count}</p>
      </div>

      <div className="mt-5 flex gap-3">
        <Rectangle>
          <button onClick={increment} className="">
            +
          </button>
        </Rectangle>
        <button onClick={decrement} className="">
          -
        </button>
      </div>
    </div>
  )
}
