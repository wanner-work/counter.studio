import { Dayjs } from "dayjs";

export interface Counter {
  id: string
  count: number
  title: string
  description: string
  modified: Dayjs
}
