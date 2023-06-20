import { Counter, CounterLocalStorage } from '@/types/Counter.types'
import { useEffect, useState } from 'react'
import * as localforage from 'localforage'
import { useCountersAtom } from '@/stores/counters'

const store = localforage.createInstance({
  name: 'counters'
})

export function useLocal() {
  const [loading, setLoading] = useState<boolean>(true)
  const [counters, setCounters] = useCountersAtom()

  useEffect(() => {
    all().then(counters => {
      setCounters(counters)
      setLoading(false)
    })
  }, [])

  async function all(): Promise<Counter[]> {
    const counters: Counter[] = []

    for (const key of await store.keys()) {
      try {
        const counter = await store.getItem<CounterLocalStorage>(key)
        if (!counter) {
          continue
        }
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

    return counters.sort((a, b) => b.modified.localeCompare(a.modified))
  }

  async function reload () {
    setLoading(true)
    setCounters([])
    const counters = await all()
    setCounters(counters)
    setLoading(false)
  }

  return {
    reload,
    loading,
    counters
  }
}

export function useLocalActions () {
  const { reload } = useLocal()

  async function save(counter: Counter) {
    const item = await store.getItem<CounterLocalStorage>(counter.id)

    if (item && item.count === counter.count) {
      return
    }

    await store.setItem(counter.id, {
      ...counter,
      type: 'counter'
    })
    await reload()
  }

  async function has(id: string): Promise<boolean> {
    const item = await store.getItem<CounterLocalStorage>(id)
    return !!item
  }

  async function remove(id: string) {
    await store.removeItem(id)
    await reload()
  }

  return {
    save,
    has,
    remove
  }
}
