import { atom, useAtom } from 'jotai'
import { Counter } from '@/types/Counter.types'

const countersAtom = atom<Counter[]>([])
export const useCountersAtom = () => useAtom(countersAtom)
