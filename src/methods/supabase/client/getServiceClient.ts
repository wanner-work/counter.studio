import { Database } from '@/interfaces/supabase/Database'
import { createBrowserClient } from '@supabase/ssr'

export default function getServiceClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
  )
}
