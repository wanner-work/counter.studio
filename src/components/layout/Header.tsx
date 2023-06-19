import Link from "next/link";
import Container from "@/components/layout/Container";
import React from "react";
import {PlusIcon} from "@heroicons/react/20/solid";

type HeaderProps = {
    hideDescription?: boolean
}

export default function Header({hideDescription = false}: HeaderProps) {
    return (
        <Container variant="small" classes="pt-6 pb-4">
            <div className="mb-4">
                <div className="mb-4 flex justify-between items-end">
                    <Link href="/">
                        <h1 className="text-2xl md:text-4xl font-bold truncate">
                            counter.st<span className="hidden md:inline">u</span>d<span className="hidden md:inline">i</span>o
                        </h1>
                    </Link>
                    {hideDescription && <Link href="/create">
                        <button
                            className="p-[2px] md:p-1 rounded bg-white text-black font-bold w-full flex justify-between items-center transition hover:opacity-80 active:scale-95 disabled:opacity-50">
                            <PlusIcon className="w-6 h-6 text-black"/>
                        </button>
                    </Link>}
                </div>
                {!hideDescription && <p className="text-gray-400">
                    create and share counters with your friends. free, anonymous, real time and open source.
                </p>}
                {hideDescription && <div className="w-full h-[2px] bg-gray-500/30"/>}
            </div>
        </Container>
    )
}
