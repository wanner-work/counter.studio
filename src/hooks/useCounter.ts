import changeCounter from '@/actions/counter/changeCounter'
import { Tables } from '@/interfaces/supabase/Database'
import getBrowserClient from '@/methods/supabase/client/getBrowserClient'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'

export default function useCounter(counter: Tables<'COUNTER'>) {
  const [count, setCount] = useState(counter.count)
  const [change, setChange] = useState(0)

  const supabase = getBrowserClient()

  useDebounce(
    () => {
      void changeCounter(counter.id, change)
      setChange(0)
    },
    1000,
    [change]
  )

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'COUNTER',
          filter: `id=eq.${counter.id}`
        },
        (payload) => {
          setCount(payload.new.count)
        }
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [supabase])

  const increment = async () => {
    setCount(count + 1)
    setChange(change + 1)
  }

  const decrement = async () => {
    setCount(count - 1)
    setChange(change - 1)
  }

  return {
    count,
    increment,
    decrement
  }
}
