import { Counter } from "@/types/Counter.types"
import { serviceSupabase } from "@/data/serviceSupabase";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from 'next'
import CounterDisplay from "@/components/counter/CounterDisplay";

type CounterPageParams = {
  params: {
    slug: string
  }
}

export const revalidate = 0

export async function generateMetadata(
  { params: { slug } }: CounterPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data } = await serviceSupabase.from('COUNTER').select().eq('id', slug).single() as { data: Counter | null }
  if (!data) {
    // ignore this page if the counter doesn't exist
    return {
      title: 'counter not found - counter.studio',
      description: 'the requested counter could not be found.'
    }
  }

  return {
    title: `${data.title} - counter.studio`,
    description: `${data.description} - incremented ${data.count} times.`
  }
}

export default async function CounterPage({ params: { slug } }: CounterPageParams) {
  const { data } = await serviceSupabase.from('COUNTER').select().eq('id', slug).single() as { data: Counter | null }
  if (!data) {
    notFound()
  }
  return <CounterDisplay init={data} />
}
