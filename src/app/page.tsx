import React from 'react'
import Container from "@/components/layout/Container";
import { PlusIcon } from '@heroicons/react/20/solid'
import SavedCounters from '@/components/saved/SavedCounters'
import Link from "next/link";
import Header from "@/components/layout/Header";
import { TrashIcon } from '@heroicons/react/24/outline'

export default function Home() {
  return (<div className="pt-6 md:pt-16">
      <Header />
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
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">
            your recent counters
          </h2>
          <Link href="/share">
            <button className="transition rounded px-2 py-1 flex bg-gray-500/30 hover:bg-white/10">
              share
            </button>
          </Link>
        </div>
        <p className="text-gray-500">
          counters you created or visited recently are stored locally in your browser and will be available here.
        </p>
      </Container>

      <Container variant="wide" classes="max-w-[600px] lg:max-w-[1300px] pb-6">
        <SavedCounters />
      </Container>
  </div>
  )
}
