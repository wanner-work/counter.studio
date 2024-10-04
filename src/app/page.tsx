import getServerClient from '@/methods/supabase/client/getServerClient'

export default async function Page() {
  const supabase = getServerClient()

  const { data } = await supabase.from('COUNTER').select('*')

  return (
    <div>
      counter.studio
      {data?.map((counter) => (
        <div key={counter.id}>
          <p>{counter.id}</p>
          <p>{counter.title}</p>
          <p>{counter.count}</p>
        </div>
      ))}
    </div>
  )
}
