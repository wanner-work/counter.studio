import { Counter } from "@/types/Counter.types"
import { serviceSupabase } from "@/data/serviceSupabase";
import CounterView from "@/components/counter/CounterView";
import { notFound } from "next/navigation";

type CounterPageParams = {
  params: {
    slug: string
  }
}

export const revalidate = 1

export default async function CounterPage({ params: { slug } }: CounterPageParams) {
  const { data } = await serviceSupabase.from('COUNTER').select().eq('id', slug).single() as { data: Counter | null }
  if (!data) {
    notFound()
  }
  return <CounterView init={data} />
}
