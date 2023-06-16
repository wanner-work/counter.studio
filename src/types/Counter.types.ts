import { Dayjs } from "dayjs";

export interface Counter {
  id: string
  count: number
  title: string
  description: string
  modified: Dayjs
}

export interface CreateCounterForm {
  title: string
  description: string
}

export interface IncrementCounterForm {
  id: string
}
