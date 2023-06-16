'use client'

import Container from "@/components/layout/Container"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import { Counter } from "@/types/Counter.types"
import RelativeTime from "@/components/basic/RelativeTime"
import dayjs from "dayjs"
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline'


type CounterPageParams = {
  params: {
    slug: string
  }
}

export default function CounterPage({ params: { slug } }: CounterPageParams) {
  const [inactive, setInactive] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [counter, setCounter] = useState<Counter>()
  const supabase = createClientComponentClient()

  useEffect(() => {
    supabase.from('COUNTER').select('*').eq('id', slug).single().then(({ data }) => {
      console.log('data', data)
      setCounter(data)
    })
  }, [])


  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "COUNTER" },
        (payload) => {
          if (counter && payload.new.count < counter.count) return
          setCounter(payload.new as Counter)
        }
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [supabase, counter])

  const increment = async () => {
    if (inactive) return

    setInactive(true)

    // optimistic update
    if (!counter) return

    setCounter({
      ...counter,
      count: counter.count + 1,
      modified: dayjs()
    })

    const response= await fetch('/api/increment', {
      method: 'POST',
      body: JSON.stringify({
        id: slug
      })
    })

    setInactive(false)
  }

  const copy = () => {
    void navigator.clipboard.writeText(`${window.location.origin}/counter/${slug}`)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return <Container>
    <div className="py-8 flex justify-between items-center mb-8">
      <div className="">
        <div className="text-gray-600 text-sm italic mb-2">
          {counter && <>
              updated <RelativeTime key={counter?.modified.toString()} date={counter?.modified} />
          </>}
        </div>
        <h2 className="text-2xl font-bold mb-2">
          {counter?.title}
        </h2>
        <p className="text-gray-500">
          {counter?.description}
        </p>
      </div>
      <div>
        <button className="text-white text-sm cursor-copy px-3 py-2 bg-gray-500/20 flex gap-2 items-center font-mono" onClick={() => copy()}>
          <span>
            copy link
          </span>
          <span>
            {copied ? <CheckIcon className="w-4 h-4 text-white" /> : <ClipboardDocumentIcon className="w-4 h-4 text-white" />}
          </span>
        </button>
      </div>
    </div>

    <div className="h-[400px] flex justify-center items-center">
      <div onClick={() => increment()} className={`${inactive ? 'cursor-wait text-gray-500' : 'active:scale-[0.9]'} transition text-[100px] cursor-copy font-bold text-center relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]`}>
        {counter?.count}
      </div>
    </div>
  </Container>
}
