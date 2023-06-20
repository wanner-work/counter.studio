import {Counter} from "@/types/Counter.types";
import {useEffect, useState} from "react";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { useLocalActions } from '@/hooks/local'

export function useCounter(init: Counter) {
    const [disabled, setDisabled] = useState(false)
    const [countBefore, setCountBefore] = useState(init.count)
    const [counter, setCounter] = useState(init)

    const { save } = useLocalActions()

    const supabase = createClientComponentClient()

    useEffect(() => {
        void save(counter)
    }, [])


    useEffect(() => {
        void save(init)
        supabase.from('COUNTER').select('*').eq('id', init.id).single().then(({ data }) => {
            setCounter(data)
            void save(data)
        })
    }, [])


    useEffect(() => {
        const channel = supabase
            .channel('*')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'COUNTER', filter: 'id=eq.' + init.id },
                (payload) => {
                    setCountBefore(payload.old.count)
                    setCounter(payload.new as Counter)
                    void save(payload.new as Counter)
                }
            )
            .subscribe()

        return () => {
            void supabase.removeChannel(channel)
        }
    }, [supabase])

    const increment = async () => {
        if (disabled) return

        setDisabled(true)
        setCountBefore(counter.count)
        setCounter({
            ...counter,
            modified: dayjs().toString(),
            count: counter.count + 1
        })
        await persist()
        setDisabled(false)
    }

    const decrement = async () => {
        if (disabled) return

        setDisabled(true)
        setCountBefore(counter.count)
        setCounter({
            ...counter,
            modified: dayjs().toString(),
            count: counter.count - 1
        })
        await persist(true)
        setDisabled(false)
    }

    const persist = async (decrement: boolean = false) => {
        await fetch('/api/increment', {
            method: 'POST',
            body: JSON.stringify({
                id: init.id,
                minus: decrement
            })
        })
    }

    return {
        disabled,
        counter,
        countBefore,
        increment,
        decrement
    }
}
