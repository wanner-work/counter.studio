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
import Logo from '@/components/layout/Logo'

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
        <Container variant="small" classes="p-8">
            <Logo size="small" />
        </Container>
        <Container variant="small">
            <div className="pb-8">
                <div className="mb-8">
                    <p className="text-gray-500">
                        create a new counter and share it with your friends, family and colleagues.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
                  <div className="col-span-2 flex justify-center items-center">
                    <label className="flex flex-col gap-3 w-full">
                      <span className="font-bold text-white">Title</span>
                      <div className="relative flex justify-center items-center">
                      <input {...register("title", {required: true})}
                             disabled={loading}
                             className="py-3 px-4 text-white relative flex justify-between items-center rounded-xl bg-black/60 border border-gray-300/10 z-10 font-bold w-full transition active:scale-[.98] disabled:opacity-50"
                             type="text"
                             placeholder="The name of the counter"/>
                        <div className="w-full h-full bg-gradient-company absolute top-0 blur-2xl opacity-20" />

                      </div>
                    </label>
                  </div>
                  <div className="col-span-2 flex justify-center items-center">
                    <label className="flex flex-col gap-3 w-full">
                      <span className="font-bold text-white">Description</span>
                      <div className="relative flex justify-center items-center">
                      <textarea {...register("description", {required: true})}
                                disabled={loading}
                                className="py-3 px-4 text-white relative flex justify-between items-center rounded-xl bg-black/60 border border-gray-300/10 z-10 font-bold w-full transition active:scale-[.98] disabled:opacity-50"
                                placeholder="A short description"/>
                      <div className="w-full h-full bg-gradient-company absolute top-0 blur-2xl opacity-20" />
                      </div>
                    </label>
                  </div>

                    <div className="relative mb-8 w-full col-span-2 mt-8 flex justify-center items-center group">
                        <div className="w-full">
                                <button disabled={loading} type="submit" className="py-3 px-4 text-white relative flex justify-between items-center rounded-xl bg-black/60 border border-gray-300/10 z-10 font-bold w-full transition hover:opacity-60 active:scale-95 disabled:opacity-50">
                                  <span className="text-left">
                                    create the counter
                                  </span>
                                    <span>
                                      {loading ? <Cog6ToothIcon className="w-6 h-6 text-white animate-spin"/> : <PlusIcon className="w-6 h-6 text-white"/>}
                                    </span>
                                </button>
                        </div>
                        <div className="w-full h-full bg-gradient-company absolute top-0 blur-2xl opacity-20" />
                    </div>
                </form>
            </div>
        </Container>
    </>
}
