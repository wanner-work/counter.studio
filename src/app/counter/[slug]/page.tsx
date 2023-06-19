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

export const revalidate = 1

export async function generateMetadata(
  { params: { slug } }: CounterPageParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { data } = await serviceSupabase.from('COUNTER').select().eq('id', slug).single() as { data: Counter | null }
  if (!data) {
    // ignore this page if the counter doesn't exist
    return {
      title: '404 - Page Not Found',
      description: 'This page does not exist.'
    }
  }

  return {
    title: `${data.title} - counter.studio`,
    description: `This counter has been incremented ${data.count} times.`
  }
}

export default async function CounterPage({ params: { slug } }: CounterPageParams) {
  const { data } = await serviceSupabase.from('COUNTER').select().eq('id', slug).single() as { data: Counter | null }
  if (!data) {
    notFound()
  }
  return <CounterDisplay init={data} />
}
