'use server'

import getServiceClient from '@/methods/supabase/client/getServiceClient'
import dayjs from 'dayjs'

export default async function changeCounter(id: string, amount: number) {
  if (amount === 0) {
    return
  }

  const supabase = getServiceClient()

  const { data } = await supabase
    .from('COUNTER')
    .select('count')
    .eq('id', id)
    .single()

  if (!data) {
    return
  }

  const count = data.count + amount

  await supabase
    .from('COUNTER')
    .update({ count, modified: dayjs().toISOString() })
    .eq('id', id)
}
