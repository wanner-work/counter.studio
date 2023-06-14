import { Counter } from "@/types/Counter.types"
import ShortNumber from "@/components/basic/ShortNumber"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import RelativeTime from "@/components/basic/RelativeTime";
dayjs.extend(relativeTime)

export default function SavedCounter({ count, title, description, modified }: Counter) {
  return (
    <div className="grid grid-cols-saved-counter gap-4 p-5 bg-gray-500/10 border border-gray-300/10">
      <div className="grid place-items-center">
        <p className="font-bold text-[20px]"><ShortNumber number={count} /></p>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-bold truncate mb-[2px]">{title}</h3>
        <span className="text-gray-600 text-sm italic">updated <RelativeTime date={modified} /></span>
      </div>
      <div>
      </div>
    </div>
  )
}
