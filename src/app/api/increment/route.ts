import { NextResponse } from 'next/server'
import { createClient } from "@supabase/supabase-js";
import { IncrementCounterForm } from "@/types/Counter.types";
import dayjs from "dayjs";

export async function POST(request: Request) {
  const { id } = await request.json() as IncrementCounterForm
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SERVICE_ROLE_KEY as string)

  const { data } = await supabase.from('COUNTER').select('count').eq('id', id).single()
  if (!data) {
    return NextResponse.json({ success: false })
  }
  await supabase.from('COUNTER').update({
    count: data.count + 1,
    modified: dayjs().toISOString()
  }).eq('id', id)

  return NextResponse.json({ success: true })
}
