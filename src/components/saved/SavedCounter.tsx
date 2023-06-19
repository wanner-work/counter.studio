'use client'

import {Counter} from "@/types/Counter.types"
import ShortNumber from "@/components/basic/ShortNumber"
import dayjs from "dayjs"
import RelativeTime from "@/components/basic/RelativeTime";
import Link from "next/link";
import React, {useEffect} from 'react'
import {useCounter} from "@/hooks/counter";

export default function SavedCounter(init: Counter) {
    const { counter } = useCounter(init)

    return (
        <Link href={`/counter/${counter.id}`} className="">
            <div className="w-full lg:min-w-[300px] lg:max-w-[400px] rounded-xl grid grid-cols-saved-counter gap-4 p-6 bg-gray-500/10 border border-gray-300/10">
                <div className="grid place-items-center">
                    <p className="font-bold text-[20px]"><ShortNumber number={counter.count}/></p>
                </div>
                <div className="flex flex-col">
                    <h3 className="text-xl font-bold truncate mb-[2px]">{counter.title}</h3>
                    <span className="text-gray-600 text-sm italic truncate">updated <RelativeTime date={dayjs(counter.modified)}/></span>
                </div>
                <div>
                </div>
            </div>
        </Link>
    )
}
