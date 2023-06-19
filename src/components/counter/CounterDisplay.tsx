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

type CounterDisplayParams = {
    init: Counter
}

export default function CounterDisplay ({ init }: CounterDisplayParams) {
    const { counter, countBefore, disabled, increment, decrement } = useCounter(init)

    return <div className="h-screen">
        <Header hideDescription showCreateButton />
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
                    <button disabled={disabled} onClick={() => increment()} className="py-3 px-4 rounded bg-white text-black font-bold w-full flex justify-center items-center transition hover:opacity-80 active:scale-95 disabled:opacity-50">
                        <PlusIcon className="w-6 h-6 text-black"/>
                    </button>
                    <button disabled={disabled} onClick={() => decrement()} className="py-3 px-4 rounded bg-white text-black font-bold w-full flex justify-center items-center transition hover:opacity-80 active:scale-95 disabled:opacity-50">
                        <MinusIcon className="w-6 h-6 text-black"/>
                    </button>
                </div>
            </Container>
        </div>
    </div>
}

