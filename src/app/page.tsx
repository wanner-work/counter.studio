'use client'

import { Counter } from "@/types/Counter.types";
import { useEffect, useState } from 'react'
import { TestCounters } from "@/data/Counter.data";
import SavedCounter from "@/components/saved/SavedCounter";
import { PlusIcon } from "@heroicons/react/20/solid";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { loadAll } from "@/methods/localstorage";

const sortCounters = (a: Counter, b: Counter) => {
  if (a.modified > b.modified) {
    return -1
  }
  if (a.modified < b.modified) {
    return 1
  }
  return 0
}

export default function Home() {
  const [counters, setCounters] = useState<Counter[]>([])

  useEffect(() => {
    setCounters(loadAll().sort(sortCounters))
  }, [])

  return (
    <Container>
      <div className="py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            create a counter
          </h2>
          <p className="text-gray-500 max-w-[80%]">
            create a counter by clicking the button below. you can then share the link to your counter with others.
          </p>
        </div>

        <Link href={'/create'}>
          <button className="px-4 py-3 bg-white text-black font-bold flex justify-between items-center gap-2">
            <span>
              create a counter
            </span>
            <span className="ml-2">
              <PlusIcon className="w-6 h-6 text-black" />
            </span>
          </button>
        </Link>
      </div>

      <div className="py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            saved counters
          </h2>
          <p className="text-gray-500 max-w-[80%]">
            the references to these counters are saved in your browser's local storage. they will persist even if you close the tab or browser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {counters.sort(sortCounters).map((counter) =>
            <SavedCounter key={counter.id}
                          id={counter.id}
                          count={counter.count}
                          title={counter.title}
                          description={counter.description}
                          modified={counter.modified}
            />
          )}
        </div>
      </div>
    </Container>
  )
}
