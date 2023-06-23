'use client'

import React from 'react'
import Container from "@/components/layout/Container";
import { PlusIcon } from '@heroicons/react/20/solid'
import SavedCounters from '@/components/saved/SavedCounters'
import Link from "next/link";
import Header from "@/components/layout/Header";
import { TrashIcon } from '@heroicons/react/24/outline'
import Logo from '@/components/layout/Logo'

export default function Home() {
  return (<div className="pt-6 md:pt-16">
      <Container variant="small" classes="mt-8 mb-10">
        <Logo size="medium" classes="hidden md:flex flex-col gap-8 mb-4" />
        <Logo size="small" classes="md:hidden flex-col gap-8 mb-4" />
        <p className="text-gray-400 pt-6 text-center">
          create and share counters with your friends. free, anonymous, real time and open source.
        </p>
      </Container>
      <Container variant="small" classes="relative mb-8 flex justify-center items-center group">
        <div className="w-full relative">
          <div className="relative w-full">
            <Link href="/create">
              <button className="py-3 px-4 text-white relative flex justify-between items-center rounded-xl bg-black/60 border border-gray-300/10 z-10 font-bold w-full transition hover:opacity-60 active:scale-95">
                  <span className="text-left">
                    create a new counter
                  </span>
                <span>
                    <PlusIcon className="w-6 h-6 text-white"/>
                  </span>
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full h-full bg-gradient-company absolute top-0 blur-2xl opacity-20 will-change-auto" />
      </Container>

      <Container variant="small" classes="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">
            your recent counters
          </h2>
          <div className="relative flex justify-center items-center">
            <div>
              <Link href="/sync">
                <button className="py-1 pb-[7px] px-3 text-white relative flex justify-between items-center rounded-xl bg-black/60 border border-gray-300/10 z-10 font-bold w-full transition hover:opacity-80 active:scale-95">
                  sync
                </button>
              </Link>
            </div>
            <div className="w-full h-full bg-gradient-company absolute top-0 blur-2xl opacity-30" />
          </div>
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
