'use client'

import {Counter} from "@/types/Counter.types"
import ShortNumber from "@/components/basic/ShortNumber"
import dayjs from "dayjs"
import RelativeTime from "@/components/basic/RelativeTime";
import Link from "next/link";
import React, { MouseEvent } from 'react'
import {useCounter} from "@/hooks/counter";
import { TrashIcon } from '@heroicons/react/24/outline'
import { useLocalActions } from '@/hooks/local'

export default function CounterWidget(init: Counter) {
    const { counter } = useCounter(init)
    const { remove } = useLocalActions()

    const removeHandler = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        void remove(counter.id)
    }

    return (
        <Link href={`/counter/${counter.id}`} className="">
            <div className="group w-full lg:w-[400px] rounded-xl flex flex-col md:grid md:grid-cols-saved-counter gap-4 p-6 bg-gray-500/10 border border-gray-300/10">
                <div className="grid place-items-center">
                    <p className="font-bold text-[20px]"><ShortNumber key={counter.count} number={counter.count}/></p>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl text-center md:text-left font-bold md:truncate mb-[2px]">{counter.title}</h3>
                    <span className="text-gray-600 text-center md:text-left text-sm italic md:truncate">updated <RelativeTime date={dayjs(counter.modified)}/></span>
                </div>
                <div className="group/button transition rounded p-3 flex bg-gray-500/10 hover:bg-red-600/10 md:bg-transparent md:hidden md:group-hover:flex justify-center items-center" onClick={removeHandler}>
                    <TrashIcon className="w-5 h-5 md:w-6 md:h-6 transition text-gray-500 hover:text-red-600 group-hover/button:text-red-600" />
                </div>
            </div>
        </Link>
    )
}
