'use client'

import Header from "@/components/layout/Header";
import {Counter} from "@/types/Counter.types";
import Container from "@/components/layout/Container";
import React, {useState} from "react";

type CounterDisplayParams = {
    init: Counter
}

export default function CounterDisplay ({ init }: CounterDisplayParams) {
    const [counter, setCounter] = useState<Counter>(init)

    return <>
        <Header hideDescription />
        <Container variant="small">
            <h2 className="text-2xl font-bold mb-3">
                {counter.title}
            </h2>
            <p className="text-gray-500">
                {counter.description}
            </p>
        </Container>
    </>
}
