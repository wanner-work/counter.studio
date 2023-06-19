'use client'

import Container from "@/components/layout/Container";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useForm} from "react-hook-form";
import {Counter, CreateCounterForm} from "@/types/Counter.types";
import {useRouter} from "next/navigation";
import Link from "next/link";
import React, {useState} from "react";
import {PlusIcon} from "@heroicons/react/20/solid";
import Header from "@/components/layout/Header";

export default function Create() {
    const router = useRouter()

    const supabase = createClientComponentClient()
    const {handleSubmit, register} = useForm<CreateCounterForm>()
    const [loading, setLoading] = useState(false)

    const onSubmit = async ({title, description}: CreateCounterForm) => {
        setLoading(true)
        const {data, error} = await supabase.from('COUNTER').insert([
            {title, description},
        ]).select().single()

        void navigator?.clipboard?.writeText(`${window.location.origin}/counter/${data.id}`)
        router.push(`/counter/${data.id}`)
    }

    return <>
        <Header hideDescription />
        <Container variant="small">
            <div className="pb-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                        create a counter
                    </h2>
                    <p className="text-gray-500">
                        create a new counter and share it with your friends.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
                    <label className="col-span-2 flex flex-col gap-3">
                        <span className="font-bold text-white">Title</span>
                        <input {...register("title", {required: true})}
                               disabled={loading}
                               className="transition px-4 py-3 bg-white text-black rounded disabled:opacity-50"
                               type="text"
                               placeholder="The name of the counter"/>
                    </label>
                    <label className="col-span-2 flex flex-col gap-3">
                        <span className="font-bold text-white">Description</span>
                        <textarea {...register("description", {required: true})}
                                  disabled={loading}
                                  className="transition px-4 py-3 bg-white text-black rounded disabled:opacity-50"
                                  placeholder="A short description"/>
                    </label>

                    <div className="col-span-2 flex flex-col gap-3 mt-6 items-end">
                        <button type="submit"
                                disabled={loading}
                                className="py-3 px-4 rounded bg-white text-black font-bold w-full flex justify-between items-center transition hover:opacity-80 active:scale-95 disabled:opacity-50">
            <span>
              create the counter
            </span>
                            <span className="ml-2">
                                {loading ? <Cog6ToothIcon className="w-6 h-6 text-black animate-spin"/> : <PlusIcon className="w-6 h-6 text-black"/>}

            </span>
                        </button>
                    </div>

                </form>
            </div>
        </Container>
    </>
}
