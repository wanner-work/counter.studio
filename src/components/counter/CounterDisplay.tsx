'use client'

import Header from "@/components/layout/Header";
import {Counter} from "@/types/Counter.types";
import Container from "@/components/layout/Container";
import React from "react";
import {PlusIcon, MinusIcon} from "@heroicons/react/20/solid";
import {useCounter} from "@/hooks/counter";
import RelativeTime from "@/components/basic/RelativeTime";
import dayjs from "dayjs";
import {motion, AnimatePresence} from "framer-motion";
import Logo from '@/components/layout/Logo'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

type CounterDisplayParams = {
    init: Counter
}

export default function CounterDisplay ({ init }: CounterDisplayParams) {
    const { counter, countBefore, disabled, increment, decrement } = useCounter(init)

    return <div className="h-screen">
        <Container variant="small" classes="p-8">
            <Logo size="mobile" classes="sm:hidden" />
            <Logo size="small" classes="hidden sm:flex" />
        </Container>
        <Container variant="small">
            <p className="text-gray-500 text-[14px] italic mb-3 truncate">
                updated <RelativeTime date={dayjs(counter.modified)} />
            </p>
            <h2 className="text-2xl font-bold mb-2 truncate">
                {counter.title}
            </h2>
            <p className="text-gray-500 truncate">
                {counter.description}
            </p>
        </Container>
        <Container variant="small" classes="h-[calc(100vh-114px-82px-112px)] flex justify-center items-center">
            <p className={`text-6xl transition ${disabled && 'text-gray-500'}`}>
                {counter.count}
            </p>
        </Container>
        <div className="fixed bottom-0 w-full py-6">
            <Container variant="small">
                <div className="flex gap-4">
                    <div className="relative w-full flex justify-center items-center group">
                        <div className="w-full">
                            <button disabled={disabled} onClick={() => increment()} className="py-3 px-4 text-white relative flex justify-center items-center rounded-xl bg-black/60 border border-gray-300/10 z-10 font-bold w-full transition hover:opacity-60 active:scale-95 disabled:opacity-50">
                                <PlusIcon className="w-6 h-6 text-white"/>
                            </button>
                        </div>
                        <div className="w-full h-full bg-gradient-company absolute top-0 blur-2xl opacity-20" />
                    </div>
                    <div className="relative w-full flex justify-center items-center group">
                        <div className="w-full">
                            <button disabled={disabled} onClick={() => decrement()} className="py-3 px-4 text-white relative flex justify-center items-center rounded-xl bg-black/60 border border-gray-300/10 z-10 font-bold w-full transition hover:opacity-60 active:scale-95 disabled:opacity-50">
                                <MinusIcon className="w-6 h-6 text-white" />
                            </button>
                        </div>
                        <div className="w-full h-full bg-gradient-company absolute top-0 blur-2xl opacity-20" />
                    </div>
                </div>
            </Container>
        </div>
    </div>
}

