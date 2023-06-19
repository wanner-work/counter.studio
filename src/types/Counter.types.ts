import { Dayjs } from "dayjs";

export interface Counter {
  id: string
  count: number
  title: string
  description: string
  modified: string
}

export interface CounterLocalStorage extends Counter {

  type: 'counter'
}

export interface CreateCounterForm {
  title: string
  description: string
}

export interface IncrementCounterForm {
  id: string
  minus?: boolean
}
