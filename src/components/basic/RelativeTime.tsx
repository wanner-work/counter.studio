'use client'

import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useState } from 'react'

dayjs.extend(relativeTime)

interface Props {
  date: number | string | Date | Dayjs
}

export default function RelativeTime({ date }: Props) {
  const [relative, setRelative] = useState<string>(dayjs(date).fromNow())

  useEffect(() => {
    const interval = setInterval(() => {
      setRelative(dayjs(date).fromNow())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [date])

  return <>{relative}</>
}
