import CounterAction from '@/components/counter/CounterAction'
import getServiceClient from '@/methods/supabase/client/getServiceClient'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type CounterPageParams = {
  params: {
    slug: string
  }
}

export const revalidate = 0

export async function generateMetadata({
  params: { slug }
}: CounterPageParams): Promise<Metadata> {
  const supabase = getServiceClient()

  const { data } = await supabase
    .from('COUNTER')
    .select('*')
    .eq('id', slug)
    .single()

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

export default async function CounterPage({
  params: { slug }
}: CounterPageParams) {
  const supabase = getServiceClient()

  const { data } = await supabase
    .from('COUNTER')
    .select()
    .eq('id', slug)
    .single()

  if (!data) {
    notFound()
  }
  return <CounterAction counter={data} />
}
