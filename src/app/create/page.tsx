'use client'

import Container from "@/components/layout/Container";
import { PlusIcon } from "@heroicons/react/20/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";
import { Counter, CreateCounterForm } from "@/types/Counter.types";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter()

  const supabase = createClientComponentClient()
  const { handleSubmit, register } = useForm<CreateCounterForm>()

  const onSubmit = async ({ title, description }: CreateCounterForm) => {
    const { data, error } = await supabase.from('COUNTER').insert([
      { title, description },
    ]).select().single()

    void navigator.clipboard.writeText(`${window.location.origin}/counter/${data.id}`)
    router.push(`/counter/${data.id}`)
  }

  return <Container>
    <div className="py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">
          create a counter
        </h2>
        <p className="text-gray-500 max-w-[80%]">
          after you create a counter, you can share the link to your counter with others.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-5">
        <label className="col-span-2 flex flex-col gap-3">
          <span className="font-bold text-white">Title</span>
          <input {...register("title", { required: true })} className="px-4 py-3 bg-white text-black" type="text" placeholder="Christopf Kakk Counter"/>
        </label>
        <label className="col-span-2 flex flex-col gap-3">
          <span className="font-bold text-white">Description</span>
          <textarea {...register("description", { required: true })} className="px-4 py-3 bg-white text-black "
                    placeholder="The counter of how many times christopf is going kakken"/>
        </label>

        <div className="col-span-2 flex flex-col gap-3 mt-6">
          <span className="font-bold text-white">Ready?</span>
          <button type="submit" className="px-4 py-3 bg-white text-black font-bold flex justify-between items-center gap-2 w-full">
            <span>
              create the counter
            </span>
            <span className="ml-2">
              <PlusIcon className="w-6 h-6 text-black"/>
            </span>
          </button>
        </div>

      </form>
    </div>
  </Container>
}
