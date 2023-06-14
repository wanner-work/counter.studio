'use client'

import dayjs, { Dayjs } from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

type RelativeTimeProps = {
  date: Dayjs
}

export default function RelativeTime ({ date }: RelativeTimeProps) {
  return <>{dayjs(date).fromNow()}</>
}
