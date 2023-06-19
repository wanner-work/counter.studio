import React from 'react'
import Container from "@/components/layout/Container";
import RelativeTime from '@/components/basic/RelativeTime'
import dayjs from 'dayjs'
import ShortNumber from '@/components/basic/ShortNumber'
import { PlusIcon } from '@heroicons/react/20/solid'
import SavedCounters from '@/components/saved/SavedCounters'
import Link from "next/link";

export default function Home() {
  return (<>
      <Container variant="small" classes="pt-32 pb-10">
        <div className="mb-4 flex justify-between">
          <h1 className="text-4xl font-bold">
            counter.studio
          </h1>
        </div>
        <p className="text-gray-400">
          create and share counters with your friends. free, anonymous, real time and open source.
        </p>
      </Container>
      <Container variant="small" classes="mb-8">
          <Link href="/create">
              <button className="py-3 px-4 rounded bg-white text-black font-bold w-full flex justify-between items-center transition hover:opacity-80 active:scale-95">
                  <span className="text-left">
                    create a new counter
                  </span>
                  <span>
                    <PlusIcon className="w-6 h-6 text-black"/>
                  </span>
              </button>
          </Link>
      </Container>

      <Container variant="small" classes="mb-8">
        <h2 className="text-2xl font-bold mb-3">
          your recent counters
        </h2>
        <p className="text-gray-500">
          counters you created or visited recently are stored locally in your browser and will be available here.
        </p>
      </Container>

      <Container variant="wide" classes="max-w-[600px] lg:max-w-[1300px]">
        <div className="grid md:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-4">
          <SavedCounters />
        </div>
      </Container>
  </>
  )
}
