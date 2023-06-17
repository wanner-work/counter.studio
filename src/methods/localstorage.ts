import {Counter, CounterLocalStorage} from "@/types/Counter.types";

export function save(counter: Counter) {
    localStorage.setItem(counter.id, JSON.stringify({...counter, type: 'counter'}))
}

export function loadAll(): Counter[] {
    const keys = Object.keys(localStorage)
    const counters: Counter[] = []

    for (const key of keys) {
        try {
            const counter = JSON.parse(localStorage.getItem(key) as string) as CounterLocalStorage
            if (counter.type === 'counter') {
                counters.push({
                    id: counter.id,
                    count: counter.count,
                    title: counter.title,
                    description: counter.description,
                    modified: counter.modified
                })
            }
        } catch (error) {
            // continue
        }
    }

    return counters
}
