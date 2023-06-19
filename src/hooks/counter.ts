import {Counter} from "@/types/Counter.types";
import {useEffect, useState} from "react";
import { save } from "@/methods/localstorage";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";

export function useCounter(init: Counter) {
    const [disabled, setDisabled] = useState(false)
    const [counter, setCounter] = useState(init)

    const supabase = createClientComponentClient()


    useEffect(() => {
        save(counter)
    }, [])


    useEffect(() => {
        save(init)
        supabase.from('COUNTER').select('*').eq('id', init.id).single().then(({ data }) => {
            setCounter(data)
            save(data)
        })
    }, [])


    useEffect(() => {
        const channel = supabase
            .channel('*')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'COUNTER', filter: 'id=eq.' + init.id },
                (payload) => {
                    setCounter(payload.new as Counter)
                    save(payload.new as Counter)
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
        increment,
        decrement
    }
}
