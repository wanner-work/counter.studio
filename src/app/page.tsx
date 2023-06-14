'use client'

import { Counter } from "@/types/Counter.types";
import { useState } from "react";
import { TestCounters } from "@/data/Counter.data";
import SavedCounter from "@/components/saved/SavedCounter";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

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
  const [counters, setCounters] = useState<Counter[]>(TestCounters)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-16">
      <h1 className="text-4xl font-bold text-center relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        counter.studio
      </h1>

      <div className="max-w-[800px] w-full mx-3">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">
            create a counter
          </h2>
          <p className="text-gray-500 max-w-[80%]">
            create a counter by clicking the button below. you can then share the link to your counter with others.
          </p>
        </div>

        <button className="px-4 py-3 bg-white text-black font-bold flex justify-between items-center gap-2">
          <span>
            create a counter
          </span>
          <span className="ml-2">
            <ArrowRightIcon className="w-6 h-6 text-black" />
          </span>
        </button>
      </div>

      <div className="max-w-[800px] w-full mx-3">
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
    </main>
  )
}
