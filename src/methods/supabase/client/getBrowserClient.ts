import { Database } from '@/interfaces/supabase/Database'
import { createBrowserClient } from '@supabase/ssr'

export default function getBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
