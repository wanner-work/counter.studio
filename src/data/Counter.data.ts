import { Counter } from "@/types/Counter.types";
import dayjs from "dayjs";

export const TestCounters: Counter[] = [
  {
    id: "ae875a9f-5c44-4597-8a55-dd5a752f751f",
    count: 21,
    title: "Counter 1",
    description: "This is the first counter",
    modified: dayjs("2021-01-01:00:00:00")
  },
  {
    id: "b2b0b0a9-5c44-4597-8a55-dd5a752f751f",
    count: 130102031,
    title: "Counter 2",
    description: "This is the second counter",
    modified: dayjs().subtract(14, 'seconds')
  },
  {
    id: "c3c0b0a9-5c44-4597-8a55-dd5a752f751f",
    count: 12021,
    title: "Counter 3",
    description: "This is the third counter",
    modified: dayjs().subtract(14, 'minutes')
  },
  {
    id: "d4d0b0a9-5c44-4597-8a55-dd5a752f751f",
    count: 293,
    title: "Counter 4 Long Title too long for this title",
    description: "This is the fourth counter",
    modified: dayjs().subtract(3, 'day')
  },
  {
    id: "e5e0b0a9-5c44-4597-8a55-dd5a752f751f",
    count: 3,
    title: "Counter 5",
    description: "This is the fifth counter",
    modified: dayjs().subtract(3, 'day')
  }
]
